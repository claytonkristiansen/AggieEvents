const db = require("../models");
const Event = db.events;
const Op = db.Sequelize.Op;
// adds new event to database
exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "ERROR: event name is invalid"
    });
    return;
  }

  const event = {
    name: req.body.name,
    date: req.body.date,
    organizationid: req.body.organizationid,
    description: req.body.description,
    status: req.body.status
  }

  Event.create(event)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "ERROR: couldn't create event."
      });
    });
};
// responds with every event in the database
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? {name: {[Op.eq]: name } } : null;
  Event.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "ERROR: couldn't get events."
      });
    });
};
// responds with the event associated with the id requested
exports.findOne = (req, res) => {
  const id = req.params.id;

  Event.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "ERROR: couldn't get event."
      });
    });
};
// modifies event with the associated id
exports.modify = (req, res) => {
  const id = req.params.id;

  Event.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Event has been modified"
        });
      } else {
        res.send({
          message: "ERROR: event was not found."
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "ERROR: couldn't update event with id " + id
      });
    });
};
// deletes event with the associated id from database
exports.delete = (req, res) => {
  const id = req.params.id;

  Event.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Event removed."
        });
      } else {
        res.send({
          message: "ERROR: event to delete doesn't exist"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "ERROR: couldn't delete event with id " + id
      });
    });
};
// deletes all events in the database
exports.deleteAll = (req, res) => {
  Event.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message : `${nums} Events were deleted. `});
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "ERROR: couldn't delete all events."
      })
    })
};
// responds with all APPROVED events found in the database
exports.findAllApproved = (req, res) => {
  Event.findAll({ where: { status: "APPROVED"} })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "ERROR: couldn't get all events."
      });
    });
};

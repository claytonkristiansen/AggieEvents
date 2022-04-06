const db = require("../models");
const Event = db.events;
const Op = db.Sequelize.Op;

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

exports.findAllApproved = (req, res) => {
  Events.findAll({ where: { status: "APPROVED"} })
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

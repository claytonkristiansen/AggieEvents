const db = require("../models");
const Event = db.events;
const Op = db.Sequelize.Op;
var aws     = require('aws-sdk');
var email   = "jonasstites@gmail.com";
aws.config.loadFromPath(__dirname + '/config.json');
var ses = new aws.SES();
// query that creates new event
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
    organizer: req.body.organizer,
    time: req.body.time,
    location: req.body.location,
    description: req.body.description,
    status: req.body.status,
    message: req.body.message,
    show: req.body.show,
    roster: req.body.roster,
    category: req.body.category
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
// query that responds the whole events table
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

exports.emails = (req, res) => {
  Event.findAll()
    .then(data => {

      for (var index in data) {
        if (data[index].dataValues.roster.length > 0) {
          for (var j in data[index].dataValues.roster) {
            var ses_mail = "From: 'AggieEvents' <" + email + ">\n";
            ses_mail = ses_mail + "To: " + data[index].dataValues.roster[j] + "\n";
            ses_mail = ses_mail + "Subject: " + data[index].dataValues.name + "\n";
            ses_mail = ses_mail + "MIME-Version: 1.0\n";
            ses_mail = ses_mail + "Content-Type: multipart/mixed; boundary=\"NextPart\"\n\n";
            ses_mail = ses_mail + "--NextPart\n";
            ses_mail = ses_mail + "Content-Type: text/html; charset=us-ascii\n\n";
            ses_mail = ses_mail + "REMINDER: " + data[index].dataValues.description + " at " + data[index].dataValues.location + ".\n\n";
            ses_mail = ses_mail + "--NextPart\n"; /*
            var params = {
              RawMessage: { Data: new Buffer.from(ses_mail) },
              Destinations: [data[index].dataValues.roster[j]],
              Source: "'AggieEvents' <" + email + ">'"
            };
            console.log(params);
            ses.sendRawEmail(params, function(err, data) {
                if(err) {
                  console.log(err);
                }
                else {
                  console.log(data);
                }
            });
          }
        }
      }
    res.send(data);
    });
};

// query that responds the event associated with id
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
// query that updates event associated with id
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
// the same as modify but only used for manager approve
exports.approve = (req, res) => {
  const id = req.params.id;

  Event.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          //TWITTER
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
// query that removed event associated with id
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
// query that deletes all events
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
// query that returns all approved events with the given filters
exports.findAllApproved = (req, res) => {

  const name = req.query.name;
  console.log(name.length);
  console.log(name.length >= 1);
  const location = req.query.location;
  const organizer = req.query.organizer;
  const category = req.query.category;
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;
  var approved = {status: "APPROVED"};
  var nameCond = name !== 'null' ? {name: {[Op.like]: name} } : null;
  var locationCond = location !== 'null' ? {location: {[Op.eq]: location} } : null;
  var orgCond = organizer !== 'null' ? {organizer: {[Op.eq]: organizer} }: null;
  var catCond = category !== 'null' ? {category: {[Op.eq]: category} }: null;
  console.log(nameCond);
  var dateCond = (startDate !== 'null' && endDate !== 'null') ? {date: {[Op.between]: [startDate, endDate]} }: null;
  Event.findAll({ where: {[Op.and]: [approved, nameCond, locationCond, orgCond, catCond, dateCond]}
                           } )
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
// query that returns all pending events
exports.findAllPending = (req, res) => {
  Event.findAll({ where: { status: "PENDING"} })
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
// query that returns all events from a specific organization

exports.findAllFromOrg = (req, res) => {
  const organizer = req.params.organizer;
  Event.findAll({ where: {organizer: organizer} })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "ERROR: couldn't get organizers events."
      });
    });
}
// query that returns all events that should be shown in the organizer's notification log
exports.findAllShowingFromOrg = (req, res) => {
  const organizer = req.params.organizer;
  Event.findAll({ where: {organizer: organizer, show: "true"} })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "ERROR: couldn't get organizers shown events."
      });
    });
}

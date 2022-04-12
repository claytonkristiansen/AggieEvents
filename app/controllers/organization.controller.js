const db = require("../models");
const Organization = db.organizations;
const Op = db.Sequelize.Op;
// query that creates new organization
exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "ERROR: organization name is invalid"
    });
    return;
  }

  const organization = {
    name: req.body.name,
    password: req.body.password,
    category: req.body.category,
    reqCategory: req.body.reqCategory
  }

  Organization.create(organization)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "ERROR: couldn't create organization."
      });
    });
};
// query that responds the whole organizations table

exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? {name: {[Op.eq]: name } } : null;
  Organization.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "ERROR: couldn't get organizations."
      });
    });
};

// query that responds the organization associated with id
/*
exports.findOne = (req, res) => {
  const id = req.params.id;

  Organization.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "ERROR: couldn't get Organization."
      });
    });
};
*/
// query that updates Organization associated with id
exports.modify = (req, res) => {
  const id = req.params.id;

  Organization.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Organization has been modified"
        });
      } else {
        res.send({
          message: "ERROR: Organization was not found."
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "ERROR: couldn't update Organization with id " + id
      });
    });
};
// query that removed Organization associated with id
exports.delete = (req, res) => {
  const id = req.params.id;

  Organization.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Organization removed."
        });
      } else {
        res.send({
          message: "ERROR: Organization to delete doesn't exist"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "ERROR: couldn't delete Organization with id " + id
      });
    });
};
// query that deletes all Organizations
exports.deleteAll = (req, res) => {
  Organization.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message : `${nums} Organization were deleted. `});
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "ERROR: couldn't delete all Organizations."
      })
    })
};
// query that checks if a set of credentials is invalid
exports.loginVal = (req, res) => {
  const name = req.params.name;
  Organization.findAll({ where: { name: name } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "ERROR: organization doesn't exist or credentials are invalid."
      });
    });
};
// query that checks if a username and password match to let an organizer log in
exports.findLogIn = (req, res) => {
  const name = req.params.name;
  const password = req.params.password;
  Organization.findAll({ where: { name: name, password: password } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "ERROR: organization doesn't exist or credentials are invalid."
      });
    });
};

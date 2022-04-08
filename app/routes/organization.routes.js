module.exports = app => {
  // sending queries to backside pages like /api/organizations
  const organizations = require("../controllers/organization.controller.js");

  var router = require("express").Router();

  router.post("/", organizations.create);

  router.get("/", organizations.findAll);

  //router.get("/:id", organizations.findOne);

  router.get("/:name", organizations.loginVal);

  router.put("/:id", organizations.modify);

  router.delete("/:id", organizations.delete);

  router.delete("/", organizations.deleteAll);

  app.use('/api/organizations', router);
}

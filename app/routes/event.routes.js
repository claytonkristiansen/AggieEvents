module.exports = app => {
  const events = require("../controllers/event.controller.js");

  var router = require("express").Router();
  // these methods send the output of the queries to a certain webpage like /api/events/approved

  router.post("/", events.create);

  router.get("/", events.findAll);

  router.get("/approved", events.findAllApproved);

  router.get("/:id", events.findOne);

  router.put("/:id", events.modify)

  router.delete("/:id", events.delete);

  router.delete("/", events.deleteAll);

  app.use('/api/events', router);
}

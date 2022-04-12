module.exports = app => {
  // sending queries to backside pages like /api/events/approved/
  const events = require("../controllers/event.controller.js");

  var router = require("express").Router();

  router.post("/", events.create);

  router.get("/", events.findAll);

  router.get("/orgs/:organizer", events.findAllFromOrg);

  router.get("/orgs/:organizer/shown", events.findAllShowingFromOrg);

  router.get("/approved", events.findAllApproved);

  router.get("/pending", events.findAllPending);

  router.get("/:id", events.findOne);

  router.put("/:id", events.modify)

  router.delete("/:id", events.delete);

  router.delete("/", events.deleteAll);

  app.use('/api/events', router);
}

module.exports = (sequelize, Sequelize) => {
  // model of event used to query events via sequelize
  const Event = sequelize.define("event", {
    name: {
      type: Sequelize.STRING
    },
    date: {
      type: Sequelize.STRING
    },
    organizationid: {
      type: Sequelize.INTEGER
    },
    description: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.STRING
    }
  });
  return Event;
};

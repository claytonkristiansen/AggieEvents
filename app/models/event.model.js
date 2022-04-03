module.exports = (sequelize, Sequelize) => {
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

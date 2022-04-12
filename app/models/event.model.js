module.exports = (sequelize, Sequelize) => {
  // represents entities in database and creates the events table if it doesn't already exist
  const Event = sequelize.define("event", {
    name: {
      type: Sequelize.STRING
    },
    date: {
      type: Sequelize.STRING
    },
    time: {
      type: Sequelize.STRING
    },
    location: {
      type: Sequelize.STRING
    },
    organizer: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.STRING
    },
    message: {
      type: Sequelize.STRING
    },
    show: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    roster: {
      type: Sequelize.ARRAY(Sequelize.STRING)
    },
    category: {
      type: Sequelize.STRING
    }
  });
  return Event;
};

module.exports = (sequelize, Sequelize) => {
  // represents entities in database and creates the organization table if it doesn't exist already
  const Organization = sequelize.define("organization", {
    name: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    category: {
      type: Sequelize.STRING
    }
  });
  return Event;
};

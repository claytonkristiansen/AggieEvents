module.exports = { // information needed for sequelize to access database and prevent is from being overused
  HOST: "database-1.c8naql3d9t4i.us-east-1.rds.amazonaws.com",
  USER: "jds7232",
  PASSWORD: "uBKTEsb3Gc8rhp66Cn16",
  DB: "project3db",
  dialect: "postgres",
  pool: {
    max: 10,
    min: 0,
    aquire: 40000,
    idle: 10000
  }
};

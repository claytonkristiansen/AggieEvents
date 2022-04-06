// credentials for the database and controls how many connections are open at once
module.exports = {
  HOST: "database-1.c8naql3d9t4i.us-east-1.rds.amazonaws.com",
  USER: "jds7232",
  PASSWORD: "uBKTEsb3Gc8rhp66Cn16",
  DB: "project3db",
  dialect: "postgres",
  pool: {
    max: 4,
    min: 0,
    aquire: 40000,
    idle: 10000
  }
};

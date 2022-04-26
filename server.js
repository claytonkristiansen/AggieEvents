const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
// cors options only allow the front end domain and a locally run build of the front end to access the backend server for security
var corsOptions = {
  origin: ["http://jds7232-angular-front-end.s3-website-us-east-1.amazonaws.com","http://localhost:8081"]
};
app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");

db.sequelize.sync();

app.get("/", (req, res) => {
  res.send("why are u here");
});

require("./app/routes/event.routes")(app);
require("./app/routes/organization.routes")(app);

const PORT = process.env.PORT || 8082;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

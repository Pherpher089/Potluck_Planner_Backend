const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const authRouter = require("../auth/auth-router.js");
const usersRouter = require("./routes/users-router.js");
const potlucksRouter = require("./routes/potlucks-router.js");
const foodRouter = require("./routes/food-router.js");

const server = express();
server.use(bodyParser({ extended: false }));
var allowList = ['https://potluck-planner-app.netlify.app', 'https://potluck-planner-app.netlify.app/', 'http://localhost:3000/', '*']
var corsOptionsDelegate = function (req, callback) {
	var corsOptions;
	if (allowList.indexOf(req.header('Origin')) !== -1) {
		corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
	} else {
		corsOptions = { origin: false } // disable CORS for this request
	}
	callback(null, corsOptions) // callback expects two parameters: error and options
}

server.use(cors());
server.use(helmet());
server.use("/api/auth", authRouter);
server.use("/api/users", usersRouter);
server.use("/api/potlucks", potlucksRouter);
server.use("/api/food", foodRouter);

server.get("/", async (req, res) => {
	res.json({ message: "Its Alive!" });
});

module.exports = server;

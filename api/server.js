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
server.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin: *');
	res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
	res.header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization');
})
// var allowlist = ['https://potluck-planner-app.netlify.app', 'https://potluck-planner-app.netlify.app/']
// var corsOptionsDelegate = function (req, callback) {
// 	var corsOptions;
// 	if (allowlist.indexOf(req.header('Origin')) !== -1) {
// 		corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
// 	} else {
// 		corsOptions = { origin: false } // disable CORS for this request
// 	}
// 	callback(null, corsOptions) // callback expects two parameters: error and options
// }

// server.use(cors(corsOptionsDelegate));
server.use(helmet());
server.use("/api/auth", authRouter);
server.use("/api/users", usersRouter);
server.use("/api/potlucks", potlucksRouter);
server.use("/api/food", foodRouter);

server.get("/", async (req, res) => {
	res.json({ message: "Its Alive!" });
});

module.exports = server;

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const authRouter = require("../auth/auth-router.js");
const usersRouter = require("./routes/users-router.js");
const potlucksRouter = require("./routes/potlucks-router.js");
const foodRouter = require("./routes/food-router.js");

const server = express();
const options = {
	origin: 'https://potluck-planner-app.netlify.app/*',
}
server.use(cors(options));
server.use(helmet());

server.use("/api/auth", authRouter);
server.use("/api/users", usersRouter);
server.use("/api/potlucks", potlucksRouter);
server.use("/api/food", foodRouter);

server.get("/", async (req, res) => {
	res.json({ message: "Its Alive!" });
});

module.exports = server;

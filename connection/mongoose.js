require("dotenv").config();

const mongoose = require("mongoose");

const logger = require("../middlewares/logger");

const options = {
  autoIndex: true,
};

mongoose.connect(process.env.MONGO_URL, options);


mongoose.connection.on("connected", () => { logger.info(" mongoose connected successfully") });

mongoose.connection.on("error", err => {
  logger.error("Mongoose connection has occurred " + err + " error");
});

mongoose.connection.on("disconnected", (message) => {
  logger.info(`Mongoose connection is disconnected with message ${message}`);
});

process.on("SIGINT", function () {
  mongoose.connection.close(() => {
    process.exit(0);
  });
});

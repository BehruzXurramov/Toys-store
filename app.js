const express = require("express");
const config = require("config");
const cookieParser = require("cookie-parser");
const sequelize = require("./config/db");
const PORT = config.get("port");
const mainRoute = require("./routes/index.routes");
const error_handing_middleware = require("./helpers/error_handing_middleware");

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api", mainRoute);

app.use(error_handing_middleware);

async function start() {
  await sequelize.authenticate();
  await sequelize.sync({ alter: true });
  app.listen(PORT, () => {
    console.log(`Server ishga tushdi. PORT: `, PORT);
  });
}

start();

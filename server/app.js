const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json());

// const cors = require("cors");
// app.use(
// 	cors({
// 		origin: ["http://127.0.0.1:8080"],
// 	})
// );

app.use(express.static("upload"));


app.listen(5050, () => console.log("running 5050..."));

const mineRouter = require("./routes/mine");
const articleRouter = require("./routes/article");
const consultRouter = require("./routes/consult");
const doctorRouter = require("./routes/doctor");
const emgcallRouter = require("./routes/emgcall");
const homeRouter = require("./routes/home");
const hospitalRouter = require("./routes/hospital");
const modifysqlRouter = require("./routes/modifysql");
const questionRouter = require("./routes/question");
const saleRouter = require("./routes/sale");
const searchRouter = require("./routes/search");
app.use("/", mineRouter);
app.use("/", articleRouter);
app.use("/", consultRouter);
app.use("/", doctorRouter);
app.use("/emgcall", emgcallRouter);
app.use("/", homeRouter);
app.use("/", hospitalRouter);
app.use("/", modifysqlRouter);
app.use("/", questionRouter);
app.use("/", saleRouter);
app.use("/search", searchRouter);

require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const UserRouter = require("./routes/UserRoutes");
const TicketsRouter = require("./routes/TicketRoutes");
const mongoose = require("mongoose");

const PORT = process.env.PORT;
const URI = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@user-cluster.3rvqu.mongodb.net/${process.env.MONGODB_DB}`;

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once("open", () => console.log("Connected to MongoDB atlas"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", UserRouter);
app.use("/tickets", TicketsRouter);

app.use("/", (req, res) => {
    res.send("Welcome to TKET API");
});

app.listen(PORT, () => console.log("Server running on PORT", PORT));

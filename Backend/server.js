require("dotenv").config();

const express = require("express")
const path = require("path");
const connectDB = require("./config/db.js")
const authRoute = require("./routes/auth.route.js")
const taskRoute = require("./routes/task.route.js")

const app = express();

connectDB();

app.use(express.json());
app.use(express.static(path.join(__dirname, "../Frontend")));

app.use("/api/auth",authRoute)
app.use("/api/task",taskRoute)

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../Frontend/Login/login.html"));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})
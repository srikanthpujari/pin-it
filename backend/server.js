const express = require("express");
const connectDB = require("./config/db");
const { urlNotFound, errorHandler } = require("./middlewares/errorMiddleware");
const dotenv = require("dotenv").config();
const path = require("path");

const userRoutes = require("./routes/userRoutes");
const noteRoutes = require("./routes/noteRoutes");

const app = express();

connectDB();

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes);

//-----------------------deployment---------------------------
__dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

//-----------------------deployment---------------------------

app.use(urlNotFound);
app.use(errorHandler);

const PORT = process.env.PORT;

app.listen(PORT, console.log(`Server is running on port: ${PORT}`));

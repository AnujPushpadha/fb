const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const connectDB = require("./config/dbConnection");

const routes = require("./routes/testRoutes");
const userRoutes = require("./routes/userRoutes");
app.use("/", routes);
app.use("/user", userRoutes);
connectDB();
PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server is on port ${PORT}`);
});

const express = require("express");
const cors = require("cors");
const verifyJWT = require("./middleware/verifyJWT");
const corsOptions = require("./config/corsOptions");
const credentials = require("./middleware/credentials");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();
const port = 3001;

app.use(credentials);
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

app.use("/user", require("./routes/auth-routes"));
app.use(verifyJWT);
app.use("/user", require("./routes/users-routes"));
app.use("/parking", require("./routes/parking-routes"));
app.use("/booking", require("./routes/booking-routes"));
app.use("/discount", require("./routes/discount-routes"));
app.use("/vehicle", require("./routes/vehicle-routes"));

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});

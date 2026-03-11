require("dotenv").config();

const express = require("express");
const cors = require("cors");

/* ================= ROUTES ================= */

const authRoutes = require("./routes/authRoutes");

const userTripRoutes = require("./routes/userRoutes");

const adminTripRoutes = require("./routes/adminTripRoutes");
const adminDriverRoutes = require("./routes/adminDriverRoutes");

const driverTripRoutes = require("./routes/driverTripRoutes");
const driverFileRoutes = require("./routes/driverFileRoutes");


const expenseRoutes = require("./routes/expenseRoutes");

/* ================= APP INIT ================= */

const app = express();

/* ================= MIDDLEWARE ================= */

app.use(cors());
app.use(express.json());

/* Request logger (very useful for debugging frontend calls) */
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

/* ================= ROUTE MAPPING ================= */

app.use("/api/auth", authRoutes);

app.use("/api/user/trips", userTripRoutes);

app.use("/api/admin/trips", adminTripRoutes);
app.use("/api/admin/drivers", adminDriverRoutes);

app.use("/api/driver/trips", driverTripRoutes);
app.use("/api/driver/expenses", expenseRoutes);
app.use("/api/admin/expenses", expenseRoutes);
app.use("/api/driver", driverFileRoutes);
app.use("/api/admin", driverFileRoutes);   // add this
app.use("/api/admin/signature", driverFileRoutes);


/* ================= TEST ROUTE ================= */

app.get("/", (req, res) => {
  res.send("ArcotCabs Node Backend Running 🚖");
});

/* ================= SERVER ================= */

const PORT = process.env.PORT || 9090;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
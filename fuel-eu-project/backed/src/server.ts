import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes";
import routeRoutes from "./routes/route.routes";

const app = express();

// ✅ Allow all origins (temporary fix)
app.use(cors());

app.use(express.json());

app.use("/users", userRoutes);
app.use("/routes", routeRoutes);

app.get("/", (req, res) => {
  res.send("Server is working 🚀");
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
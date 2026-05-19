import express from "express";

import cors from "cors";

import testRoutes from "./routes/test.routes";
import userRoutes from "./routes/user.routes";
import recordRoutes from "./routes/record.routes";

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (_, res) => {
  res.send("Doodhwala API Running");
});

app.use("/test", testRoutes);
app.use("/users", userRoutes);
app.use("/records", recordRoutes);

export default app;

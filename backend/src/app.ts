import express from "express";
import cors from "cors";

import testRoutes from "./routes/test.routes";
import userRoutes from "./routes/user.routes";
import recordRoutes from "./routes/record.routes";
import authRoutes from "./routes/auth.routes";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "https://your-app.vercel.app"],
    credentials: true,
  }),
);


app.use(express.json());

app.get("/", (_, res) => {
  res.send("Doodhwala API Running");
});

app.use("/test", testRoutes);
app.use("/users", userRoutes);
app.use("/records", recordRoutes);
app.use("/auth", authRoutes);

export default app;

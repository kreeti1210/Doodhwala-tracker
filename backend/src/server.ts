import app from "./app";
import cors from "cors";
import 'dotenv/config'

const PORT = process.env.PORT || 3000;
app.use(
  cors({
    origin: ["http://localhost:5173", "https://your-app.vercel.app"],
    credentials: true,
  }),
);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

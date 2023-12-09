import dotenv from "dotenv";
import app from "./app.js";

//dotEnv Config
dotenv.config();

//env Variables
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is listening at ${PORT}`);
});

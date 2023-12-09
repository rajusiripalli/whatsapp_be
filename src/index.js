import dotenv from "dotenv";
import app from "./app.js";
import logger from "./configs/logger.config.js";

//dotEnv Config
dotenv.config();

//env Variables
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  logger.info(`Server is listening at ${PORT}`);
});

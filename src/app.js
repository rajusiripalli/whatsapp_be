import compression from "compression";
import cookieParser from "cookie-parser";
import express from "express";
import fileUpload from "express-fileupload";
import mongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
//create a express app
const app = express();

//morgan HTTP request logger middleware
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

//Helmet helps secure Express apps by setting HTTP response headers.
app.use(helmet());

//Parse json request url
app.use(express.json());

//Parse Json request body
app.use(express.urlencoded({ extended: true }));

//Express Mongoose Sanitize middleware which sanitizes user-supplied data to prevent MongoDB Operator Injection.
app.use(mongoSanitize());

//Enable cookie parser
app.use(cookieParser());

//gzip compression
app.use(compression());

//file upload
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

//Cors
app.use(cors());

app.get("/", (req, res) => {
  res.send("Praise The Lord Helleaujah");
});

export default app;

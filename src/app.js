import compression from "compression";
import cookieParser from "cookie-parser";
import express from "express";
import fileUpload from "express-fileupload";
import mongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import createHttpError from "http-errors";
import routes from "./routes/index.js";

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

//api v1 routes
app.use("/api/v1", routes);

app.use(async (req, res, next) => {
  next(createHttpError.NotFound("This route does not exist."));
});

//error handling
app.use(async (err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

export default app;

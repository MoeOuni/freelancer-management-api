const cors = require("cors");
const morgan = require("morgan");
const express = require("express");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const compression = require("compression");
const xss = require("xss-clean");

const AppError = require("./utils/appError");

const app = express();

app.enable("trust proxy");

// Implement CORS
app.use(cors());
app.options("*", cors());

// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}
// Body parser, reading data from body into req.body
app.use(express.json({ limit: "3mb" }));
app.use(express.urlencoded({ extended: true, limit: "3mb" }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Data compression middleware
app.use(compression());

// Test middleware
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

app.all("*", (req, res, next) => {
    next(new AppError(`${req.originalUrl} does not exist on this server!`, 404));
});

module.exports = app;
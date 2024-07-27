const express = require("express");
const bodyParser = require("body-parser");
const compress = require("compression");
const methodOverride = require("method-override");
const cors = require("cors");
const helmet = require("helmet");
const passport = require("passport");
const routes = require("../api/routes");
const strategies = require("./passport");
const error = require("../api/middlewares/error");
const compression = require("compression");

/**
 * Express instance
 * @public
 */
const app = express();

app.use(compression());



// static files
app.use("/v1/file", express.static("src/uploads"));
// parse body params and attache them to req.body
app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));

// gzip compression
app.use(compress());

// lets you use HTTP verbs such as PUT or DELETE
// in places where the client doesn't support it
app.use(methodOverride());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
var corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200, // For legacy browser support
};
app.use(cors(corsOptions));

// enable authentication
app.use(passport.initialize());
passport.use("jwt", strategies.jwt);




// mount api v1 routes
app.use("/v1", routes);


// if error is not an instanceOf APIError, convert it.
app.use(error.converter);

// catch 404 and forward to error handler
app.use(error.notFound);

// error handler, send stacktrace only during development
app.use(error.handler);



module.exports = app;
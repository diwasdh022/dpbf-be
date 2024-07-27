const nodemailer = require(`nodemailer`);
var hbs = require("nodemailer-express-handlebars");
const path = require("path");

// helpdesk email settings
const infoTransporter = nodemailer.createTransport({
    // service: process.env.EMAIL_SERVICE,
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    // secure: false,
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
    },
    // ignoreTLS: true,
});

infoTransporter.use(
    "compile",
    hbs({
        viewEngine: {
            extName: ".handlebars",
            partialsDir: path.resolve("./src/views"),
            defaultLayout: false,
        },
        viewPath: "./src/views",
        extName: ".handlebars",
    }),
);


module.exports = {
    infoTransporter,
};

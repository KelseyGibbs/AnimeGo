require("dotenv").config();
var axios = require("axios");
var express = require("express");
var exphbs = require("express-handlebars");

var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// Handlebars
app.engine(
    "handlebars",
    exphbs({
        defaultLayout: "main"
    })
);
app.set("view engine", "handlebars");
// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = { force: true };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
    syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/

db.sequelize
    .sync(syncOptions)
    .then(function() {
        db.Anime.create({
            name: "sailor moon"
        });
    })
    .then(function() {
        db.Anime.create({
            name: "naruto"
        }).then(function() {
            db.Anime.create({
                name: "Full Metal Alchemist"
            });
        });
        app.listen(PORT, function() {
            console.log(
                "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
                PORT,
                PORT
            );
        });
    });

// app.listen(PORT, function() {
//     console.log(`Listening on port ${PORT}`);
// });

module.exports = app;

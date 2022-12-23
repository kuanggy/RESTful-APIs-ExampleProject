const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const articles = require(__dirname + '/model.js');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static('public'));

mongoose.set("strictQuery", false);
mongoose.connect("mongodb+srv://<username>:<password>@cluster0.7a0odwe.mongodb.net/<databaseName>", {
        useNewUrlParser: true
    })
    .then(() => console.log("Database connected!"))
    .catch(err => console.log(err));

// Create Chainable Routes Handler
app.route("/articles")
    .get((req, res) => {
        articles.find({}, (err, result) => {
            if (!err) {
                res.send(result);
            } else {
                res.send(err);
            }
        });
    })
    .post((req, res) => {
        const title = req.body.title;
        const content = req.body.content;
        const newArticle = new articles({
            title: title,
            content: content
        });
        newArticle.save((err) => {
            if (!err) {
                res.send(title + " saved to the database");
            } else {
                res.send(title + " enable to save to the database");
            }
        });
    })
    .delete((req, res) => {
        articles.deleteMany({}, (err, result) => {
            if (!err) {
                res.send("Deleted all articles");
            } else {
                res.send(err);
            }
        });
    });

// Create specific routes
app.route("/articles/:articleTitle")
    .get((req, res) => {
        // req.params.title = req.params.title.replace(/\s/g, '');
        // req.params.title = _.lowerCase(req.params.title);
        articles.findOne({
            title: req.params.articleTitle
        }, (err, result) => {
            if (result) {
                res.send(result);
            } else {
                res.json({
                    statusCode: res.statusCode,
                    message: "No result found in the database."
                });
            }
        });
    })
    // Update whole document (overwritten)
    .put((req, res) => {
        articles.findOneAndUpdate(
            {title: req.params.articleTitle},
            {title: req.body.title, content: req.body.content},
            {overwrite: true},
            (err) => {
                if (!err) {
                res.json({
                    statusCode: res.statusCode,
                    message: req.body.title + " is overwritten."
                });
            }
        });
    })
    // Update specific field in the document
    .patch((req, res) => {
        articles.findOneAndUpdate(
            {title: req.params.articleTitle},
            req.body,
            (err) => {
                if (!err) {
                res.json({
                    statusCode: res.statusCode,
                    message: req.body.title + " is updated."
                });
            }
        });
    })
    .delete((req, res) => {
        articles.findOneAndDelete({title: req.params.articleTitle}, (err) => {
            res.json({
                statusCode: res.statusCode,
                message: req.params.articleTitle + " deleted from the database"
            });
        })
    })

app.listen(3000, function () {
    console.log('Server started on port 3000');
});


//----------------------------------- Create Separated Routes -----------------------------------//
// app.get("/articles", (req, res) => {
//     articles.find({}, (err, result) => {
//         if (!err) {
//             res.send(result);
//         } else {
//             res.send(err);
//         }
//     });
// });

// app.post("/articles", (req, res) => {
//     const title = req.body.title;
//     const content = req.body.content;
//     const newArticle = new articles({
//         title: title,
//         content: content
//     });
//     newArticle.save((err) => {
//         if (!err) {
//             res.send(title + " saved to the database");
//         } else {
//             res.send(title + " enable to save to the database");
//         }
//     });
// });

// app.delete("/articles", (req, res) => {
//     articles.deleteMany({}, (err, result) => {
//         if (!err) {
//             res.send("Deleted all articles");
//         } else {
//             res.send(err);
//         }
//     });
// });

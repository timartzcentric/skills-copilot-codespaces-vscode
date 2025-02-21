//Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Read comments from file
app.get('/comments', (req, res) => {
    fs.readFile(path.join(__dirname, 'comments.json'), 'utf8', (err, data) => {
        if (err) {
            console.log(err);
        }
        res.send(data);
    });
});

//Add comment to file
app.post('/comments', (req, res) => {
    fs.readFile(path.join(__dirname, 'comments.json'), 'utf8', (err, data) => {
        if (err) {
            console.log(err);
        }
        let comments = JSON.parse(data);
        comments.push(req.body);
        fs.writeFile(path.join(__dirname, 'comments.json'), JSON.stringify(comments), (err) => {
            if (err) {
                console.log(err);
            }
            res.send(comments);
        });
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
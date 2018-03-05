var path = require(`path`);
var fs = require('fs');
module.exports = function(app) {
    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/home.html"));
    });

    app.get("/survey", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/survey.html"));
    });
    
    app.get("/js/survey", function(req, res) {
        fs.readFile(path.join(__dirname, '../public/js/survey.js'), function (err, data) {
            if (err) console.log(err);
            res.writeHead(200, {'Content-Type': 'text/javascript'});
            res.write(data);
            res.end();
          });
    });

    app.get("/css/survey", function(req, res) {
        fs.readFile(path.join(__dirname, '../public/css/survey.css'), function (err, data) {
            if (err) console.log(err);
            res.writeHead(200, {'Content-Type': 'text/css'});
            res.write(data);
            res.end();
          });
    });
}
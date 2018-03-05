//Get data
var friendList = require(`../data/friends`);
var questions = require(`../data/questions`);

module.exports = function(app) {
    
    //View current data
    app.get("/api/friends", function(req, res) {
        res.json(friendList);
    });
 
    app.get("/api/survey", function(req, res) {
        res.json(questions);
    });
}
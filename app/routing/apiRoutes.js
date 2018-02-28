//Get data
var friendList = require(`../data/friends`);

module.exports = function(app) {
    
    //View current data
    app.get("/api/friends", function(req, res) {
        res.json(friendList);
    });
}
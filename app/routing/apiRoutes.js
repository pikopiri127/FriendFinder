// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friendsData = require("../data/friends");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {

    // A GET route with the url /api/friends. This will be used to display a JSON of all possible friends.
    app.get("/api/friends", function (req, res) {
        return res.json(friendsData);
    });


    // A POST routes /api/friends. This will be used to handle incoming survey results. 
    // This route will also be used to handle the compatibility logic.
    app.post("/api/friends", function (req, res) {

        // req.body hosts is equal to the JSON post sent from the user
        // This works because of our body parsing middleware
        var userData = req.body;
        //console.log(userData); //after clicking Submit button in survey window

        // Determine the user's most compatible friend using the following as a guide:
        // Convert each user's results into a simple array of numbers (ex: [5, 1, 4, 4, 5, 1, 2, 5, 4, 1]).

        var dif = [];
        var difTotalArray = [];
        var m = 0;

        console.log(userData);
        console.log(friendsData);

        // With that done, compare the difference between current user's scores against those from other users, question by question. Add up the differences to calculate the totalDifference.
        // Example:
        // User 1: [5, 1, 4, 4, 5, 1, 2, 5, 4, 1]  -->> userData.scores
        // User 2: [3, 2, 6, 4, 5, 1, 2, 5, 4, 1]  -->> friendsData[i].scores[q]
        // Total Difference: 2 + 1 + 2 = 5
        // Remember to use the absolute value of the differences. Put another way: no negative solutions! Your app should calculate both 5-3 and 3-5 as 2, and so on.
        for (var i = 0; i < friendsData.length; i++) {
            var difTotal = 0;
            for (var q = 0; q < 10; q++) {
                console.log("--------------------------")
                console.log("i: " + i + "/ q: " + q);
                console.log("friendsData.scores: " + parseInt(friendsData[i].scores[q]));
                console.log("userData.scores[q]: " + parseInt(userData.scores[q]));
                dif[q] = Math.abs(parseInt(friendsData[i].scores[q]) - parseInt(userData.scores[q]));
                difTotal = difTotal + dif[q];
                console.log("dif[q]: " + dif[q]);
                console.log("difTotal: " + difTotal);
                console.log("--------------------------")
            }
            difTotalArray[i] = difTotal;
            console.log("==========================")
            console.log("difTotalArray: " + difTotalArray);
            console.log("==========================")
            console.log(Math.min.apply(Math, difTotalArray));
            m = Math.min.apply(Math, difTotalArray);
        }

        for (var p = 0; p < 10; p++) {
            if (difTotalArray[p] === m) {
                console.log(p);
                console.log(friendsData[p])
            }
        }
    })
};

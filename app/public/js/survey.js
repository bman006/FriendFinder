$(document).ready(
    function() {
        var currentURL = window.location.origin;
        $.ajax({ url: currentURL + "/api/survey", method: "GET" }).then(function(questions) {
            //Add questions to the page
            for (var i = 0; i < questions.length; i++) {
                makeQuestionElement(questions[i], i);
            };

            //Submit button
            $(`#submit`).on(`click`, function() {
                
                //Remove any old elements alerting the user to an incomplete entry
                $(`#incomplete-alert`).remove();

                //store the entered name
                var name = $(`#survey-name`).val().trim();
                if (name.length === 0) {
                    $(`button#submit`).before(`<h2 id='incomplete-alert'>Enter your name first</h2>`);
                    return
                }
                
                //store the entered image url
                var image = $(`#survey-image`).val().trim();
                if (image.length === 0) {
                    $(`button#submit`).before(`<h2 id='incomplete-alert'>Enter your image url first</h2>`);
                    return
                }
                
                //Create array to store answers
                var answers = [];

                //Populate answers into array
                for (var i = 0; i < questions.length; i++) {
                    //Was question answered?
                    //If yes then store the answer in the array
                    var answer = $(`div[question-number=${i}]`).find(`label.active`).attr(`val`);
                    //If not clear the array and tell user to answer all questions first
                    if (!answer) {
                        $(`button#submit`).before(`<h2 id='incomplete-alert'>Answer all questions first</h2>`);
                        return
                    }
                    else {
                        answers.push(answer);
                    }
                }
                var newFriend = constructNewObject(name, image, answers);
                findBestFriend(newFriend);
            });
        });
    });

function makeQuestionElement(question, i) {
    var newSurveyQuestion = 
        `<div class="row" question-number=${i}>
            <div class="col-md-12 survey-box">
                <div class="survey-question">
                    <h3>${question}</h3>
                </div>
                <h4 class="survey-line survey-answer-text">Strongly<br>Disagree</h4>
                <div class="btn-group" data-toggle="buttons">
                    <label class="btn btn-primary survey-answer survey-line" val=1><input type="radio">1</label>
                    <label class="btn btn-primary survey-answer survey-line" val=2><input type="radio">2</label>
                    <label class="btn btn-primary survey-answer survey-line" val=3><input type="radio">3</label>
                    <label class="btn btn-primary survey-answer survey-line" val=4><input type="radio">4</label>
                    <label class="btn btn-primary survey-answer survey-line" val=5><input type="radio">5</label>
                </div>
                <h4 class="survey-line survey-answer-text">Strongly<br>Agree</h4>
            </div>
        </div>
        <hr>`;

    $(`.container.survey`).append(newSurveyQuestion);
}
function constructNewObject(name, image, answers) {
    var newFriend = {
        "name": name,
        "image": image,
        "score": answers
    }
    return newFriend;
}
function findBestFriend(newFriend) {
    $.ajax({url: `/api/friends`, method: `GET`}).then(function(friends) {

        var bestFriend = {
            "closestScore": 4 * newFriend.score.length + 1,
            "closestIndex": -1
        };
        for (var i = 0; i < friends.length; i++) {
            var totalDifference = 0;
            for (var j = 0; j < friends[i].score.length; j++) {
                totalDifference += Math.abs(friends[i].score[j] - newFriend.score[j]);
            }
            if (totalDifference < bestFriend.closestScore) {
                bestFriend.closestScore = totalDifference;
                bestFriend.closestIndex = i;
            }
        }

        sendNewFriendToServer(newFriend);
    });
}
function sendNewFriendToServer(newFriend) {

}
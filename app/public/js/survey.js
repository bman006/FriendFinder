$(document).ready(
    function() {
        var currentURL = window.location.origin;
        $.ajax({ url: currentURL + "/api/survey", method: "GET" }).then(function(questions) {
            //Add questions to the page
            for (var i = 0; i < questions.length; i++) {
                var newSurveyQuestion = 
                `<div class="row" question-number=${i}>
                    <div class="col-md-12 survey-box">
                        <div class="survey-question">
                            <h3>${questions[i]}</h3>
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
            };

            //Submit button
            $(`#submit`).on(`click`, function() {
                //Create array to store answers
                var answers = [];
                
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
            });
        });
    });
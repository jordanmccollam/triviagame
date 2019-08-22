$(document).ready(function() {

    // ANCHOR questions
    var questions = [
        {
            question: "1. What does a soccer mom drive?",
            options: ["Smart Car", "Minivan", "Prius", "Sports Car"],
            answer: "Minivan"
        },
        {
            question: "2. What will a soccer mom always wear to a game?",
            options: ["Baseball cap", "Shorts", "Visor", "Flip flops"],
            answer: "Visor"
        },
        {
            question: "3. Who is a soccer mom's best friend?",
            options: ["The Ref", "Water", "Sharon", "Nobody"],
            answer: "Water"
        },
        {
            question: "4. What is the best perc of having a soccer mom?",
            options: ["She'll cheer you on!", "She'll love you unconditionally!", "She always comes to a game!", "She always brings food!"],
            answer: "She always brings food!"
        },
    ];
    var questionNum = 0;
    var time = 10;
    var right = 0;
    var wrong = 0;
    var unanswered = 0;

    reset();

    // ANCHOR Reset function
    function reset() {
        // show start screen
        $(".start-screen").show();
        // hide other screens
        $(".questions-screen, .results-screen").hide();
        // Reset variables
        questionNum = 0;
        time = 10;
        right = 0;
        wrong = 0;
        unanswered = 0;
    }

    // ANCHOR Start btn click event
    $(".start-btn").on('click', function() {
        // Show and hide correct screens
        $(".questions-screen").show();
        $(".start-screen").hide();

        // Start count down
        intervalID = setInterval(count, 1000);
        function count() {
            if (time > 0) {
                time--;
            } else {
                $("#options").empty();
                questionNum++;
                time = 10;
                unanswered++;
                displayQuestion();
            }
            $("#time").html(time);
        };

        displayQuestion();
    });

    // ANCHOR Display question
    function displayQuestion() {
        if (questionNum < 4) {
            // Display question
            $("#question").html(questions[questionNum].question);

            // Display options
            for (var i = 0; i < questions[questionNum].options.length; i++) {
                $("#options").append("<p>" + "<button class='btn options wrong'>" + questions[questionNum].options[i]);
            }
            // Set a right and wrong answer
            var a = questions[questionNum].answer;
            $("button:contains('" + a + "')").addClass('answer');
            $("button:contains('" + a + "')").removeClass('wrong');

            // When right answer is clicked
            $(".answer").on('click', function() {
                // Log progress
                right++;
                // Start timer over
                time = 11;
                // Display next quesiton
                questionNum++;
                $("#options").empty();
                displayQuestion();
            })

            // When wrong answer is clicked
            $(".wrong").on('click', function() {
                // Log progress
                wrong++;
                // Start timer over
                time = 11;
                // Display next quesiton
                questionNum++;
                $("#options").empty();
                displayQuestion();
            })
        } else {
            endGame();

            // ANCHOR When game is over
            function endGame() {
                // Stop timer
                clearInterval(intervalID);
                // Display and hide screens
                $(".questions-screen").hide();
                $(".results-screen").show();

                $("#correct").html(right);
                $("#incorrect").html(wrong);
                $("#unanswered").html(unanswered);
            }
        }
    };

    // ANCHOR Restart
    $(".reset-btn").on('click', function() {
        reset();
    })


// ----------
// END OF JS
});
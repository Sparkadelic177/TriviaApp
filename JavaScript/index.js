import { getQuestions } from "./api.js"
import { mainTemplate, correctAnswerFeedBack, incorrectAnswerFeedBack } from "./templates.js"

//this object will hold the information from trivia api
let triviaQuestion = {};

//this function handles attaching all of the event handlers
function attachEventHandlers(){
    $('#difficulty').on('change', (event) => {
        changeQuestion()
     });

    $('.answerBtn').on('click', (event) => {
        handleChoosenAnswer(event.target.innerText);
    })
}

//this function handles the answer that was choosen
function handleChoosenAnswer(answer){
    const correctAnswer = triviaQuestion.correct_answer;
    $('.triviaContainer').empty(); //remove the game template to append right / wrong card

    if(answer === triviaQuestion.correct_answer){
        $('.triviaContainer').append(correctAnswerFeedBack(correctAnswer));
    }else{
        $('.triviaContainer').append(incorrectAnswerFeedBack(answer, correctAnswer));
    }

    //after 3 seconds remove the feedback card and change question
    setTimeout(() => {
        $('.card').remove();
        changeQuestion();
    },3000)
}

//this function handles the difficulty change
function changeQuestion(){
    $('.triviaContainer').empty();
    init();
}

//this function handles appending questions to the html
function appendQuestions(triviaQuestion){
    let questionsToAppend = triviaQuestion.incorrect_answers.map(answer => `<button class="btn btn-primary answerBtn">${answer}</button>`)
    $('.questions').append(`<h2>Queston:</h2> ${triviaQuestion.question}`)
    $('.questions').append(questionsToAppend)
}

//this function handles the main function of the app
async function init(){
    mainTemplate(); //display game template
    const difficulty = $("#difficulty").val(); 
    triviaQuestion = await getQuestions(difficulty);
    appendQuestions(triviaQuestion); 
    attachEventHandlers();
}


$(init);
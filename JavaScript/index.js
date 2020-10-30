import { getQuestions } from "./api.js"
import { mainTemplate, correctAnswerFeedBack, incorrectAnswerFeedBack } from "./templates.js"

//this object will hold the information from trivia api
let triviaQuestion = {};
let difficulty = "";


//this function handles the answer that was choosen
function handleChoosenAnswer(event){
    const answer = event.target.innerText
    const correctAnswer = triviaQuestion.correct_answer;
    $('.questions').empty(); //remove the game template to append right / wrong card
    if(answer === triviaQuestion.correct_answer){
        $('.triviaContainer').append(correctAnswerFeedBack(correctAnswer));
    }else{
        $('.triviaContainer').append(incorrectAnswerFeedBack(answer, correctAnswer));
    }

    //after 3 seconds remove the feedback card and change question
    setTimeout(() => {
        $('.card').remove();
        changeQuestion()
    },3000)
}

//this function handles the difficulty change
async function changeQuestion(){
    $('.questions').empty();
    await setQuestions();
    $('.answerBtn').on('click', handleChoosenAnswer)
}
//sets the questions on html
async function setQuestions(){
    triviaQuestion = await getQuestions(difficulty);
    appendQuestions(triviaQuestion);
}

//this function handles appending questions to the html
function appendQuestions(triviaQuestion){
    let questionsToAppend = triviaQuestion.answers.map(answer => `<button class="btn btn-primary answerBtn">${answer}</button>`)
    $('.questions').append(`<h2>Queston:</h2> <p>${triviaQuestion.question}</p>`)
    $('.questions').append(questionsToAppend)
}

//gets the current difficulty
function getDifficulty(){
    difficulty = $('#difficulty').val();;
}

//this function handles the main function of the app
async function init(){
    mainTemplate(); //display game template
    getDifficulty();
    await setQuestions();
    $('#difficulty').on('change', changeQuestion);
    $('.answerBtn').on('click', handleChoosenAnswer)
}

$(init);
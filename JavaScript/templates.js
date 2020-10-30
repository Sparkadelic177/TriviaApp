
//This function renders the game template 
export function mainTemplate(){
    $(".triviaContainer").append(
    `<section class="upperSection">
        <h3>Difficulty</h3>
        <select name="difficulty" id="difficulty">
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
      </select>
    </section>  
    <section class="lowerSection">
         <div class="questions">
         </div>
    </section>  
    `);
}


//this function handles a correct answer feedback
export function correctAnswerFeedBack(){
    $("body").append(`
    <div class="card text-white bg-success mb-3" style="max-width: 18rem;">
        <div class="card-header">Correct !</div>
        <div class="card-body">
            <p class="card-text">You've Choosen the right answer </p>
        </div>
    </div>`
  )
}


//this function handles a incorrect answer feedback
export function incorrectAnswerFeedBack(answer, correctAnswer){
    $("body").append(`
    <div class="card text-white bg-danger mb-3" style="max-width: 18rem;">
        <div class="card-header">Wrong</div>
        <div class="card-body">
            <h5 class="card-title">Incorrect: ${answer}</h5>
            <p class="card-text">The correct answer was: ${correctAnswer}</p>
        </div>
    </div>`
    )
}

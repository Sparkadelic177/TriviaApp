//this function calls on the api to retrevie trivia information
export async function getQuestions(difficulty){
    
    const triviaQuestion = {
          question:"",
          correct_answer:"",
          incorrect_answers:[]      
    }

    try{ 
        let response = await fetch(`https://opentdb.com/api.php?amount=1&difficulty=${difficulty}`);
        response = await response.json();
        triviaQuestion.question = response.results[0].question;
        triviaQuestion.correct_answer = response.results[0].correct_answer;
        triviaQuestion.incorrect_answers =  shuffleArray([...response.results[0].incorrect_answers, response.results[0].correct_answer])
    }
    catch(error){
        alert("There was an issue with getting your trivia question, please try again in a few minutes");
    }
    finally{
        return triviaQuestion;
    }

    
}

//this function handles the shuffling of the answers 
function shuffleArray(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}
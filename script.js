// Wait for the DOM to finish loading before running the game
// Get the button elements and add event listeners to them

document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons) {
        button.addEventListener("click", function() {
            if (this.getAttribute("data-type") === "submit") {
                checkAnswer();         
            } else {
                let gameType = this.getAttribute("data-type");
                runGame(gameType);
            }
        })
    }

    document.getElementById("answer-box").addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            checkAnswer();
        }
    })

    runGame("addition");
})

function runGame(gameType) {
    //Generate two random numbers between 1 and 25
    //Math.floor rounds down the whole number 
    //Math.random generates random numbers
    // +1 adds 1 to the final value to start at 1 instead of 0

    document.getElementById("answer-box").value="";
    document.getElementById("answer-box").focus();

    let num1 = Math.floor(Math.random() * 25)+1;
    console.log(num1)
    let num2 = Math.floor(Math.random() * 25)+1;
    console.log(num2)

    if(gameType === "addition") {
        displayAdditionQuestion(num1, num2);
    } else if(gameType === "subtract") {
        if (num1 >= num2) {
            displaySubtractQuestion(num1, num2);
        } else {
            displaySubtractQuestion(num2, num1);
        }
    } else if (gameType === "multiply") {
        displayMultiplyQuestion(num1, num2);
    } else {
        alert (`Unknown game type ${gameType}`);
        throw `Unknown game type ${gameType}, aborting!`;
    }

}

function checkAnswer() {
    // Checks the answer against the first element in
    // the returned CalculateCorrectAnswer array

    let userAnswer = parseInt(document.getElementById("answer-box").value);
    let calculatedAnswer = calculateCorrectAnswer();
    let isCorrect = userAnswer === calculatedAnswer[0];

    if (isCorrect) {
        alert("Hey! You got it right! :D");
        incrementScore();
    } else {
        alert (`Awww...you answered ${userAnswer}. The correct answer was ${calculatedAnswer[0]}!`);
        incrementWrongAnswer();
    }

    runGame(calculatedAnswer[1]);
}

function calculateCorrectAnswer() {
    // Gets the operands (the numbers) and the operator (plus, minus etc)
    // directly from the DOM

    let operand1 = parseInt(document.getElementById("operand1").innerText);
    let operand2 = parseInt(document.getElementById("operand2").innerText);
    let operator = document.getElementById("operator").innerText;

    if (operator === "+") {
        return [operand1 + operand2, "addition"];
    }else if (operator === "-") {
        return [operand1 - operand2, "multiply"];
    }else if (operator === "*") {
        return [operand1 * operand2, "multiply"];
    } else {
        alert (`Unimplemented operator ${operator}`);
        throw `Unimplemented operator ${operator}, aborting!`;
    }
}

function incrementScore() {
    // Gets the current score from the DOM and adds 1 to it.
    let oldScore = parseInt(document.getElementById("score").innerText);
    console.log(oldScore);
    document.getElementById("score").innerText = ++oldScore;  // same as oldScore + 1.
    console.log(oldScore);
}

function incrementWrongAnswer() {
    // Gets the current Wrong Answer from the Dom value and adds one to it.
    let oldScore = parseInt(document.getElementById("incorrect").innerText);
    console.log(oldScore);
    document.getElementById("incorrect").innerText = ++oldScore;  // same as oldScore + 1.
    console.log(oldScore);
}

function displayAdditionQuestion(operand1, operand2) {
    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "+";
}

function displaySubtractQuestion(operand1, operand2) {
    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "-";
}

function displayMultiplyQuestion(operand1, operand2) {
    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "x";
}

function displayDivisionQuestion(operand1, operand2) {

}
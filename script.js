// Wait for the DOM to finish loading before running the game
// Get the button elements and add event listeners to them

document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons) {
        button.addEventListener("click", function() {
            if (this.getAttribute("data-type") === "submit") {
                alert("You clicked Submit!");                
            } else {
                let gameType = this.getAttribute("data-type");
                runGame(gameType);
            }
        })
    }

    runGame("addition");
})

function runGame(gameType) {
    //Generate two random numbers between 1 and 25
    //Math.floor rounds down the whole number 
    //Math.random generates random numbers
    // +1 adds 1 to the final value to start at 1 instead of 0

    let num1 = Math.floor(Math.random() * 25)+1;
    console.log(num1)
    let num2 = Math.floor(Math.random() * 25)+1;
    console.log(num2)

    if(gameType === "addition") {
        displayAdditionQuestion(num1, num2);
    } else {
        alert (`Unknown game type ${gameType}`);
        throw `Unknown game type ${gameType}, aborting!`;
    }

}

function displayAdditionQuestion(operand1, operand2) {
    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "+";
}
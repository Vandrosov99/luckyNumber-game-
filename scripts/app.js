let cards = document.querySelectorAll('.card');
let minNum = document.querySelector('.min-num');
let maxNum = document.querySelector('.max-num');
let input = document.querySelector('.card__value');
let submit = document.querySelector('.card__btn');
let underMsg = document.querySelector('.card__message');


let min = 1;
let max = 10;
let winNumber = getRandomNum(min, max);
let tries = 3;

let inputTries = [];

minNum.textContent = min;
maxNum.textContent = max;

let results = document.querySelector('.results');


cards[0].addEventListener('mousedown', function (e) {
    if (e.target.classList.contains('play-again')) {
        window.location.reload();
    }
})
submit.addEventListener('click', function () {
    let guess = parseInt(input.value);

    if (isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter number beetween ${min} and ${max}`, 'red');
        return false;
    }

    if (guess === winNumber) {

        inputTries.push(guess);


        gameOver(true, `YOU WIN`);

        createInfo();

        let answers = document.querySelector('.card__user-answers');
        let answer = document.querySelector('.card__answer');
        answers.textContent = inputTries;
        answer.textContent = winNumber;

        input.value = "";

        submit.textContent = "Play Again";
        submit.className += ' play-again';

    } else {

        inputTries.push(guess);

        --tries;

        if (tries === 0) {

            input.value = '';

            gameOver(false, `YOU LOST`);
            createInfo();

            let answers = document.querySelector('.card__user-answers');
            let answer = document.querySelector('.card__answer');

            answers.textContent = inputTries;
            answer.textContent = winNumber;


            submit.textContent = "Play Again";
            submit.className += ' play-again';

        } else {

            input.style.borderColor = 'red';
            setMessage(`${guess} is not true, try again!`, 'red')
            input.value = '';
        }
    }

});


function setMessage(msg, color) {
    underMsg.style.color = color;
    underMsg.textContent = msg;
}

function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function gameOver(result, msg) {
    let color;
    result === true ? color = 'green' : color = 'red';
    input.disabled = true;
    input.style.borderColor = color;
    setMessage(msg, color);
}

function createInfo() {

    let div = document.createElement('div');
    div.className = 'container';
    div.innerHTML = `<div class="card">
    <div class="card__info"> Your answers is <span class="card__user-answers"></span>
        </br>
        Correct Answer is
        <span class="card__answer"></span>
    </div>
</div>`;


    results.appendChild(div);

}
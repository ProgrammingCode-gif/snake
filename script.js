const playBoard = document.querySelector('.play-board');
const scoreElement = document.querySelector('.score');
const gameOverElement = document.querySelector('.gameover');
const gameOverScore = document.querySelector('.gameover-score');
const gameOverBtn = document.querySelector('.gameover-btn');
const recordScore = document.querySelector('.high-score');

let snakeX = 5, snakeY = 10;
let velocityX = 1, velocityY = 0;
let foodX, foodY;
let tail = [[snakeX , 10], [snakeX - 1, 10]];


let score = 0;

scoreElement.innerHTML = `Score: ${score}`;
recordScore.innerHTML =  localStorage.getItem('score') ? `High-score: ${localStorage.getItem('score')}` : 'High-score: 0'

const changeFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}


function initGame() {
    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

    tail[0] = [snakeX, snakeY]
    
    htmlMarkup += `<div class="head" style="grid-area: ${tail[0][1]} / ${tail[0][0]}"></div>`;
    // console.log(tail);
    
    for(let i = 0; i < tail.length; i++) {
        htmlMarkup += `<div class="head" style="grid-area: ${tail[i][1]} / ${tail[i][0]}"></div>`;
    }
    
    for(let i = tail.length - 1; i > 0; i--) {
        tail[i] = tail[i - 1];
    }

    if(velocityX !== 0 || velocityY !== 0) {
        snakeX += velocityX;
        snakeY += velocityY;
    }



    gameOver();

    if(snakeX === foodX && snakeY === foodY) {
        changeFoodPosition();
        tail.push([snakeX, snakeY]);
        score++;
    }

    scoreElement.innerHTML = `Score: ${score}`;
    playBoard.innerHTML = htmlMarkup;
}

document.addEventListener('keydown', changeSnakeDirection)

function changeSnakeDirection(e) {
    if(e.key === 'ArrowDown' && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (e.key === 'ArrowUp' && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    } else if (e.key === 'ArrowRight' && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    } else if (e.key === 'ArrowLeft' && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
}

function gameOver() {
    for(let i = tail.length - 1; i > 0; i--) {
        if(snakeX === tail[i][0] && snakeY === tail[i][1]) {
            console.log('gameover');
            clearInterval(interval);
            gameOverElement.style.display = 'flex';
            gameOverScore.innerHTML = `Your score: ${score}`;
            if(localStorage.getItem('score') && localStorage.getItem('score') < score) {
                localStorage.setItem('score', score);
                console.log(localStorage.getItem('score') < score);
            } else {
                localStorage.setItem('score', 0);
            }
            return;
        }
    }
    
    if(snakeX > 30 || snakeX < 1 || snakeY > 30 || snakeY  < 1) {
        
        clearInterval(interval);
        console.log('gameOver');
        gameOverElement.style.display = 'flex';
        gameOverScore.innerHTML = `Your score: ${score}`;
        if(localStorage.getItem('score') && localStorage.getItem('score') < score) {
            localStorage.setItem('score', score);
            console.log(localStorage.getItem('score') < score);
        } else {
            localStorage.setItem('score', 0);
        }
        return;
    }
}

gameOverBtn.addEventListener('click', () => {
    location.reload()
})

changeFoodPosition();
const interval = setInterval(initGame, 125);

gameOver();
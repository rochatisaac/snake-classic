let $canvas = document.getElementById("snake");
let context = $canvas.getContext("2d");
let box = 32;
let snake = [{
    x: 8 * box,
    y: 8 * box
}];
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y:Math.floor(Math.random() * 15 + 1) * box
};
let direction = "static";
let game = setInterval(startGame, 100);
let $restart = document.querySelector("#restart");
let $gameOver = document.querySelector("#game-over");

function bgCreate(){
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function snakeCreate(){
    for(let i = 0; i < snake.length; i++){
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function foodMaker(){
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

function startGame(){
    snake[0].x = 
        snake[0].x > 15 * box && direction === "right"? 0 
        : snake[0].x <= 0  && direction === "left"? 16 * box 
        : snake[0].x;

    snake[0].y = 
        snake[0].y > 15 * box && direction === "down"? 0 
        : snake[0].y <= 0 && direction === "up"? 16 * box 
        : snake[0].y;

    for(let i=1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(game);
            $gameOver.innerHTML = "Game Over! Try Again? ";
        }
}   
    
    let snakeX = snake[0].x;
        snakeX = direction === "right"? snakeX += box 
        : direction === "left"? snakeX -= box
        : snake[0].x;

    let snakeY = snake[0].y;
        snakeY = direction === "down"? snakeY += box 
        : direction === "up"? snakeY -= box 
        : snake[0].y;

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    bgCreate();
    foodMaker();    
    snakeCreate();
    snake.unshift(newHead);
    
    
    if(snakeX != food.x || snakeY != food.y){
        snake.pop();
    } else {
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }
}

function moveUpdate(e){
    direction = 
    e.keyCode == 37 && direction != "right" ? "left" 
    : e.keyCode == 39 && direction != "left" ? "right" 
    : e.keyCode == 38 && direction != "down" ? "up"
    : e.keyCode == 40 && direction != "up" ? "down" 
    : direction;
}

document.addEventListener('keydown',moveUpdate);

$restart.addEventListener("click", () => { document.location.reload()});

window.addEventListener("keydown", (e) => {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);


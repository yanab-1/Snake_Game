

let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

let cellSize = 50; //height & width ka kaam krega for each cell
let boardHeight = 550;
let boardWidth = 1000;
let snakeCells = [ [0,0] ]; //2d array to store starting points of snake ka rectangle
let direction  = 'right';

let gameOver = false; //wall se touch hone ke baad hojaae true

let foodCells = generatFood();

let score = 0;

// baar baar repeat
let intervalId = setInterval(function(){
    update();
    draw();
} , 200)

// keydown event is trigerred
document.addEventListener('keydown' , function(event){
    if(event.key === 'ArrowDown'){direction='down'}
    else if(event.key === 'ArrowUp'){direction='up'}
    else if(event.key === 'ArrowLeft'){direction='left'}
    else{direction = 'right'}
})

// function to draw snake
function draw(){
    if(gameOver === true){
        clearInterval(intervalId);
        ctx.fillStyle = '#e63946'; // Soft red for game over
        ctx.font = '50px monospace';
        ctx.fillText('GAME OVER !!', 350, 300);
        return;
    }


    ctx.fillRect(0, 0, boardWidth, boardHeight);

    ctx.clearRect(0,0,boardWidth,boardHeight);
    // Snake
    for(let cell of snakeCells){
        ctx.fillStyle = '#457b9d'; // Classy blue for snake
        ctx.fillRect(cell[0], cell[1], cellSize, cellSize);
        ctx.strokeStyle = '#a8dadc'; // Soft border
        ctx.lineWidth = 2;
        ctx.strokeRect(cell[0], cell[1], cellSize, cellSize);
    }

    // draw Food
    ctx.fillStyle = '#f9c74f'; // Warm yellow for food
    ctx.fillRect(foodCells[0], foodCells[1], cellSize, cellSize);
    ctx.strokeStyle = '#f9844a'; // Orange border for food
    ctx.lineWidth = 2;
    ctx.strokeRect(foodCells[0], foodCells[1], cellSize, cellSize);

    // Score
    ctx.font = '24px monospace';
    ctx.fillStyle = '#1d3557'; // Deep blue for score
    ctx.fillText(`Score: ${score}`, 20, 25);

}

// function to update snake
function update(){
    let headX = snakeCells[snakeCells.length - 1][0];
    let headY = snakeCells[snakeCells.length - 1][1];

    // let newHeadX = headX + cellSize;
    // let newHeadY = headY;
    let newHeadX;
    let newHeadY;

    if(direction === 'right'){
        newHeadX = headX + cellSize;
        newHeadY = headY;
        if(newHeadX === boardWidth || khagyaKhudko(newHeadX,newHeadY)){gameOver = true}
    }
    else if(direction === 'left'){
        newHeadX = headX - cellSize;
        newHeadY = headY;
        if(newHeadX < 0 || khagyaKhudko(newHeadX,newHeadY)){gameOver = true}
    }
    else if(direction === 'up'){
        newHeadX = headX;
        newHeadY = headY - cellSize;
        if( newHeadY < 0 || khagyaKhudko(newHeadX,newHeadY)){gameOver = true}
    }
    else{
        newHeadX = headX;
        newHeadY = headY + cellSize;
        if(newHeadY === boardHeight || khagyaKhudko(newHeadX,newHeadY)){gameOver = true}
    }


    snakeCells.push([newHeadX , newHeadY]);
    if(newHeadX === foodCells[0] && newHeadY === foodCells[1]){
        foodCells = generatFood();
        score += 1;
    }
    else{
        snakeCells.shift();
    }
}

function generatFood(){
    return [
        Math.round(Math.random()*(boardWidth-cellSize)/cellSize)*cellSize,
        Math.round(Math.random()*(boardHeight-cellSize)/cellSize)*cellSize
    ]
}

function khagyaKhudko(newHeadX , newHeadY){
    for(let item of snakeCells){
        if(item[0] === newHeadX && item[1] === newHeadY){
            return true;
        }
    }
    return false;
}
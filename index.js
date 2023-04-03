const playBoard = document.querySelector(".play-board");
const highScoreElement = document.querySelector(".high-score");
const controls = document.querySelectorAll(".controls button");
//const downbutton = document.querySelector("down");
//const leftbutton =document.querySelector("left");
//const rightbutton = document.querySelector("right");
let score = 0;




let GameOver = false;
let foodX , foodY;
let snakeX =1, snakeY=1;
let snakeBody = [];
let velocityX = 0 , velocityY = 0;
let setInterValid;

// getting high score from the local storage
let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerHTML = `High Score : ${highScore}`;


const changeFoodPosition = () =>{
        foodX = Math.floor(Math.random() * 30)+1;
        foodY = Math.floor(Math.random() * 30)+1;
}

const handleGameOver = () =>{
        //Clearing the timer and reloading tha page on game over
        
        alert("Game Over! Press Ok to replay...");
        clearInterval(setInterValid);
        location.reload();
}

const changeDirection = (e) =>{
        if(e.key === "ArrowUp" && velocityY !=1){
                velocityX = 0;
                velocityY = -1;
        }
        else if(e.key === "ArrowDown" && velocityY != -1){
                velocityX  = 0;
                velocityY  = 1;
        }
        else if(e.key === "ArrowLeft" && velocityX!=1){
                velocityX = -1;
                velocityY = 0;
        }
        else if(e.key === "ArrowRight" && velocityX!= -1){{
                velocityX = 1;
                velocityY =0;
        }}
        
}


// Calling changeDirectioon on each key click and passing key dataset value as an object
controls.forEach(key => {
        key.addEventListener("click", () => changeDirection({key : key.dataset.key}));
});


const initGame = () => {
        if(GameOver){
               
                return handleGameOver();
        } 


        let htmlMarkUp = `<div class="food" style="grid-area:${foodY} / ${foodX}"></div>`;
        if(snakeX === foodX & snakeY === foodY){
                changeFoodPosition();
                score +=1;
                snakeBody.push([foodX , foodY]);  // pushisg food position to snake body array
                console.log(snakeBody);
                highScore = score>=highScore ? score : highScore;
                localStorage.setItem("high-score",highScore); //storaging some data in local storage available in web page by key , value
                document.querySelector(".score").innerHTML = `Score : ${score}`;
                highScoreElement.innerHTML = `High Score : ${highScore}`;
        }

        for(let i = snakeBody.length  - 1 ;i>0;i--){
                //shifting forward the values of the element in the snake by one

                snakeBody[i] = snakeBody[i-1];
        }


        snakeBody[0] = [snakeX,snakeY];
        //updating snake's head position based on the current velocity
        snakeX+=velocityX;
        snakeY+=velocityY;
        //checking whether the game is out of the wall of not
        if(snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30){
                GameOver = true;
                //changeover();
        
               

               
        }



        for(let i = 0 ; i< snakeBody.length ; i++){
                //adding a div for each part of the snake's body
                htmlMarkUp += `<div class="head" style="grid-area:${snakeBody[i][1]}/${snakeBody[i][0]}"> </div>`;

                if(i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]){
                        GameOver= true;

                        //changeover();
                       
                }
        }


         //htmlMarkUp += `<div class="head" style="grid-area:${snakeY} / ${snakeX}"></div>`;
        playBoard.innerHTML = htmlMarkUp;
}




changeFoodPosition(); 
setInterValid =setInterval(initGame , 100); // the initgame function will be called for every 125 millisecond 

document.addEventListener("keydown",changeDirection);

// if user is using mobile phone


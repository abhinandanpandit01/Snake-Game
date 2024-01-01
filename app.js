const board = document.getElementById("game")
const scoreDisplay = document.getElementById('score')
const resetBox = document.querySelector(".reset-box")
const resetBoxScore = document.querySelector(".reset-box #score")
const resetBoxBtn = document.getElementById("btn")
let blockSize = 25
let col = 20
let row = 20
let context;
let gameOver = false
//snake
let snakeX = blockSize * 5
let snakeY = blockSize * 5
let vecocityX = 0
let vecocityY = 0
//sanke body
let snake = []
//food
let foodX = blockSize * 5
let foodY = blockSize * 5

//game start logic :-
window.onload = () =>
{
    //drawing the board
    board.height = row * blockSize
    board.width = col * blockSize
    context = board.getContext("2d")
    //setting control for keyboard
    document.addEventListener("keyup", (e) =>
    {
        if (e.key === "ArrowLeft" && vecocityX !== 1)
        {
            vecocityX = -1
            vecocityY = 0
        }

        else if (e.key === "ArrowRight" && vecocityX !== -1)
        {
            vecocityX = 1
            vecocityY = 0
        }
        else if (e.key === "ArrowUp" && vecocityY !== 1)
        {
            vecocityX = 0
            vecocityY = -1
        }
        else if (e.key === "ArrowDown" && vecocityY !== -1)
        {
            vecocityX = 0
            vecocityY = 1
        }
    })
    placeFood()
    setInterval(update, 100)

}

const update = () =>
{

    if (gameOver)
    {
        return
    }
    // over the board
    if (snakeX < 0 || snakeY < 0 || snakeX > board.width || snakeY > board.height)
    {
        gameOver = true
        resetBox.style.display = "flex"
        resetBoxScore.innerHTML = snake.length * 10
        resetBoxBtn.addEventListener('click', () =>
        {
            resetBox.style.display = "none"
            location.reload() // for restarting the game
        })
    }
    context.fillStyle = "black"
    context.fillRect(0, 0, board.width, board.height)

    //snake style
    context.fillStyle = "green"
    snakeX += vecocityX * blockSize
    snakeY += vecocityY * blockSize
    context.fillRect(snakeX, snakeY, blockSize, blockSize)
    for (let i = 0; i < snake.length; i++)
    {
        scoreDisplay.innerHTML = snake.length * 10
        context.fillRect(snake[i][0], snake[i][1], blockSize, blockSize)
    }

    for (let i = snake.length - 1; i > 0; i--)
    {
        snake[i] = snake[i - 1]
    }

    if (snake.length)
    {
        snake[0] = [snakeX, snakeY]
    }
    //game logic
    if (snakeX == foodX && snakeY == foodY)
    {
        placeFood()
        snake.push([foodX, foodY])
    }


    // food style
    context.fillStyle = "red"
    context.fillRect(foodX, foodY, blockSize, blockSize)


    //gameOver condition
    for (let i = 1; i < snake.length; i++)
    {
        if (snakeX == snake[i][0] && snakeY == snake[i][1])
        {
            gameOver = true
            resetBox.style.display = "flex"
            resetBoxScore.innerHTML = snake.length * 10
            resetBoxBtn.addEventListener('click', () =>
            {
                resetBox.style.display = "none"
                location.reload() // for restarting the game
            })
        }
    }
}
//placing food randomly
const placeFood = () =>
{
    foodX = Math.floor(Math.random() * col) * blockSize
    foodY = Math.floor(Math.random() * row) * blockSize
}


//button control system for moblie ---------------->

const btns = document.querySelectorAll(".btn-control>button")

btns.forEach((e) =>
{
    e.addEventListener("click", (e) =>
    {
        if (e.target.classList.contains("left") && vecocityX !== 1)
        {
            vecocityX = -1
            vecocityY = 0
        }
        if (e.target.classList.contains("up") && vecocityY !== 1)
        {
            vecocityX = 0
            vecocityY = -1
        }
        if(e.target.classList.contains("down") && vecocityY !== -1 ){
            vecocityX = 0
            vecocityY = 1
        }
        if(e.target.classList.contains("right") && vecocityX !==-1){
            vecocityX = 1
            vecocityY = 0
        }
    })
}
)
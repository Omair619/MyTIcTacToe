console.log("welcome to tic tac toe");
let music = new Audio("files/music.mp3");
let audioTurn = new Audio("files/ting.mp3");
let gameover = new Audio("files/gameover.mp3");
let turn = "X";
let isgameover = false;
let stopTurn = false;

// function to change the turn
const changeTurn = () => {
    return turn === "X" ? "0" : "X";
}

// function to check for a win
const checkWin = () => {
    let boxtext = document.getElementsByClassName("box_text");
    let wins = [
        [0, 1, 2, 2.5, 4.7, 0, 10, 9.7, 0],
        [3, 4, 5, 2.5, 14.7, 0, 10, 29.7, 0],
        [6, 7, 8, 2.5, 24.7, 0, 10, 49.7, 0],
        [0, 3, 6, -7.5, 14.8, 90, -10, 29.7, 90],
        [1, 4, 7, 2.5, 14.8, 90, 10.2, 29.7, 90],
        [2, 5, 8, 12.6, 14.5, 90, 30.3, 29.7, 90],
        [0, 4, 8, 2.5, 14.8, 45, 10, 29.7, 45],
        [2, 4, 6, 2.6, 14.7, 135, 10, 29.7, 135],
    ]
    wins.forEach(e => {
        if ((boxtext[e[0]].innerText === boxtext[e[1]].innerText) && (boxtext[e[2]].innerText === boxtext[e[1]].innerText) && (boxtext[e[0]].innerText !== "")) {
            document.querySelector(".info").innerText = boxtext[e[0]].innerText + " won";
            isgameover = true;
            stopTurn = true;
            music.play()
            document.querySelector(".img_box").getElementsByTagName("img")[0].style.width = "200px";
            const mediaQuery = window.matchMedia('(max-width: 950px)') 
            if (mediaQuery.matches) {               
                document.querySelector(".line").style.transform = `translate(${e[6]}vw, ${e[7]}vw) rotate(${e[8]}deg)`;
                document.querySelector(".line").style.width = "40vw";
            }
            else{
                document.querySelector(".line").style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
                document.querySelector(".line").style.width = "25vw";
            }
        }
    })
}

//game logic
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector(".box_text");
    element.addEventListener("click", () => {
        if (boxtext.innerText === "") {
            if (!isgameover) {
                boxtext.innerText = turn;
                turn = changeTurn();
                audioTurn.play();
                checkWin();
                if (!stopTurn) {
                    document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
                }
            }
        }
    })
})

//add onclick listener to reset button
reset.addEventListener("click", () => {
    let boxtext = document.querySelectorAll(".box_text");
    Array.from(boxtext).forEach(element => {
        element.innerText = ""
    });
    turn = "X";
    isgameover = false;
    stopTurn = false;
    document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
    document.querySelector(".img_box").getElementsByTagName("img")[0].style.width = "0px";
    music.pause()
    music.currentTime = 0
    gameover.play()
    document.querySelector(".line").style.width = "";
})
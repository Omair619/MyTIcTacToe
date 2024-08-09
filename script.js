let music = new Audio("files/music.mp3");
let audioTurn = new Audio("files/ting.mp3");
let gameover = new Audio("files/gameover.mp3");
let turn = "X";
let isgameover = false;
let stopTurn = false;
let sp = document.getElementById("sp");
let dp = document.getElementById("dp");
let smode=true



    // alert("dp mode null,sp mode chl gya")
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
            if(smode){
                document.querySelector(".info").innerText = boxtext[e[0]].innerText === "X" ? "You Won" : "Opponent Won";
            }
            if(!smode){
                document.querySelector(".info").innerText = boxtext[e[0]].innerText === "X" ? "Player1 Won" : "Player2 Won";
            }
            isgameover = true;
            stopTurn = true;
            music.play()
            document.querySelector(".img_box").getElementsByTagName("img")[0].style.width = "200px";
            const mediaQuery = window.matchMedia('(max-width: 950px)')
            if (mediaQuery.matches) {
                document.querySelector(".line").style.transform = `translate(${e[6]}vw, ${e[7]}vw) rotate(${e[8]}deg)`;
                document.querySelector(".line").style.width = "40vw";
            }
            else {
                document.querySelector(".line").style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
                document.querySelector(".line").style.width = "25vw";
            }
        }
    })
}

//game logic
let boxes = document.getElementsByClassName("box");
let count = 0;
let loading = false
Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector(".box_text");
    element.addEventListener("click", () => {
        if (boxtext.innerText === "" && loading === false) {
            if (!isgameover) {
                count += 1
                boxtext.innerText = turn;
                turn = changeTurn();
                audioTurn.play();
                checkWin();
                if (!stopTurn && smode===true) {
                    document.getElementsByClassName("info")[0].innerText = turn === "X" ? "Your Turn" : "Opponent Turn";
                }
                if (!stopTurn && smode===false) {
                    document.getElementsByClassName("info")[0].innerText = turn === "X" ? "Player1 Turn" : "Player2 Turn";
                }
            }
            if (turn !== "X" && count < 5 && smode===true) {
                loading = true
                opponentCaller();
            }
        }
    })
})
const opponentCaller = () => {
    setTimeout(() => {
        if (loading === true) {
            let boxtext = document.getElementsByClassName("box_text");
            let selectBoxtext = Array.from(boxtext)
            let funcCondition = true
            while (funcCondition) {
                let numbgenerate = Math.floor(Math.random() * selectBoxtext.length)
                if (selectBoxtext[numbgenerate].innerText === "") {
                    if (!isgameover) {
                        selectBoxtext[numbgenerate].innerText = turn
                        turn = changeTurn();
                        audioTurn.play();
                        checkWin();
                        if (!stopTurn) {
                            document.getElementsByClassName("info")[0].innerText = turn === "X" ? "Your Turn" : "Opponent Turn";
                        }
                    }
                    funcCondition = false
                    loading = false
                }
            }
        }
    }, 2000)
}


//add onclick listener to reset button
reset.addEventListener("click", () => {
    resetcaller()
})


const resetcaller=()=>{
    let boxtext = document.querySelectorAll(".box_text");
    Array.from(boxtext).forEach(element => {
        element.innerText = ""
    });
    turn = "X";
    isgameover = false;
    stopTurn = false;
    loading = false
    count = 0;
    if(smode){
        document.getElementsByClassName("info")[0].innerText = turn === "X" ? "Your Turn" : "Opponent Turn";
    }
    if(!smode){
        document.getElementsByClassName("info")[0].innerText = turn === "X" ? "Player1 Turn" : "Player2 Turn";
    }
    document.querySelector(".img_box").getElementsByTagName("img")[0].style.width = "0px";
    music.pause()
    music.currentTime = 0
    gameover.play()
    document.querySelector(".line").style.width = "";
}



//event for single player mode
sp.addEventListener("click", function () {
    smode=true
    sp.classList.add("bg")
    dp.classList.remove("bg")
    resetcaller()
})



//event for double player mode
dp.addEventListener("click", function () {
    smode=false
    dp.classList.add("bg")
    sp.classList.remove("bg")
    resetcaller()
})

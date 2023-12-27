const container= document.getElementById("container");
const colorCode= document.getElementById("color-code");
const scoreDiv= document.getElementById("score");
let randomColor=null;
let score=0;

//RGB Color Generation
function generateNum(min,max)
{
    return min + Math.floor(Math.random() * (max - min + 1));
}

const generateColorRGB = () => {
    const red= generateNum(0,255);
    const green= generateNum(0,255);
    const blue= generateNum(0,255);
    return `rgb(${red}, ${green}, ${blue})`;
}
//validating and setting score
function incrementScore()
{
    score+=1;
    scoreDiv.innerText=score;
}
function validation(val)
{
    const selectColor=val.target.style.backgroundColor;
    if(selectColor===randomColor)
    {
        incrementScore();
    }

    window.localStorage.setItem("score",score);//store in local storage before next guess
    startGame();
}

function startGame(){
    score= Number(window.localStorage.getItem("score")) ?? 0;//after refresh retrieve from local storage
    scoreDiv.innerText=score;
    container.innerHTML=null;//after new reload
    randomColor=generateColorRGB();
    colorCode.innerText=randomColor;

    const ansInd= generateNum(0,5);//for one color to be in answer

    for(let i=0; i<6; i++)
    {
        //create div, set eventlistener, add color
        const div=document.createElement('div');
        div.addEventListener("click", validation);
        div.style.backgroundColor= i==ansInd ? randomColor: generateColorRGB();
        container.append(div);
    }
}

window.addEventListener("load", () => startGame())
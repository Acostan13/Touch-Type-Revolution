//declaring global variables
canvas.width = window.innerWidth; //Set canvas width
canvas.height = window.innerHeight; //Set canvas height

let frameId; // animation frames aka window animate function
let elem = document.getElementById('main-container'); // contains start screen elements
let elemParent = document.getElementById('main-container').parentElement; // parent of start screen used for removal purposes

//'excellent' pressdown region of canvas
let excellent = {x:0, y:canvas.height/3-110, w:canvas.width, h:55, color: 'rgba(30, 204, 24, 1)'}
//'nice' pressdown region of canvas
let nice = {x:0, y:canvas.height/3-140, w:canvas.width, h:115, color:'rgba(234, 199, 0, 1)'}

let txt = 'Touch Type Revolution';  // text input into typewriter 
let i = 0; // text iterator
let speed = 50; // speed of type writer function

let game = new Game(); // instantiation of game class

// start button functionalities
// hard mode
document.querySelector('#hard-mode').onclick = function() { //Start button is clicked 
    game.startGame() //calls startGame
    game.hardMode()
    clearHomePage()
}

// normal mode
document.querySelector('#normal-mode').onclick = function() { //Start button is clicked 
    game.startGame() //calls startGame
    game.normalMode()
    clearHomePage()
}

// easy mode
document.querySelector('#easy-mode').onclick = function() { //Start button is clicked 
    game.startGame() //calls startGame
    game.easyMode()
    clearHomePage()
}

// tutorial
document.querySelector('#instructions').onclick = function() { //Start button is clicked 
    window.location.pathname = './instructionsBS.html';
}

// removes all elements on the home page
clearHomePage = () => {
    console.log(elemParent)
    elemParent.removeChild(elem);
}

// appears after game is over
playAgain = () => {    
    game = new Game();
    console.log(game, elemParent, elem)
    elemParent.appendChild(elem);  
}

// animates the intro screen to type the game title
typeWriter = () => {
    if (i < txt.length) {
      document.getElementById("demo").innerHTML += txt.charAt(i);
      i++;
      setTimeout(typeWriter, speed);
    }
}
typeWriter()


document.onkeydown = function(e) {//keydown function
    for(let i = 0; i < game.keys.length; i++){ //looping through keys array
        if(game.keys[i].image.alt == e.key){ //checks if the keycap image matches the key pressed down by the user
            game.successfulKeyPressdown(game.keys[i]); // calls function to see if keydown was pressed at the right time
            console.log(game.keys.splice(i, 1)); //slices out the image
            return
        }
    }
}








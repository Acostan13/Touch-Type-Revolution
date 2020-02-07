// main class
class Game {
    constructor() {
        this.keys = [];// array of keys
        this.difficulty = 0; // if this variable is true, game is on hard mode. else, vice versa
        this.gameOverCounter = 7; // counter for number of mistakes allowable.
        this.scoreCounter = 0;//keeps track of the players score    
        this.index = 0;// used to finish normal mode
    }

    // starts the game!
    startGame = () => {  
        window.requestAnimationFrame(this.animate) //Starts the animation infinite loop.
    }

    // creates ordered keys according to sentence string
    orderedImageGenerator = () => {
        let sentence = `Hi my name is alex ` //sequence of logical letters (just a sentence) and i'm an ironhacker. this is my first project which is a typing game. Enjoy, and thanks for playing.......
        let letters = sentence.replace(/ /g,'').toLowerCase().split('') //splits string into array of letters
        let matchedImage = keycapImages.find(letter => letter.alt == letters[this.index]); // matches the letter image with the index of sentence
        this.index++;
        if(this.index >= letters.length + 1) {
            window.cancelAnimationFrame(this.frameId);
            playAgain();
        }
        return matchedImage;
    }

    // creates random keys from array of images.
    randomImageGenerator = () => {
        return keycapImages[Math.floor(Math.random()*keycapImages.length)];
    }

    // creates random letter from array of images
    randomLetterGenerator = () => {
        return letterImages[Math.floor(Math.random()*letterImages.length)];
    }

    // plays random Owen Wilson sound
    playSound = () => {
        return sounds[Math.floor(Math.random()*sounds.length)].play();
    }

    // key object factory
    keyGenerator = (generator) => {
        let key = {
        x: Math.random()*(canvas.width-50),
        y: 720,
        width: 20,
        height: 50,
        image: generator() // finds the image associated with the indexed letters 
        }
        this.keys.push(key) // pushes key objects into array to be drawn
    }

    //creates image of letters, assigns starting position, and generates them every .6 seconds (hard mode)
    hardMode = () => {
        this.difficulty = 3;//sets mode to true in order to call the correct drawImage function
        setInterval(() => this.keyGenerator(this.randomImageGenerator), 800) // generates object every .6 seconds (easy mode)
    }

    //creates image of letters, assigns starting position, and generates them every 1 second (normal mode)
    normalMode = () => {
        this.difficulty = 2;//sets mode to true in order to call the correct drawImage function
        this.interval = setInterval(() => this.keyGenerator(this.orderedImageGenerator), 1000) // generates object every .6 seconds (easy mode)
    }

    //creates image of letters, assigns starting position, and generates them every 1.2 seconds (easy mode)
    easyMode = () => {
        this.difficulty = 1;
        setInterval(() => this.keyGenerator(this.randomLetterGenerator), 1200)
    }


    //draws the rectangular areas where users should be keying down
    drawTargetArea = () => {
        //draws yellow area which corresponds to the 'nice' range
        ctx.fillStyle = nice.color; 
        ctx.fillRect(nice.x,nice.y, nice.w, nice.h);
        
        //draws green area which corresponds to the 'excellent' range
        ctx.fillStyle = excellent.color;
        ctx.fillRect(excellent.x,excellent.y, excellent.w, excellent.h);
    }

    //loops through array of key images and draws them depending on mode selected
    drawKeys = () =>{
        this.keys.forEach((key,i)=>{
            if(this.difficulty === 3){// hard mode
                ctx.drawImage(key.image, key.x, key.y-=3, 50, 50); // draws key images on the canvas
                ctx.fillStyle = "rgba(234, 28, 134, 1)";
                ctx.font = "32px Roboto";
                ctx.fillText(`Score: ${this.scoreCounter}`, 50,(canvas.height / 20)); // displays players score
                ctx.fillStyle = "rgba(20, 196, 255, 1)";
                ctx.font = "32px Roboto";
                ctx.fillText(`Lives: ${this.gameOverCounter}`, canvas.width - 175,(canvas.height / 20)); // displays players lives left
            }
            else if (this.difficulty === 2){ // normal mode
                ctx.drawImage(key.image, key.x, key.y-=2, 50, 50); // draws images on the canvas slower
                ctx.fillStyle = "rgba(234, 28, 134, 1)";
                ctx.font = "32px Roboto";
                ctx.fillText(`Score: ${this.scoreCounter}`, 50, (canvas.height / 20)); // displays players score
                ctx.fillStyle = "rgba(20, 196, 255, 1)";
                ctx.font = "32px Roboto";
                ctx.fillText(`Lives: ${this.gameOverCounter}`, canvas.width - 175, (canvas.height / 20)); // displays players lives left
            }
            else if (this.difficulty === 1){ // easy mode
                ctx.drawImage(key.image, key.x, key.y--, 50, 50); // draws images on the canvas slower
                ctx.fillStyle = "rgba(234, 28, 134, 1)";
                ctx.font = "32px Roboto";
                ctx.fillText(`Score: ${this.scoreCounter}`, 50, (canvas.height / 20)); // displays players score
                ctx.fillStyle = "rgba(20, 196, 255, 1)";
                ctx.font = "32px Roboto";
                ctx.fillText(`Lives: ${this.gameOverCounter}`, canvas.width - 175, (canvas.height / 20)); // displays players lives left
            }
        })
    }

    //checks to see if player hit the right key at the right time
    successfulKeyPressdown = (key) =>{

        // when player successfully keysdown in 'excellent' zone
        if(key.y > excellent.y && key.y + key.height < excellent.y+ excellent.h){
            console.log("excellent");
            this.playSound(); //notifies user they did an excellent job. WoW!
            particlesPerExplosion = 60;//sets parameters for bigger particle explosion
            particlesMinSpeed     = 9;
            particlesMaxSpeed     = 18;
            particlesMinSize      = 3;
            particlesMaxSize      = 9;
            keyPressdown(key.x, key.y)// sets off explosions of reaffirmation
            this.scoreCounter+= 30; //increments score by thirty 

        }
        // when player successfully keysdown in 'nice' zone
        else if(key.y > nice.y && key.y + key.height < nice.y+ nice.h){
            console.log("nice");
            particlesPerExplosion = 20;//sets parameters for particle explosions
            particlesMinSpeed     = 3;
            particlesMaxSpeed     = 6;
            particlesMinSize      = 1;
            particlesMaxSize      = 3;
            keyPressdown(key.x, key.y)// sets off explosions of reaffirmation
            this.scoreCounter+=10;//increments score by ten
        }
        // subtracts score and lives when player doesn't keydown in target zones
        else {
            this.scoreCounter-=10;
            this.gameOverCounter-=1;
        }
    }

    //splices out images from key array when they go out of the y bounds of the canvas
    yBoundary = () => {
        for(let i=0; i<this.keys.length; i++){ //iterate through keys array
            if(this.keys[i].y < 0){   
                console.log(this.keys.splice(i, 1));
                this.gameOverCounter--;
                console.log(this.gameOverCounter);
            }
            if(this.gameOverCounter <= 0 ){
                console.log('game over');
                window.cancelAnimationFrame(this.frameId);
                playAgain();
            }
        }
    }


    //WHERE ALL THE MAGIC HAPPENS
    animate = () => { 
        this.frameId = window.requestAnimationFrame(this.animate); // creates animation effect on the canvas
        ctx.clearRect(0,0,canvas.width, canvas.height); //clears the whole canvas
        this.drawTargetArea(); 
        this.drawKeys();
        this.yBoundary();
        
        now   = Date.now();
        delta = now - then;
        // New frame
        if (delta > interval) {
        // Update THEN
        then = now - (delta % interval);
        // explosion animation
        drawExplosion();
        }
    }
}
// main class
class Game {
    constructor() {
        this.keys = [];// array of keys
        this.difficulty = 0; // if this variable is true, game is on hard mode. else, vice versa
        this.gameOverCounter = 4; // counter for number of mistakes allowable.
        this.scoreCounter = 0;//keeps track of the players score    
        this.index = 0;//
    }

    // starts the game!
    startGame = () => {  
        console.log("START") 
        window.requestAnimationFrame(this.animate) //Starts the animation infinite loop.
    }

    // creates ordered keys according to sentence string
    orderedImageGenerator = () => {
        let sentence = `Hi my name is alex and i'm an ironhacker. this is my first project which is a typing game. i hope this game will help me land a developer job in a good company` //sequence of logical letters (just a sentence)
        let letters = sentence.replace(/ /g,'').toLowerCase().split('') //splits string into array of letters
        let matchedImage = keycapImages.find(letter => letter.alt == letters[this.index]); // matches the letter image with the index of sentence
        if(this.index < letters.length) {
            this.index++;
        } 
        else {
            this.finish = true;
            clearInterval(this.interval);
            // window.cancelAnimationFrame(this.frameId);
            // playAgain();
        }
        this.started = true;
        return matchedImage;
    }

    // creates random keys from array of images.
    randomImageGenerator = () => {
        return keycapImages[Math.floor(Math.random()*keycapImages.length)];
    }

    // creates random keys from array of images
    randomLetterGenerator = () => {
        return letterImages[Math.floor(Math.random()*letterImages.length)];
    }

    // plays random Owen Wilson sound
    playSound = () => {
        return sounds[Math.floor(Math.random()*sounds.length)].play();
    }

    keyGenerator = (generator) => {
        let key = {
        x: Math.random()*(canvas.width-50),
        y: 720,
        width: 20,
        height: 50,
        image: generator() // finds the image associated with the indexed letters 
        }
        this.keys.push(key)
    }

    //creates image of letters, assigns starting position, and generates them every .6 seconds (easy mode)
    hardMode = () => {
        this.difficulty = 3;//sets mode to true in order to call the correct drawImage function with faster moving keys
        setInterval(() => this.keyGenerator(this.randomImageGenerator), 600) // generates object every .6 seconds (easy mode)
    }

    //creates image of letters, assigns starting position, and generates them every .6 seconds (easy mode)
    normalMode = () => {
        this.difficulty = 2;//sets mode to true in order to call the correct drawImage function with faster moving keys
        this.interval = setInterval(() => this.keyGenerator(this.orderedImageGenerator), 800) // generates object every .6 seconds (easy mode)
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

    //loops through images array and draws them depending on mode selected
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
                if(key.y < -50|| !key.image) this.keys.splice(i, 1);
                    try {
                        ctx.drawImage(key.image, key.x, key.y-=2, 50, 50); // draws images on the canvas slower
                    } 
                    catch(err) {console.log(key); }
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
            keyPressdown(key.x, key.y)// sets off explosions of reaffirmation
            this.scoreCounter+= 30; //increments score by thirty 
        }
        // when player successfully keysdown in 'nice' zone
        if(key.y > nice.y && key.y + key.height < nice.y+ nice.h){
            console.log("nice");
            //keyPressdown(key.x, key.y)
            this.scoreCounter+=10;//increments score by ten
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
        // console.log(this.keys.length);
        if(this.keys.length === 0 && this.started && this.finish) {
            window.cancelAnimationFrame(this.frameId);
            playAgain();
        }
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
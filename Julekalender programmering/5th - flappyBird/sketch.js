// Constants
const GRAVITY = 0.6;
const FLAP_FORCE = -10;
const PILLAR_WIDTH = 80;
const PILLAR_GAP = 200;
const PILLAR_SPEED = 2;
const GROUND_HEIGHT = 20; // Added constant for ground height

// Variables
let bird;
let pillars = [];
let score = 0;
let gameOver = false;
let restartButton;
let BackButton;
let gameStarted = false; // Added variable to track game start

function setup() {
    let canvasSize = min(windowWidth, windowHeight * 0.8);
    let canvas = createCanvas(canvasSize, canvasSize);
    canvas.style('display', 'block');
    canvas.style('margin', 'auto');
    bird = new Bird();
    pillars.push(new Pillar());

    BackButton = select('#BackButton')
    BackButton.mousePressed(GetTheFuckBack);
    restartButton = createButton('Restart');
    restartButton.position(width - restartButton.width / 2, height / 6 - restartButton.height / 4);
    restartButton.mousePressed(restartGame);
    restartButton.hide();
}

function GetTheFuckBack() {
    var currentPath = window.location.pathname;
    var newPath = currentPath.substring(0, currentPath.lastIndexOf('/'));
    window.location.href = newPath + "/../index.html";
}

function draw() {
    background(220);

    if (gameStarted) { // Check if game has started
        if (!gameOver) {
            for (let i = pillars.length - 1; i >= 0; i--) {
                pillars[i].update();
                pillars[i].show();

                if (pillars[i].hits(bird) || bird.hitsGround()) { // Added condition for bird hitting the ground
                    // Game over logic
                    gameOver = true;
                    restartButton.show();
                    console.log("Game over!");
                }

                if (!pillars[i].passed && pillars[i].offscreen()) {
                    pillars[i].passed = true;
                    score++;
                }

                if (pillars[i].offscreen()) {
                    pillars.splice(i, 1);
                }
            }

            bird.update();
            bird.show();

            if (frameCount % 100 === 0) {
                pillars.push(new Pillar());
            }
        } else {
            textSize(32);
            textAlign(CENTER, CENTER);
            fill(255, 0, 0);
            text("Game over!", width / 2, height / 2);
        }

        textSize(24);
        textAlign(LEFT, TOP);
        fill(0);
        text("Score: " + score, 10, 10);
    } else {
        textSize(32);
        textAlign(CENTER, CENTER);
        fill(0);
        text("Press Space to Start", width / 2, height / 2);
    }
}

function keyPressed() {
    if (key === ' ' && !gameStarted) { // Start the game when spacebar is pressed
        gameStarted = true;
    } else if (key === ' ' && !gameOver) {
        bird.flap();
    }
}

function restartGame() {
    score = 0;
    gameOver = false;
    restartButton.hide();
    bird = new Bird();
    pillars = [];
    pillars.push(new Pillar());
}

class Bird {
    constructor() {
        this.x = 50;
        this.y = height / 2;
        this.velocity = 0;
        this.score = 0;
    }

    update() {
        this.velocity += GRAVITY;
        this.y += this.velocity;

        // Boundary check
        if (this.y > height - GROUND_HEIGHT) { // Added condition for bird touching the ground
            this.y = height - GROUND_HEIGHT;
            this.velocity = 0;
        } else if (this.y < 0) {
            this.y = 0;
            this.velocity = 0;
        }
    }

    show() {
        fill(255);
        ellipse(this.x, this.y, 32, 32);
    }

    flap() {
        this.velocity = FLAP_FORCE;
    }

    hitsGround() {
        return this.y >= height - GROUND_HEIGHT; // Added method to check if bird hits the ground
    }
}

class Pillar {
    constructor() {
        this.top = random(height / 6, (3 / 4) * height);
        this.bottom = this.top + PILLAR_GAP;
        this.x = width;
        this.width = PILLAR_WIDTH;
        this.speed = PILLAR_SPEED;
        this.passed = false;
    }

    update() {
        this.x -= this.speed;
    }

    show() {
        fill(0, 255, 0);
        rect(this.x, 0, this.width, this.top);
        rect(this.x, this.bottom, this.width, height - this.bottom);
    }

    offscreen() {
        return this.x < -this.width;
    }

    hits(bird) {
        if (bird.y < this.top || bird.y > this.bottom) {
            if (bird.x > this.x && bird.x < this.x + this.width) {
                return true;
            }
        }
        return false;
    }
}
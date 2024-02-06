let snake;
let food;
let scl;
let BackButton;
let score = 0;

function setup() {
    let canvasSize = min(windowWidth, windowHeight - document.body.clientHeight);
    let canvas = createCanvas(canvasSize, canvasSize);
    canvas.style('display', 'block');
    canvas.style('margin', 'auto');
    scl = canvasSize / 30;
    snake = new Snake();
    frameRate(10);
    pickLocation();
    BackButton = select('#BackButton')
    BackButton.mousePressed(GetTheFuckBack);
}

function pickLocation() {
    let cols = floor(width/scl);
    let rows = floor(height/scl);
    food = createVector(floor(random(cols)), floor(random(rows)));
    food.mult(scl);
}

function GetTheFuckBack(){
    var currentPath = window.location.pathname;
    var newPath = currentPath.substring(0, currentPath.lastIndexOf('/'));
    window.location.href = newPath + "/../index.html";
}

function draw() {
    background(51);

    if (snake.eat(food)) {
        pickLocation();
        score++;
    }

    snake.death();
    snake.update();
    snake.show();

    fill(255, 0, 100);
    rect(food.x, food.y, scl, scl);

    textSize(scl);
    fill(255);
    text(`Score: ${score}`, scl, scl * 2);
}

function keyPressed() {
    if ((key === 'w' || keyCode === UP_ARROW) && snake.yspeed !== 1) {
        snake.dir(0, -1);
    } else if ((key === 's' || keyCode === DOWN_ARROW) && snake.yspeed !== -1) {
        snake.dir(0, 1);
    } else if ((key === 'd' || keyCode === RIGHT_ARROW) && snake.xspeed !== -1) {
        snake.dir(1, 0);
    } else if ((key === 'a' || keyCode === LEFT_ARROW) && snake.xspeed !== 1) {
        snake.dir(-1, 0);
    }
}

class Snake {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.xspeed = 1;
        this.yspeed = 0;
        this.total = 0;
        this.tail = [];
    }

    dir(x, y) {
        this.xspeed = x;
        this.yspeed = y;
    }

    update() {
        if (this.total === this.tail.length) {
            for (let i = 0; i < this.tail.length-1; i++) {
                this.tail[i] = this.tail[i+1];
            }
        }
        this.tail[this.total-1] = createVector(this.x, this.y);

        this.x = this.x + this.xspeed*scl;
        this.y = this.y + this.yspeed*scl;

        this.x = constrain(this.x, 0, width-scl);
        this.y = constrain(this.y, 0, height-scl);
    }

    show() {
        fill(255);
        for (let i = 0; i < this.tail.length; i++) {
            rect(this.tail[i].x, this.tail[i].y, scl, scl);
        }
        rect(this.x, this.y, scl, scl);
    }

    eat(pos) {
        let d = dist(this.x, this.y, pos.x, pos.y);
        if (d < 1) {
            this.total++;
            return true;
        } else {
            return false;
        }
    }

    death() {
        for (let i = 0; i < this.tail.length; i++) {
            let pos = this.tail[i];
            let d = dist(this.x, this.y, pos.x, pos.y);
            if (d < 1) {
                score = 0;
                this.total = 0;
                this.tail = [];
            }
        }
    }
}

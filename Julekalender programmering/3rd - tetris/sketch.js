const rows = 20;
const cols = 10;
let blockSize = 30;

let gamespeed = 1;
let board = [];
let currentPiece;
let gameOver = false;
let BackButton;
let time = 0;

const AllShapes= [
    [[1, 1], [1, 1]], // Square
    [[1, 1, 1, 1]], // LineRIGHT
    [[1],[1],[1],[1]], //LineUP
    [[1,1,1], [0, 1, 0]], // T-shapeUP
    [[1,0,0], [1, 1, 0], [1,0,0]], // T-shapeRIGHT
    [[0,1,0], [1, 1, 1]], // T-shapeDOWN
    [[0,0,1], [0, 1, 1], [0,0,1]], // T-shapeLEFT
    [[1, 1, 0], [0, 1, 1]], // Z-shapeUP
    [[0, 0, 1], [0, 1, 1], [0,1,0]], // Z-shapeDOWN
    [[0, 1, 1], [1, 1, 0]], // S-shapeUP
    [[0, 1, 0], [0, 1, 1], [0,0,1]], // S-shapeDOWN
    [[1, 1, 1], [0, 0, 1]], // J-shapeUP
    [[0, 0, 1], [0, 0, 1],[0,1,1]], // J-shapeRIGHT
    [[1, 0, 0], [1, 1, 1]], // J-shapeDOWN
    [[0, 1, 1], [0, 1, 0],[0,1,0]], // J-shapeLEFT
    [[1, 1, 1], [1, 0, 0]], // L-shapeUP
    [[1, 0, 0], [1, 0, 0],[1,1,0]], // L-shapeRIGHT
    [[0, 0, 1], [1, 1, 1]], // L-shapeDOWN
    [[1, 1, 0], [1, 0, 0],[1,0,0]], // L-shapeLEFT
]
const AllShapesNames= [
    "Square",
    "LineRIGHT",
    "LineUP",
    "T-ShapeUP",
    "T-ShapeRIGHT",
    "T-ShapeDOWN",
    "T-ShapeLEFT",
    "Z-ShapeUP",
    "Z-ShapeDOWN",
    "S-ShapeUP",
    "S-ShapeDOWN",
    "J-ShapeUP",
    "J-ShapeRIGHT",
    "J-ShapeDOWN",
    "J-ShapeLEFT",
    "L-ShapeUP",
    "L-ShapeRIGHT",
    "L-ShapeDOWN",
    "L-ShapeLEFT"
]

function setup() {
    frameRate = 60;
    blockSize = windowHeight/33;
    let canvas = createCanvas(cols * blockSize, rows * blockSize);
    canvas.style('display', 'block');
    canvas.style('margin', 'auto');
    
    initializeBoard();
    spawnPiece();
    BackButton = select('#BackButton')
    //BackButton.mousePressed(GetTheFuckBack);
}

function draw() {
    
    background(220);
    if (!gameOver) {
        updateGame();
        drawBoard();
        drawPiece();
    } else {
        showGameOver();
    }
    
}

function initializeBoard() {
    for (let row = 0; row < rows; row++) {
        board[row] = [];
        for (let col = 0; col < cols; col++) {
            board[row][col] = 0;
        }
    }
}

function spawnPiece() {
    currentPiece = new Piece();
}

function updateGame() {
    if (currentPiece.canMoveDown() && time == 60) {
        time = 0;
        currentPiece.moveDown();
    } else if (!currentPiece.canMoveDown()) {
        currentPiece.lock();
        if (currentPiece.isGameOver()) {
            gameOver = true;
        } else {
            checkAndClearLines();
            spawnPiece();
        }
        
    }
    else{
    time++;
    }
}

function drawBoard() {
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (board[row][col] === 1) {
                fill(0);
            } else {
                fill(255);
            }
            rect(col * blockSize, row * blockSize, blockSize, blockSize);
        }
    }
}

function drawPiece() {
    const { x, y, shape } = currentPiece;
    for (let row = 0; row < shape.length; row++) {
        for (let col = 0; col < shape[row].length; col++) {
            if (shape[row][col] === 1) {
                fill(0);
                rect((col + x) * blockSize, (row + y) * blockSize, blockSize, blockSize);
            }
        }
    }
}

function showGameOver() {
    textSize(32);
    textAlign(CENTER, CENTER);
    fill(255, 0, 0);
    text("Game Over", width / 2, height / 2);
}

class Piece {
    constructor() {
        this.x = Math.floor(cols / 2) - 1;
        this.y = 0;
        this.shape = this.getRandomShape();
    }

    getRandomShape() {
        const shapes = [
            [[1, 1], [1, 1]], // Square
            [[1, 1, 1, 1]], // Line
            [[1, 1, 1], [0, 1, 0]], // T-shape
            [[1, 1, 0], [0, 1, 1]], // Z-shape
            [[0, 1, 1], [1, 1, 0]], // S-shape
            [[1, 1, 1], [0, 0, 1]], // L-shape
            [[1, 1, 1], [1, 0, 0]] // J-shape
        ];
        const randomIndex = Math.floor(Math.random() * shapes.length);
        return shapes[randomIndex];
    }

    canMoveDown() {
        for (let row = 0; row < this.shape.length; row++) {
            for (let col = 0; col < this.shape[row].length; col++) {
                if (this.shape[row][col] === 1) {
                    const nextRow = this.y + row + 1;
                    if (nextRow >= rows || board[nextRow][this.x + col] === 1) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    canMoveLeft() {
        for (let row = 0; row < this.shape.length; row++) {
            for (let col = 0; col < this.shape[row].length; col++) {
                if (this.shape[row][col] === 1) {
                    const nextCol = this.x + col - 1;
                    if (nextCol < 0 || board[this.y + row][nextCol] === 1) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    canMoveRight() {
        for (let row = 0; row < this.shape.length; row++) {
            for (let col = 0; col < this.shape[row].length; col++) {
                if (this.shape[row][col] === 1) {
                    const nextCol = this.x + col + 1;
                    if (nextCol >= cols || board[this.y + row][nextCol] === 1) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    rotate() {
        let PieceName = this.WhichPiece(currentPiece.shape)
        print(PieceName)
        print(currentPiece.shape)
        //Square - Shape
        if(PieceName == "Square")
        return
        //Line - Shapes
        else if(PieceName == "LineRIGHT")
            this.shape = AllShapes[2]
        else if(PieceName == "LineUP")
            this.shape = AllShapes[1]
        //T - Shapes
        else if(PieceName =="T-ShapeUP")
            this.shape = AllShapes[4]
        else if(PieceName =="T-ShapeRIGHT")
            this.shape = AllShapes[5]
        else if(PieceName =="T-ShapeDOWN")
            this.shape = AllShapes[6]
        else if(PieceName =="T-ShapeLEFT")
            this.shape = AllShapes[3]
        //Z - Shapes
        else if(PieceName =="Z-ShapeUP")
            this.shape = AllShapes[8]
        else if(PieceName =="Z-ShapeDOWN")
            this.shape = AllShapes[7]
        //S - Shapes
        else if(PieceName =="S-ShapeUP")
            this.shape = AllShapes[10]
        else if(PieceName =="S-ShapeDOWN")
            this.shape = AllShapes[9]
        //J - Shapes
        else if(PieceName =="J-ShapeUP")
            this.shape = AllShapes[12]
        else if(PieceName =="J-ShapeRIGHT")
            this.shape = AllShapes[13]
        else if(PieceName =="J-ShapeDOWN")
            this.shape = AllShapes[14]
        else if(PieceName =="J-ShapeLEFT")
            this.shape = AllShapes[11]
        //L - Shapes
        else if(PieceName =="L-ShapeUP")
            this.shape = AllShapes[16]
        else if(PieceName =="L-ShapeRIGHT")
            this.shape = AllShapes[17]
        else if(PieceName =="L-ShapeDOWN")
            this.shape = AllShapes[18]
        else if(PieceName =="L-ShapeLEFT")
            this.shape = AllShapes[15]
        
        if (!this.canMoveLeft() || !this.canMoveRight() || !this.canMoveDown()) {
            // Revert the rotation if it causes collision
            this.shape = this.rotateBack(this.shape);
        }
    }
    
    rotateBack(shape) {
        const rotatedShape = [];
        for (let col = shape[0].length - 1; col >= 0; col--) {
            const newRow = [];
            for (let row = 0; row < shape.length; row++) {
                newRow.push(shape[row][col]);
            }
            rotatedShape.push(newRow);
        }
        return rotatedShape;
    }
    
    WhichPiece(piece){
        
        for(let i = 0; i < AllShapes.length; i++){
            if(this.compareArrays(AllShapes[i], piece)){
                return(AllShapesNames[i])
            }
        }
    }
    compareArrays(a,b) {
        return JSON.stringify(a) === JSON.stringify(b);
    }

    moveDown() {
        if (this.canMoveDown()) {
            this.y++;
        }
    }

    moveLeft() {
        if (this.canMoveLeft()) {
            this.x--;
        }
    }

    moveRight() {
        if (this.canMoveRight()) {
            this.x++;
        }
    }

    lock() {
        for (let row = 0; row < this.shape.length; row++) {
            for (let col = 0; col < this.shape[row].length; col++) {
                if (this.shape[row][col] === 1) {
                    board[this.y + row][this.x + col] = 1;
                }
            }
        }
    }

    isGameOver() {
        for (let col = 0; col < cols; col++) {
            if (board[0][col] === 1) {
                return true;
            }
        }
        return false;
    }
}

function checkAndClearLines() {
    for (let row = rows - 1; row >= 0; row--) {
        let isFullLine = true;
        for (let col = 0; col < cols; col++) {
            if (board[row][col] !== 1) {
                isFullLine = false;
                break;
            }
        }
        if (isFullLine) {
            clearLine(row);
            row++; // Check the same row again after clearing
        }
    }
}

function clearLine(row) {
    for (let r = row; r > 0; r--) {
        for (let col = 0; col < cols; col++) {
            board[r][col] = board[r - 1][col];
        }
    }
    for (let col = 0; col < cols; col++) {
        board[0][col] = 0;
    }
}

function keyPressed() {
    if (!gameOver) {
        if (keyCode === LEFT_ARROW) {
            currentPiece.moveLeft();
        } else if (keyCode === RIGHT_ARROW) {
            currentPiece.moveRight();
        } else if (keyCode === DOWN_ARROW) {
            currentPiece.moveDown();
        } else if (keyCode === UP_ARROW) {
            currentPiece.rotate();
        }
    }
}

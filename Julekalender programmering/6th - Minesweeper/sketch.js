const rows = 10;
const cols = 10;
const totalMines = 10;

let grid = [];
let gameOver = false;
let bombsFound = 0;

function setup() {
  
  let canvas = createCanvas(400, 400);
  canvas.style('display', 'block');
  canvas.style('margin', 'auto');
  createGrid();
  placeMines();
  calculateNumbers();
}

function createGrid() {
  for (let i = 0; i < rows; i++) {
    grid[i] = [];
    for (let j = 0; j < cols; j++) {
      grid[i][j] = {
        x: i * width / rows + width / (2 * rows),
        y: j * height / cols + height / (2 * cols),
        revealed: false,
        mine: false,
        number: 0
      };
    }
  }
}

function placeMines() {
  let count = 0;
  while (count < totalMines) {
    let i = floor(random(rows));
    let j = floor(random(cols));
    if (!grid[i][j].mine) {
      grid[i][j].mine = true;
      count++;
    }
  }
}

function calculateNumbers() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (!grid[i][j].mine) {
        let count = 0;
        for (let x = -1; x <= 1; x++) {
          for (let y = -1; y <= 1; y++) {
            let ni = i + x;
            let nj = j + y;
            if (ni >= 0 && ni < rows && nj >= 0 && nj < cols && grid[ni][nj].mine) {
              count++;
            }
          }
        }
        grid[i][j].number = count;
      }
    }
  }
}

function revealCell(i, j) {
  if (i >= 0 && i < rows && j >= 0 && j < cols && !grid[i][j].revealed) {
    grid[i][j].revealed = true;
    if (grid[i][j].mine) {
      gameOver = true;
    } else if (grid[i][j].number === 0) {
      for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
          revealCell(i + x, j + y);
        }
      }
    }
  }
}

function restartGame() {
  grid = [];
  gameOver = false;
  bombsFound = 0;
  createGrid();
  placeMines();
  calculateNumbers();
}

function mousePressed() {
  if (!gameOver) {
    let i = floor(mouseX / (width / rows));
    let j = floor(mouseY / (height / cols));
    revealCell(i, j);
  }
}

function draw() {
  background(220);
  let cellsRevealed = 0;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let cell = grid[i][j];
      if (cell.revealed) {
        cellsRevealed++;
        if (cell.mine) {
          fill(255, 0, 0);
          ellipse(cell.x, cell.y, 0.8 * width / rows);
        } else {
          fill(200);
          rect(cell.x - width / (2 * rows), cell.y - height / (2 * cols), width / rows, height / cols);
          if (cell.number > 0) {
            textAlign(CENTER, CENTER);
            fill(0);
            text(cell.number, cell.x, cell.y);
          }
        }
      } else {
        fill(150);
        rect(cell.x - width / (2 * rows), cell.y - height / (2 * cols), width / rows, height / cols);
      }
    }
  }
  
  if (cellsRevealed === rows * cols - totalMines) {
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(24);
    text("All bombs found!", width / 2, height / 2);
  }
}

function keyPressed() {
  if (key === 'r' || key === 'R') {
    restartGame();
  }
}

function createGrid(height, width) {
  const grid = document.createElement("div");
  grid.className = "grid";

  for (let i = 0; i < height; i++) {
    const row = document.createElement("div");
    row.className = "row";

    for (let j = 0; j < width; j++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.onclick = () => cell.classList.toggle("living");
      row.appendChild(cell);
    }

    grid.appendChild(row);
  }

  return grid;
}

function createStartButton() {
  const button = document.createElement("button");
  button.onclick = function() {
    this.style.display = "none";
    startGame();
  };
  button.className = "start-button";
  button.innerHTML = "Start evolving";

  return button;
}

function mapGridToMatrix(grid) {
  let matrix = [];
  let rows = grid.children;

  for (let i = 0; i < rows.length; i++) {
    matrix.push([]);
    let cells = rows[i].children;

    for (let j = 0; j < cells.length; j++) {
      let cell = cells[j];
      if (cell.className === "cell") {
        matrix[i].push(0);
      } else if (cell.className === "cell living") {
        matrix[i].push(1);
      }
    }
  }

  return matrix;
}

function evolveGame(gameMatrix) {
  let evolvedGame = [];

  for (let i = 0; i < gameMatrix.length; i++) {
    evolvedGame.push([]);

    for (let j = 0; j < gameMatrix[i].length; j++) {
      let neighbors = 0;
      if (gameMatrix[i - 1] !== undefined && gameMatrix[i - 1][j - 1] === 1)
        ++neighbors;
      if (gameMatrix[i - 1] !== undefined && gameMatrix[i - 1][j] === 1)
        ++neighbors;
      if (gameMatrix[i - 1] !== undefined && gameMatrix[i - 1][j + 1] === 1)
        ++neighbors;
      if (gameMatrix[i] !== undefined && gameMatrix[i][j + 1] === 1)
        ++neighbors;
      if (gameMatrix[i + 1] !== undefined && gameMatrix[i + 1][j + 1] === 1)
        ++neighbors;
      if (gameMatrix[i + 1] !== undefined && gameMatrix[i + 1][j] === 1)
        ++neighbors;
      if (gameMatrix[i + 1] !== undefined && gameMatrix[i + 1][j - 1] === 1)
        ++neighbors;
      if (gameMatrix[i][j - 1] !== undefined && gameMatrix[i][j - 1] === 1)
        ++neighbors;

      if (gameMatrix[i][j] === 1 && (neighbors < 2 || neighbors > 3)) {
        evolvedGame[i].push(0);
      } else if (gameMatrix[i][j] === 1) {
        evolvedGame[i].push(1);
      } else if (gameMatrix[i][j] === 0 && neighbors === 3) {
        evolvedGame[i].push(1);
      } else {
        evolvedGame[i].push(0);
      }
    }
  }

  return evolvedGame;
}

function updateGrid(matrix) {
  const grid = document.querySelector(".grid");

  for (let i = 0; i < matrix.length; i++) {
    let matrixRow = matrix[i];
    let gridRow = grid.children[i];
    for (let j = 0; j < matrixRow.length; j++) {
      let matrixElement = matrixRow[j];
      let cell = gridRow.children[j];

      if (matrixElement === 1 && cell.className === "cell") {
        cell.className = "cell living";
      } else if (matrixElement === 0 && cell.className === "cell living") {
        cell.className = "cell";
      }
    }
  }
}

function startGame() {
  setInterval(updateGame, 1000);
}

function updateGame() {
  const grid = document.querySelector(".grid");
  const matrix = mapGridToMatrix(grid);
  const evolvedGame = evolveGame(matrix);
  updateGrid(evolvedGame);
}

function main() {
  const root = document.querySelector("#root");
  const grid = createGrid(25, 25);
  const button = createStartButton();
  root.appendChild(grid);
  root.appendChild(button);
}

main();

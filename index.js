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

function main() {
  const root = document.querySelector("#root");
  const grid = createGrid(20, 15);
  root.appendChild(grid);
}

main();

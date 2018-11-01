function createGrid(height, width) {
  const grid = document.createElement("div");
  grid.className = "grid";

  for (let i = 0; i < height; i++) {
    const row = document.createElement("div");
    row.className = "row";

    for (let j = 0; j < width; j++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      row.appendChild(cell);
    }

    grid.appendChild(row);
  }

  return grid;
}

function main() {
  const root = document.querySelector("#root");
  const grid = createGrid(20, 15);
  root.appendChild(grid);
}

main();

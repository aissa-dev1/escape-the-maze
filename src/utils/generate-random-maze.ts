import { MapLayout } from "../game/map";

export function generateMaze(rows: number, cols: number): MapLayout {
  const maze: MapLayout = Array.from({ length: rows }, () =>
    Array(cols).fill(0)
  );

  // Directions to move in the maze: [down, right, up, left]
  const directions = [
    [1, 0], // down
    [0, 1], // right
    [-1, 0], // up
    [0, -1], // left
  ];

  // Randomly shuffle the directions array to ensure randomness in path generation
  function shuffleDirections() {
    for (let i = directions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [directions[i], directions[j]] = [directions[j], directions[i]];
    }
  }

  function carvePath(x: number, y: number) {
    maze[x][y] = 1; // Mark the current cell as a path

    shuffleDirections(); // Shuffle directions for randomness

    for (let [dx, dy] of directions) {
      const nx = x + dx * 2,
        ny = y + dy * 2; // Move 2 cells away to create a wall between paths

      if (
        nx >= 1 &&
        ny >= 1 &&
        nx < rows - 1 &&
        ny < cols - 1 &&
        maze[nx][ny] === 0
      ) {
        maze[x + dx][y + dy] = 1; // Carve a path to the neighbor
        carvePath(nx, ny); // Recursively carve paths
      }
    }
  }

  // Start carving from a random point
  carvePath(1, 1);

  // Randomly set the win point
  let win: [number, number] = [rows - 2, cols - 2];
  while (win[0] === 1 && win[1] === 1) {
    win = [
      Math.floor(Math.random() * (rows - 2)) + 1,
      Math.floor(Math.random() * (cols - 2)) + 1,
    ];
  }
  maze[win[0]][win[1]] = 2; // Set win point

  // Return the generated maze
  return maze;
}

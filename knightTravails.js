function knightMoves(start, target) {
  const dx = [1, 2, 2, 1, -1, -2, -2, -1]; // Possible moves in x direction
  const dy = [2, 1, -1, -2, -2, -1, 1, 2]; // Possible moves in y direction

  // Function to check if a position is valid (within the board boundaries)
  function isValid(x, y) {
    return x >= 0 && x < 8 && y >= 0 && y < 8;
  }

  // Initialize a queue for BFS
  const queue = [];
  queue.push(start);

  // Initialize a visited array to keep track of visited positions
  const visited = Array.from({ length: 8 }, () => Array(8).fill(false));
  visited[start[0]][start[1]] = true;

  // Initialize a parent object to reconstruct the shortest path
  const parent = {};

  // Perform BFS
  while (queue.length > 0) {
    const [x, y] = queue.shift();

    // If the target position is reached, break the loop
    if (x === target[0] && y === target[1]) {
      break;
    }

    // Explore all possible moves from the current position
    for (let i = 0; i < 8; i++) {
      const newX = x + dx[i];
      const newY = y + dy[i];

      // Check if the new position is valid and not visited yet
      if (isValid(newX, newY) && !visited[newX][newY]) {
        queue.push([newX, newY]);
        visited[newX][newY] = true;
        parent[`${newX},${newY}`] = [x, y]; // Store parent for path reconstruction
      }
    }
  }

  // Reconstruct the shortest path
  const shortestPath = [];
  let current = target.join(',');
  while (current !== start.join(',')) {
    shortestPath.unshift(current.split(',').map(Number));
    current = parent[current].join(',');
  }
  shortestPath.unshift(start);

  // Output the shortest path
  console.log(
    `You made it in ${shortestPath.length - 1} moves! Here's your path:`
  );
  shortestPath.forEach((position) => console.log(position));

  // Return the shortest path
  return shortestPath;
}

// Test the function
knightMoves([0, 0], [1, 2]);

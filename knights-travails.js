const node = (x, y) => {
  function potentialMoves(x, y) {
    const arr = [];

    arr.push([x + 2, y + 1]);
    arr.push([x + 2, y - 1]);
    arr.push([x - 2, y - 1]);
    arr.push([x - 2, y + 1]);

    arr.push([x + 1, y + 2]);
    arr.push([x - 1, y + 2]);
    arr.push([x - 1, y - 2]);
    arr.push([x + 1, y - 2]);
    const legalMoves = arr.filter((move) => move[0] > 0 && move[1] > 0);

    return legalMoves;
  }

  return {
    data: [x, y],
    knight: false,
    potentialMoves: potentialMoves(x, y),
  };
};

function buildTree(arr, root) {
  let l = 0;
  let h = arr.length - 1;
  let mid = Math.floor((l + h) / 2);

  console.log(arr[mid], root);
}

function knightMoves(start, destination) {
  // knight can move 2 steps forward and one to the side
  // as long as x && y > 0
  const startX = start[0];
  const startY = start[1];
  const goalX = destination[0];
  const goalY = destination[1];

  // order potential moves
  // mid = destination
  // potentialMoveX < destinationX go to left
  // potentialMoveX > destinationX go to right
  // if potentialMoveX === destinationX,
  // check if <(left) or >(right) destinationY
  //
  const startNode = node(startX, startY);
  const destinationNode = node(goalX, goalY);

  console.log(buildTree(startNode.potentialMoves, destinationNode.data));
}

console.log(knightMoves([3, 3], [4, 5]));

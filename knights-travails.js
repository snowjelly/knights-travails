const node = (x, y) => {
  return {
    data: [x, y],
    knight: false,
  };
};

const createNodes = () => {
  const arr = [];
  for (let i = 0; i <= 7; i++) {
    for (let y = 0; y <= 7; y++) {
      const nodeOb = node(i, y);
      if (i !== 0) {
        nodeOb.left = node(i - 1, y);
      }
      if (i !== 7) {
        nodeOb.right = node(i + 1, y);
      }
      if (y !== 0) {
        nodeOb.bottom = node(i, y - 1);
      }
      if (y !== 7) {
        nodeOb.top = node(i, y + 1);
      }
      arr.push(nodeOb);
    }
  }
  return arr;
};

function knightMoves(start, destination) {
  // knight can move 2 steps forward and one to the side
  // as long as x && y > 0
  const potentialMoves = [];
  const x = start[0];
  const y = start[1];

  potentialMoves.push([x + 2, y + 1]);
  potentialMoves.push([x + 2, y - 1]);
  potentialMoves.push([x - 2, y - 1]);
  potentialMoves.push([x - 2, y + 1]);

  potentialMoves.push([x + 1, y + 2]);
  potentialMoves.push([x - 1, y + 2]);
  potentialMoves.push([x - 1, y - 2]);
  potentialMoves.push([x + 1, y - 2]);

  const legalMoves = potentialMoves.filter(
    (move) => move[0] > 0 && move[1] > 0
  );
  console.log(legalMoves);
}

console.log(knightMoves([3, 3], [3, 3]));

const node = (x, y) => {
  function getPotentialMoves(x, y) {
    const arr = [];

    arr.push([x + 2, y + 1]);
    arr.push([x + 2, y - 1]);
    arr.push([x - 2, y - 1]);
    arr.push([x - 2, y + 1]);

    arr.push([x + 1, y + 2]);
    arr.push([x - 1, y + 2]);
    arr.push([x - 1, y - 2]);
    arr.push([x + 1, y - 2]);
    const legalMoves = arr.filter(
      (move) => move[0] > 0 && move[0] <= 7 && move[1] > 0 && move[1] <= 7
    );
    legalMoves.sort((a, b) => {
      if (a[0] - b[0] === 0) {
        return a[1] - b[1];
      }
      return a[0] - b[0];
    });
    return legalMoves;
  }

  return {
    data: [x, y],
    potentialMoves: getPotentialMoves(x, y),
  };
};

function gameBoard() {
  function create(n = 7) {
    const arr = [];
    for (let i = 0; i <= n; i++) {
      for (let z = 0; z <= n; z++) {
        arr.push([i, z]);
      }
    }
    return arr;
  }
  return create();
}

function buildTree(l, h, sortedArr) {
  if (l > h) return null;

  const mid = Math.floor((l + h) / 2);
  const nodeOb = node(sortedArr[mid]);

  nodeOb.left = buildTree(l, mid - 1, sortedArr);
  nodeOb.right = buildTree(mid + 1, h, sortedArr);
  return nodeOb;
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(
    `${prefix}${isLeft ? "└── " : "┌── "}node: [${
      node.data[0].data
    }] pMoves: [${node.data[0].potentialMoves}]`
  );
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const board = gameBoard();
const boardsPotentialMoves = [];

board.forEach((space) => {
  boardsPotentialMoves.push(node(space[0], space[1]));
});

const tree = buildTree(
  0,
  boardsPotentialMoves.length - 1,
  boardsPotentialMoves
);

prettyPrint(tree);

// console.log(tree.data[0].potentialMoves);

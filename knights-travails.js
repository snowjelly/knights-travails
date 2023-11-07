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

  function buildTree(l, h, sortedArr) {
    if (l > h) return null;

    const mid = Math.floor((l + h) / 2);
    const nodeOb = node(sortedArr[mid]);

    nodeOb.left = buildTree(l, mid - 1, sortedArr);
    nodeOb.right = buildTree(mid + 1, h, sortedArr);
    return nodeOb;
  }

  const potentialMoves = getPotentialMoves(x, y);

  return {
    data: [x, y],
    potentialMoves: buildTree(0, potentialMoves.length - 1, potentialMoves),
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

  const board = create();

  function createPotentialMoves() {
    const boardsPotentialMoves = [];
    board.forEach((space) => {
      boardsPotentialMoves.push(node(space[0], space[1]));
    });
    return boardsPotentialMoves;
  }

  return { board, potentialMoves: createPotentialMoves() };
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

const prettyPrintAlt = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrintAlt(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}[${node.data[0]}]`);
  if (node.left !== null) {
    prettyPrintAlt(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

function levelOrderRecursive(cb = null, queue = [root], orderedArray = []) {
  if (queue.length === 0 && cb === null) {
    return orderedArray;
  }
  if (queue.length === 0) {
    return;
  }

  const deQueue = queue.shift();
  if (cb !== null) {
    cb(deQueue);
  }

  if (deQueue.left !== null) {
    queue = [...queue, deQueue.left];
  }
  if (deQueue.right !== null) {
    queue = [...queue, deQueue.right];
  }

  if (cb !== null) {
    levelOrderRecursive(cb, queue);
  } else {
    orderedArray = levelOrderRecursive(cb, queue, [...orderedArray, deQueue]);
    return orderedArray;
  }
}

function knightMoves(startArr, endArr = []) {
  const startX = startArr[0];
  const startY = startArr[1];
  const endX = endArr[0];
  const endY = endArr[1];

  return { start: [startX, startY], end: [endX, endY] };
}

const board = gameBoard().board;
const boardsPotentialMoves = gameBoard().potentialMoves;

const treeList = [];

const knight = knightMoves([3, 3], [0, 0]);

const knightTree = boardsPotentialMoves.find(
  (space) =>
    space.data[0] === knight.start[0] && space.data[1] === knight.start[1]
);

console.log(knightTree);

prettyPrintAlt(knightTree.potentialMoves);

// const spaceX = space.data[0];
// const spaceY = space.data[1];

// if (spaceX === knight[0] && spaceY === knight[1]) {
//   console.log(space);
//   prettyPrintAlt(space.potentialMoves);
//   levelOrderRecursive(
//     (result) => {
//       result.potentialMoves = node(result.data[0][0], result.data[0][1]);
//       console.log(result.data[0]);
//       prettyPrintAlt(result.potentialMoves.potentialMoves);
//     },
//     [space.potentialMoves]
//   );
// }

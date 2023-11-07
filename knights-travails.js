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

const prettyPrintAlt = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrintAlt(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(
    `${prefix}${isLeft ? "└── " : "┌── "}space: [${node.space}] [${
      node.data[0]
    }]`
  );
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

  return [startX, startY];
}

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

const treeList = [];

levelOrderRecursive(
  (result) => {
    const resultArr = result.data[0].potentialMoves;
    const newTree = buildTree(0, resultArr.length - 1, resultArr);
    newTree.space = result.data[0].data;
    treeList.push(newTree);
  },
  [tree]
);

const dataArr = [];

const knightLocation = knightMoves([3, 3]);

function buildDataArr(arr, dataArr) {
  dataArr.push(arr);
}

function findKnightInTree(cb = null, knightLoc = knightLocation) {
  treeList.forEach((tre) => {
    if (tre.space[0] === knightLoc[0] && tre.space[1] === knightLoc[1]) {
      prettyPrintAlt(tre);
      return cb(tre);
    }
    //console.log(tre);
    //buildDataArr(tre.data[0], dataArr);
  });
}

const treeStart = findKnightInTree((tre) => {
  levelOrderRecursive(
    (result) => {
      result.potentialMoves = node(
        result.data[0][0],
        result.data[0][1]
      ).potentialMoves;
      console.log(result);
    },
    [tre]
  );
});

// console.log(tree.data[0].potentialMoves);

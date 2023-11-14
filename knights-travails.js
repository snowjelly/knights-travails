function levelOrderRecursive(cb = null, queue = [root], orderedArray = []) {
  if (queue.length === 0 && cb === null) {
    return orderedArray;
  }
  if (queue.length === 0) {
    return;
  }

  const deQueue = queue.shift();
  if (cb !== null) {
    if (cb(deQueue)) return true;
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

function buildTree(l, h, sortedArr, rootSpace) {
  if (l > h) return null;

  const mid = Math.floor((l + h) / 2);
  const nodeOb = node(sortedArr[mid], rootSpace);

  nodeOb.left = buildTree(l, mid - 1, sortedArr, rootSpace);
  nodeOb.right = buildTree(mid + 1, h, sortedArr, rootSpace);
  return nodeOb;
}

const node = (arr, rootSpace = null) => {
  function getPotentialMoves(x = arr[0], y = arr[1]) {
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

  const potentialMoves = getPotentialMoves();

  return {
    currentSpace: [arr[0], arr[1]],
    potentialMoves,
    rootSpace,
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
      boardsPotentialMoves.push(node(space));
    });

    return boardsPotentialMoves;
  }

  function find(node) {
    const boardsPotentialMoves = createPotentialMoves();
    return boardsPotentialMoves.find(
      (value) =>
        value.currentSpace[0] === node[0] && value.currentSpace[1] === node[1]
    );
  }

  return {
    board,
    potentialMoves: createPotentialMoves(),
    find,
  };
}

function find(node, searchArr) {
  return searchArr.find(
    (value) => value[0] === node[0] && value[1] === node[1]
  );
}

function knightMoves(currentSpace, destination) {
  const startNode = node(currentSpace);

  function buildingTrees(node) {
    const tree = buildTree(
      0,
      node.potentialMoves.length - 1,
      node.potentialMoves,
      node
    );
    return tree;
  }

  function checkWinCondition(node) {
    if (
      node.currentSpace[0] === endArr[0] &&
      node.currentSpace[1] === endArr[1]
    ) {
      return true;
    } else {
      return false;
    }
  }

  // 0,0 2,1 4,2, 3,4

  function generate(arr = startNode.potentialMoves) {
    for (let i = 0; i < arr.length; i++) {
      const nodeN = node(arr[i], arr[i]);
      const treeN = buildingTrees(nodeN);
      (() => {
        console.log(treeN);
      })();
    }
  }

  // console.log(gameBoard().find([7, 4]));
  generate();

  function printResults(moveList) {
    let str = `You made it in ${moveList.length - 1} moves! Here's your path:`;
    moveList.forEach((value) => {
      str = str.concat(`\n    [${value}]`);
    });
    console.log(str);
    return str;
  }

  return;
}

console.log(knightMoves([0, 0], [3, 7]));

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

const node = (arr) => {
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

  return {
    board,
    potentialMoves: createPotentialMoves(),
  };
}

const board = gameBoard().potentialMoves;

function find(node, arrToSearch) {
  if (!arrToSearch[0].currentSpace)
    return arrToSearch.find(
      (space) => space[0] === node[0] && space[1] === node[1]
    );

  return arrToSearch.find(
    (space) =>
      space.currentSpace[0] === node[0] && space.currentSpace[1] === node[1]
  );
}

function findAnswer(node, answerToFind) {
  const a = find([node[0], node[1]], board);

  const result = find([answerToFind[0], answerToFind[1]], a.potentialMoves);

  if (result !== undefined) return { found: true, result, answerToFind, node };
  return { found: false, nextNodeArr: a.potentialMoves, answerToFind, node };
}

function driver() {
  let found = findAnswer([0, 3], [2, 5]);
  let totalLength = found.nextNodeArr.length;

  if (!found.found) {
    for (let i = 0; i < totalLength; i++) {
      totalLength += found.nextNodeArr.length;
      found = findAnswer(found.nextNodeArr[i], found.answerToFind);
      i = 0;
      console.log(found);
      if (found.found) return found;
    }
  }
}

driver();

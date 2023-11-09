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

function buildTree(l, h, sortedArr) {
  if (l > h) return null;

  const mid = Math.floor((l + h) / 2);
  const nodeOb = node(sortedArr[mid]);

  nodeOb.left = buildTree(l, mid - 1, sortedArr);
  nodeOb.right = buildTree(mid + 1, h, sortedArr);
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

  return { board, potentialMoves: createPotentialMoves() };
}

function knightMoves(startArr, endArr) {
  const startNode = node(startArr);

  function buildingTrees(node) {
    const tree = buildTree(
      0,
      node.potentialMoves.length - 1,
      node.potentialMoves
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

  function generate(arr = startNode.potentialMoves) {
    let moveList = [];
    const moveSequences = [];
    let found;
    for (let i = 0; i < arr.length; i++) {
      const nodeN = node(arr[i]);
      const nodeNTree = buildingTrees(nodeN);
      moveList.push(nodeN);
      found = levelOrderRecursive(
        (nodeA) => {
          moveList.push(nodeA);
          if (checkWinCondition(nodeA)) {
            moveSequences.push(moveList);
            moveList = [];
            return true;
          }
        },
        [nodeNTree]
      );
    }

    if (found !== true) {
      return { moveList, moveSequences: null, found: false };
    } else {
      return { moveList, moveSequences, found };
    }
  }

  let results = generate();
  // console.log(results);

  function loopaLikeKingKoopa(res = results) {
    if (res.found !== false) return;
    for (let i = 0; i < res.moveList.length; i++) {
      let tmp = res;
      res = generate(res.moveList[i].potentialMoves);
      if (res.moveList.length === 0) {
        res = tmp;
      }
      if (res.found) return res;
    }
    console.log(res.moveList);
    loopaLikeKingKoopa(res);
  }

  if (results.found === false) {
    loopaLikeKingKoopa();
  }

  function tempSort(moveSequences = results.moveSequences) {
    const sortedSeq = moveSequences.sort((a, b) => {
      return a.length - b.length;
    });
    return sortedSeq;
  }

  function buildMoveList(moveList = results.moveList, sortedSeq = tempSort()) {
    moveList.push(startArr);
    sortedSeq[0].forEach((value) => {
      moveList.push(value.currentSpace);
    });
    return moveList;
  }

  function printResults(moveList = buildMoveList()) {
    let str = `You made it in ${moveList.length - 1} moves! Here's your path:`;
    moveList.forEach((value) => {
      str = str.concat(`\n    [${value}]`);
    });
    return str;
  }

  // return printResults();
}

console.log(knightMoves([0, 0], [3, 4]));

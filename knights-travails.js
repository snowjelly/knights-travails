const ChessSpace = (x, y) => {
  const xPos = x;
  const yPos = y;
  let prev = null;
  let distance = 0;
  const name = `${xPos}${yPos}`;

  const moveOffsets = [
    [1, 2],
    [-1, 2],
    [1, -2],
    [-1, -2],
    [2, 1],
    [2, -1],
    [-2, 1],
    [-2, -1],
  ];

  const knightMoves = ([xOffset, yOffset]) => {
    const newX = xPos + xOffset;
    const newY = yPos + yOffset;
    if (newX >= 0 && newY >= 0 && newX <= 7 && newY <= 7) {
      return ChessSpace(newX, newY);
    }
  };
  function knightMoveList() {
    const arr = [];
    for (let i = 0; i < moveOffsets.length; i++) {
      const knightMove = knightMoves([moveOffsets[i][0], moveOffsets[i][1]]);
      arr.push(knightMove);
    }
    return arr;
  }

  return { xPos, yPos, prev, knightMoves, name, knightMoveList, distance };
};

const starting = ChessSpace(3, 3);

const queue = [starting];
const storage = new Map();
let distCounter = 0;
queue[0].distance = 0;

while (queue.length !== 0) {
  let shifted = queue.shift();
  if (storage.has(shifted.name) === true) {
    shifted = queue.shift();
  }

  const moveList = shifted.knightMoveList();
  distCounter++;

  if (queue.length === 1) {
    distCounter = 0;
  }

  for (let i = 0; i < moveList.length; i++) {
    if (moveList[i] === undefined) continue;
    moveList[i].distance = distCounter;
    moveList[i].prev = shifted;
    moveList[i].traveled = true;
    storage.set(moveList[i].name, [moveList[i].xPos, moveList[i].yPos]);
    queue.push(moveList[i]);
  }
  if (storage.size === 64) break;
}

console.log(storage.values());

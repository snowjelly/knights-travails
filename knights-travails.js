const xZeroYZero = {
  data: [0, 0],
  left: null,
  right: { data: [1, 0] },
  top: { data: [0, 1] },
  bottom: null,
};

const xOneYZero = {
  data: [0, 0],
  left: xZeroYZero,
  right: { data: [2, 0] },
  top: { data: [0, 1] },
  bottom: null,
};

const xNode = (xPos = 0, yPos = 0) => {
  const maxLength = 7;
  if (xPos > maxLength) return;
  let left;
  let right = xNode(xPos + 1, yPos);

  if (xPos === 0) {
    left = null;
  }
  if (xPos === 7) {
    right = null;
  }

  return {
    data: [xPos, yPos],
    left,
    right,
    top: 0,
    bottom: 0,
  };
};

const node = (data) => {
  return {
    data,
    left: null,
    right: null,
    top: null,
    bottom: null,
  };
};

const testArr = [];

for (let i = 0; i <= 7; i++) {
  testArr.push(xNode(0, i));
}

const rowNum = 6;

let test = testArr[rowNum];

// setLeft
for (let i = 0; i < testArr.length; i++) {
  const tmp = test;
  //console.log(test);
  test = test.right;
  if (test !== null) {
    test.left = tmp;
  }
}

// setTop
for (let i = 0; i < testArr.length; i++) {
  if (test === null) return;
  const tmp = test;

  console.log(test);
  test = test.right;
  if (test.data[1] === 7) {
    test.top = null;
  } else {
    test.top = testArr[rowNum + 1];
  }
}

// bottom null
//let root = xNode();

function createBoard() {
  function createXAxis(xPos, yPos = 0) {
    const length = 7;
    if (xPos > length) return;
    createXAxis(xPos + 1);

    if (y === 0) {
      bottom: null;
    }

    if (y === 7) {
      top: null;
    }

    if (x === 0) {
      left: null;
    }

    if (x === 7) {
      right: null;
    }

    return {
      data: [xPos, yPos],
      right: { data: [1, 0] },
      top: { data: [0, 1] },
      bottom: null,
    };
  }
}

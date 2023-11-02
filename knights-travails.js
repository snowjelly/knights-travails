const node = (x, y) => {
  return {
    data: [x, y],
    left: null,
    right: null,
    bottom: null,
    top: null,
    knight: false,
  };
};

const createNodes = () => {
  const arr = [];
  let tmp;
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
  console.log(arr);
};

console.log(createNodes());

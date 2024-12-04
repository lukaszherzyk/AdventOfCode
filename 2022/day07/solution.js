let input = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`;

input = require('fs')
  .readFileSync(__dirname + '/input.txt')
  .toString();

class Node {
  constructor(parent, value, children, size) {
    this.parent = parent;
    this.value = value;
    this.children = children || null;
    this.size = size || 0;
  }
  addChild(node) {
    if (this.children?.find((child) => child.value === node.value)) {
      return;
    }

    this.children.push(node);
    this.totalSize = this.calculateTotalSize();
  }
  calculateTotalSize() {
    if (!this.children) {
      return;
    }
    this.size = this.children.reduce((acc, child) => acc + child.size, 0);
    if (this.parent) {
      this.parent.calculateTotalSize();
    }
  }
}
const part1 = (input, isPart1) => {
  const root = new Node(null, '/', []);
  let currentNode = root;
  input.split('\n').forEach((line) => {
    const isCommand = line.startsWith('$');

    if (isCommand) {
      if (line === '$ ls') {
        return;
      }
      if (line === '$ cd /') {
        currentNode = root;
        return;
      }
      if (line === '$ cd ..') {
        currentNode = currentNode.parent;
        return;
      }
      const dirName = line.split(' ')[2];

      currentNode = currentNode.children?.find((child) => child.value === dirName);

      return;
    }

    const isDirectory = line.startsWith('dir');
    if (isDirectory) {
      currentNode.addChild(new Node(currentNode, line.split(' ')[1], [], null));
    }
    const isFile = !isCommand && !isDirectory;
    if (isFile) {
      const [size, name] = line.split(' ');
      currentNode.addChild(new Node(currentNode, name, null, Number(size)));
    }
  });

  const spaceNeeded = Math.abs(70000000 - root.size - 30000000);

  const dirs = [];
  const findDirs = (node) => {
    if (isPart1) {
      if (node.size <= 100000 && node.children) {
        dirs.push(node);
      }
    } else {
      if (node.size >= spaceNeeded && node.children) {
        dirs.push(node);
      }
    }
    if (node.children) {
      node.children.forEach((child) => findDirs(child));
    }
  };

  root.children.forEach(findDirs);
  return isPart1
    ? dirs.reduce((acc, dir) => acc + dir.size, 0)
    : dirs.sort((a, b) => a.size - b.size)[0].size;
};
console.log('part1: ', part1(input, true));

console.log('part2: ', part1(input, false));

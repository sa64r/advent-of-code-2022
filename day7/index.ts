import { parseLines } from '../utils/parse';
import { solve } from '../utils/solve';

function part1(_input: string[]) {

  const dirs = {};
  const parserPath = [];

  for (const line of _input) {
    if (/\d+\s\w+/.test(line)) {
      // @ts-ignore
      const fileSize = Number(line.match(/\d+/)[0]);

      const path: (string | undefined)[] = [];

      parserPath.forEach((dir) => {
        path.push(dir);

        //@ts-ignore
        const dirTotal = dirs[path.join('/')] ?? 0;
        //@ts-ignore
        dirs[path.join('/')] = dirTotal + fileSize;
      });
    } else if (/\$ cd/.test(line)) {
      const [_, _command, param] = line.split(' ');

      param === '..' ? parserPath.pop() : parserPath.push(param);
    }
  }

  const part1 = Object.values(dirs).reduce(
    //@ts-ignore
    (total, dirSize) => (dirSize <= 100000 ? total + dirSize : total),
    0
  );

// @ts-ignore
  return part1.toString();
}

function part2(_input: string[]) {

  const dirs = {};
  const parserPath = [];

  for (const line of _input) {
    if (/\d+\s\w+/.test(line)) {
      // @ts-ignore
      const fileSize = Number(line.match(/\d+/)[0]);

      const path: (string | undefined)[] = [];

      parserPath.forEach((dir) => {
        path.push(dir);

        //@ts-ignore
        const dirTotal = dirs[path.join('/')] ?? 0;
        //@ts-ignore
        dirs[path.join('/')] = dirTotal + fileSize;
      });
    } else if (/\$ cd/.test(line)) {
      const [_, _command, param] = line.split(' ');

      param === '..' ? parserPath.pop() : parserPath.push(param);
    }
  }

  console.log(dirs);

  const part2 = Object.values(dirs)
  //@ts-ignore
    .sort((a, b) => a - b)
    //@ts-ignore
    .find((dirSize) => 70000000 - dirs['/'] + dirSize >= 30000000);
//@ts-ignore
  return part2.toString();
}

solve({ part1, part2, parser: parseLines });

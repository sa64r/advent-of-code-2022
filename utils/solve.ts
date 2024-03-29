import { readFileSync, appendFile, writeFileSync, existsSync } from 'fs';
import { config } from 'dotenv';
import { dirname } from 'path';
import caller from 'caller';
config();

type SolveArgs<T> = {
  part1: (input: T) => string;
  part2: (input: T) => string;
  parser: (input: string) => T;
};

export async function solve<T = string[]>({
  part1,
  part2,
  parser,
}: SolveArgs<T>) {
  const year = new Date().getFullYear();
  const dir = dirname(caller());
  const part1Solved = existsSync(`${dir}/input2.txt`);
  const [solver, file, solutionsFile, partBeingSolved] = part1Solved
    ? [part2, './input2.txt', './solutions2.txt', '2']
    : [part1, './input.txt', './solutions.txt', '1'];

  const day = dir.replace(/.*day/, '');
  const fileName = `${dir}/${file}`;
  const input = parser(readFileSync(fileName, 'utf8'));
  const answer = solver(input);
  const solutions = readFileSync(`${dir}/${solutionsFile}`, 'utf8').split('\n');
  if (solutions.includes(answer)) {
    console.log('Solution already attempted!');
    return;
  }
  appendFile(`${dir}/${solutionsFile}`, `${answer}\n`, () => {});
  const result = await fetch(
    `https://adventofcode.com/${year}/day/${day}/answer`,
    {
      method: 'POST',
      headers: {
        cookie: `session=${process.env.SESSION}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `level=${partBeingSolved}&answer=${answer}`,
    },
  );
  const body = await result.text();
  if (body.includes('not the right answer')) {
    console.log('Wrong answer for part: ', partBeingSolved);
  } else {
    console.log('Correct answer for part: ', partBeingSolved);
    if(!part1Solved){
      writeFileSync(`${dir}/solutions2.txt`, '');
      fetch(`https://adventofcode.com/${year}/day/${day}/input`, {
        headers: {
          cookie: `session=${process.env.SESSION}`,
        },
      })
        .then((res) => res.text())
        .then((text) => writeFileSync(`${dir}/input2.txt`, text));
    }
  }
}

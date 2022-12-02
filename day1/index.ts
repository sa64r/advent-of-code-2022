import { parseLines } from '../utils/parse';
import { solve } from '../utils/solve';

function part1(_input: string[]) {

  let largestCalorieCount = 0;

  let currCount = 0;

  for(let i = 0; i < _input.length; i++) {

    if(_input[i] === '') {
      if(currCount > largestCalorieCount) {
        largestCalorieCount = currCount;
      }
      currCount = 0;
    } else{
      currCount += parseInt(_input[i] as string, 0);
    }

  }


  return largestCalorieCount.toString();
}

function part2(_input: string[]) {

  let elvesCalorieCount = [];

  let currCount = 0;

  for(let i = 0; i < _input.length; i++) {

    if(_input[i] === '') {
      elvesCalorieCount.push(currCount);
      currCount = 0;
    } else{
      currCount += parseInt(_input[i] as string, 0);
    }

  }
  elvesCalorieCount.sort((a, b) => b - a);

  const topThree = elvesCalorieCount.slice(0, 3).reduce((a, b) => a + b, 0);

  return topThree.toString();
}

solve({ part1, part2, parser: parseLines });

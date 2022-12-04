import { parseLines } from '../utils/parse';
import { solve } from '../utils/solve';

function part1(_input: string[]) {

  // let total = 0;
  let totalPriority = 0;


  let repeatedItem;
  for (let sack of _input) {
    const middleIdx = sack.length / 2;
    const firstCompartment = sack.slice(0, middleIdx).split(''), secondCompartment = sack.slice(middleIdx).split('');
    repeatedItem = secondCompartment.filter(item => firstCompartment.includes(item))[0];8

    // @ts-ignore
    const priorityVal = repeatedItem.charCodeAt(0) - (repeatedItem === repeatedItem.toUpperCase() ? 38 : 96);
    totalPriority += priorityVal;
  }

  return totalPriority.toString();
}

function part2(_input: string[]) {
  let totalPriority = 0

  // group input into 3s
  const groups = [];
  for (let i = 0; i < _input.length; i += 3) {
    groups.push(_input.slice(i, i + 3));
  }

  console.log(groups);

  for(let group of groups){
  // @ts-ignore
    const firstCompartment = group[0].split(''), secondCompartment = group[1].split(''), thirdCompartment = group[2].split('');
    const repeatedItem = thirdCompartment.filter(item => firstCompartment.includes(item) && secondCompartment.includes(item))[0];

    console.log(repeatedItem);

    // @ts-ignore
    const priorityVal = repeatedItem.charCodeAt(0) - (repeatedItem === repeatedItem.toUpperCase() ? 38 : 96);
    totalPriority += priorityVal;
  };

  console.log(totalPriority);

return 'part2';
}

solve({ part1, part2, parser: parseLines });
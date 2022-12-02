import { parseLines } from '../utils/parse';
import { solve } from '../utils/solve';

function part1(_input: string[]) {

  const shapeScores = {
    'X': 1,
    'Y': 2,
    'Z': 3, 
  }
  const outcomeScores = {
    'win': 6,
    'loss': 0,
    'draw': 3,
  }

  const possibleCombos = {
    'A X': shapeScores.X + outcomeScores.draw,
    'A Y': shapeScores.Y + outcomeScores.win,
    'A Z': shapeScores.Z + outcomeScores.loss,
    'B X': shapeScores.X + outcomeScores.loss,
    'B Y': shapeScores.Y + outcomeScores.draw,
    'B Z': shapeScores.Z + outcomeScores.win,
    'C X': shapeScores.X + outcomeScores.win,
    'C Y': shapeScores.Y + outcomeScores.loss,
    'C Z': shapeScores.Z + outcomeScores.draw,
  }

  console.log(_input)

  // @ts-ignore
  const scoresPerGame = _input.map((input) => possibleCombos[input])

  // sum the scores
  const totalScore = scoresPerGame.reduce((a, b) => a + b, 0)
  
  return totalScore;
}

function part2(_input: string[]) {

  let totalScore = 0;
  
  _input.forEach((input) => {

    const [opponentShape, desiredResult] = input.split(' ')

    switch(desiredResult){
      case 'X': // lose
        if(opponentShape === 'A'){ // rock
          totalScore += 3;
        } 
        if(opponentShape === 'B'){ // paper
          totalScore += 1;
        }
        if(opponentShape === 'C'){ // scissors
          totalScore += 2;
        }
        break;
      case 'Y': // draw
        totalScore += 3;
        if(opponentShape === 'A'){ // rock
          totalScore += 1;
        }
        if(opponentShape === 'B'){ // paper
          totalScore += 2;
        }
        if(opponentShape === 'C'){ // scissors
          totalScore += 3;
        }
        break;
      case 'Z': // win
        totalScore += 6;
        if(opponentShape === 'A'){ // rock
          totalScore += 2;
        }
        if(opponentShape === 'B'){ // paper
          totalScore += 3;
        }
        if(opponentShape === 'C'){ // scissors
          totalScore += 1;
        }
        break;
    }
  })

  return totalScore.toString();
}

solve({ part1, part2, parser: parseLines });

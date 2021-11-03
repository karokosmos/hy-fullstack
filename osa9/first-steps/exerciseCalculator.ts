interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

interface Args {
  target: number,
  hours: number[]
}

const parseArgs = (args: string[]): Args => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const argsToParse = args.slice(2)
  const numArgs = argsToParse.map(arg => Number(arg))

  if (!numArgs.includes(NaN)) {
    const [target, ...hours] = numArgs
    return { target, hours }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

const calculateExercises = (hours: Array<number>, target: number): Result => {
  const trainingDaysArr = hours.filter(h => h !== 0);
  const totalTrainingHours = trainingDaysArr.reduce((prev, current) => prev + current, 0);
  const average = totalTrainingHours / hours.length;
  const success = average > target ? true : false;

  let rating = 0;
  let ratingDescription = '';
  const successPercent = (average / target) * 100;

  if (successPercent < 50) {
    rating = 1
    ratingDescription = 'not so good, try to do better next week'
  } else if (successPercent >= 50 && successPercent <= 99) {
    rating = 2
    ratingDescription = 'not too bad but could be better'
  } else {
    rating = 3
    ratingDescription = 'great job, target reached'
  }

  const result = {
    periodLength: hours.length,
    trainingDays: trainingDaysArr.length,
    success,
    rating,
    ratingDescription,
    target,
    average
  }

  return result
}

try {
  const { target, hours } = parseArgs(process.argv);
  console.log(calculateExercises(hours, target));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
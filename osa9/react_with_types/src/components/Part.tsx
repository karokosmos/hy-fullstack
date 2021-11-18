import React from 'react';
import { CoursePart } from '../types';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.type) {
    case 'normal':
      return (
        <div>
          <p><strong>{part.name} {part.exerciseCount}</strong></p>
          <p><i>{part.description}</i></p>
        </div>
      )
    case 'groupProject':
      return (
        <div>
          <p><strong>{part.name} {part.exerciseCount}</strong></p>
          <p>project exercises {part.groupProjectCount}</p>
        </div>
      )
    case 'submission':
      return (
        <div>
          <p><strong>{part.name} {part.exerciseCount}</strong></p>
          <p><i>{part.description}</i></p>
          <p>submit to {part.exerciseSubmissionLink}</p>
        </div>
      )
    case 'special':
      return (
        <div>
          <p><strong>{part.name} {part.exerciseCount}</strong></p>
          <p><i>{part.description}</i></p>
          <p>required skills: {part.requirements.join(', ')}</p>
        </div>
      )
    default:
      return assertNever(part);
  }
};

export default Part;
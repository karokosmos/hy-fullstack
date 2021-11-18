import React from 'react';
import Part from './Part';
import { CourseParts } from '../types';

const Content = ({ courseParts }: CourseParts) => (
  <div>
    {courseParts.map(part => (
      <Part part={part} key={part.name} />
    ))}
  </div>
);

export default Content;
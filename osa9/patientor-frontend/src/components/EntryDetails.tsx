import React from 'react';
import { Entry } from '../types';
import { Card, Icon } from 'semantic-ui-react';
import { useStateValue } from '../state';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue();

  const getDiagnosisDescription = (code: string): string => {
    const diagnosisData = diagnoses.find(d => d.code === code);
    const diagnosis = diagnosisData ? diagnosisData.name : 'No description found for this diagnosis';
    return diagnosis;
  };

  switch (entry.type) {
    case 'Hospital':
      return (
        <Card>
          <Card.Content>
            <Card.Description>{entry.date} <Icon name="hospital outline"></Icon></Card.Description>
            <p>{entry.description}</p>
            <ul>
              {entry.diagnosisCodes?.map(code =>
                <li key={code}>{code} {getDiagnosisDescription(code)}</li>
              )}
            </ul>
          </Card.Content>
        </Card>
      );
    case 'OccupationalHealthcare':
      return (
        <Card>
          <Card.Content>
            <Card.Description>{entry.date} <Icon name="doctor"></Icon></Card.Description>
            <p>{entry.description}</p>
            <ul>
              {entry.diagnosisCodes?.map(code =>
                <li key={code}>{code} {getDiagnosisDescription(code)}</li>
              )}
            </ul>
          </Card.Content>
        </Card>
      );
    case 'HealthCheck':
      return (
        <Card>
          <Card.Content>
            <Card.Description>{entry.date} <Icon name="heart"></Icon></Card.Description>
            <p>{entry.description}</p>
            <ul>
              {entry.diagnosisCodes?.map(code =>
                <li key={code}>{code} {getDiagnosisDescription(code)}</li>
              )}
            </ul>
          </Card.Content>
        </Card>
      );
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
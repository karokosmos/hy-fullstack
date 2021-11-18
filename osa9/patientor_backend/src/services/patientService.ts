/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import patientData from '../../data/patients';
import { EntryWithoutId, NewPatient, Patient, PublicPatient } from '../types';
import { v1 as uuid } from 'uuid';

const patients: Array<Patient> = patientData;

const getPatients = (): Array<Patient> => {
  return patients;
};

const getPatient = (id: string): Patient | undefined => {
  return patients.find(patient => patient.id === id);
};

const getPublicPatients = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = (patient: NewPatient): PublicPatient => {
  const newPatient = {
    id: uuid(),
    ...patient,
    entries: []
  };

  patients.push(newPatient);
  return newPatient;
};

const addEntry = (patientId: string, entry: EntryWithoutId): Patient | string => {
  const patient = getPatient(patientId);

  if (!patient) {
    throw new Error('Patient not found.');
  }

  /*  if (!entry.type || !entry.description || !entry.date || !entry.specialist) {
     throw new Error('Required fields not provided.');
   } else if (entry.type === 'HealthCheck' && !entry.healthCheckRating) {
     throw new Error('Type HealtCheck requires healthCheckRating.');
   } else if (entry.type === 'OccupationalHealthcare' && !entry.employerName) {
     throw new Error('Type OccupationalHealthcare requires employerName.');
   } else if (entry.type === 'Hospital' && !entry.discharge) {
     throw new Error('Type Hospital requires discharge date.');
   } */

  const newEntry = {
    id: uuid(),
    ...entry
  };

  patient.entries.push(newEntry);
  return patient;
};

export default {
  getPatients,
  getPublicPatients,
  getPatient,
  addPatient,
  addEntry
};
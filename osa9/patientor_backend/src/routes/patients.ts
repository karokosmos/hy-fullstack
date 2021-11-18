/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import patientService from '../services/patientService';
import { EntryWithoutId } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPublicPatients());
});

router.get('/:id', (req, res) => {
  const patient = patientService.getPatient(req.params.id);
  res.json(patient);
});

router.post('/', (req, res) => {
  const { name, dateOfBirth, gender, occupation, ssn } = req.body;
  const newPatient = patientService.addPatient({
    name,
    dateOfBirth,
    gender,
    occupation,
    ssn
  });
  res.json(newPatient);
});

router.post('/:id/entries', (req, res) => {
  const entryData: EntryWithoutId = req.body;
  const patientId = req.params.id;
  const updatedPatient = patientService.addEntry(patientId, entryData);
  res.json(updatedPatient);
});

export default router;
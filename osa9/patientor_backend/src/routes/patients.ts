/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatientsWithoutSsn());
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

export default router;
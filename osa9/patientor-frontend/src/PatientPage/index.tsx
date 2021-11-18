import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { apiBaseUrl } from "../constants";
import { Patient, Diagnosis } from '../types';
import { useStateValue, setPatient, setDiagnoses, addEntry } from "../state";
import { Header, Container, Icon, Button } from "semantic-ui-react";
import EntryDetails from '../components/EntryDetails';
import { EntryFormValues } from '../AddEntryModal/AddEntryForm';
import AddEntryModal from '../AddEntryModal';

const PatientPage = () => {
  const [{ patient }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
  };

  useEffect(() => {
    /* if (patient && patient.id === id) {
      console.log('already in state');
      return;
    } */

    const fetchPatient = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
        dispatch(setPatient(patientFromApi));
        console.log(patientFromApi);
      } catch (e) {
        console.error(e);
      }
    };
    void fetchPatient();
  }, [dispatch]);

  useEffect(() => {
    const fetchDiagnosis = async () => {
      try {
        const { data: diagnosesFromApi } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
        dispatch(setDiagnoses(diagnosesFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    void fetchDiagnosis();
  }, []);

  const getGenderIcon = (gender: string) => {
    if (gender === 'female') {
      return <Icon name="venus"></Icon>;
    } else if (gender === 'male') {
      return <Icon name="mars"></Icon>;
    } else {
      return <Icon name="genderless"></Icon>;
    }
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: updatedPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      if (patient) {
        dispatch(addEntry(updatedPatient));
        closeModal();
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(error.response.data);
      }
    }
  };

  if (!patient) {
    return (
      <p>Error: Patient not found</p>
    );
  }

  return (
    <Container>
      <Header>{patient.name} {getGenderIcon(patient.gender)}</Header>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <Header>entries</Header>
      {patient.entries.map(entry =>
        <EntryDetails key={entry.id} entry={entry} />
      )}
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Entry</Button>
    </Container>
  );
};

export default PatientPage;
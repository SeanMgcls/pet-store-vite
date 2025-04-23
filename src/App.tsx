import React, { useState } from 'react';
import PetList from './components/PetList';
import AddPetForm from './components/AddPetForm';
import EditPetForm from './components/EditPetform';
import { Container, Typography } from '@mui/material';

const App: React.FC = () => {
  const [editingPet, setEditingPet] = useState<Pet | null>(null);

  const handleEdit = (pet: Pet) => setEditingPet(pet);
  const handleUpdate = () => setEditingPet(null);

  return (
    <Container>
      <Typography variant="h2" gutterBottom>
        Pet Store
      </Typography>
      {editingPet ? (
        <EditPetForm pet={editingPet} onUpdate={handleUpdate} />
      ) : (
        <>
          <AddPetForm onAdd={() => {}} />
          <PetList onEdit={handleEdit} />
        </>
      )}
    </Container>
  );
};

export default App;
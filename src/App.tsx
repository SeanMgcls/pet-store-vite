import React from 'react';
import PetList from './components/PetList'
import AddPetForm from './components/AddPetForm';

const App: React.FC = () => {
  return (
    <div>
      <h1>Pet Store</h1>
      <AddPetForm />
      <PetList />
    </div>
  );
};

export default App;
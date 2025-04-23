import React, { useEffect, useState } from 'react';
import petService from '../services/petService'; // Use default import

const PetList: React.FC = () => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const fetchPets = async () => {
      const data = await petService.getAllPets();
      setPets(data);
    };

    fetchPets();
  }, []);

  return (
    <div>
      <h1>Pet List</h1>
      <ul>
        {pets.map((pet: any) => (
          <li key={pet.id}>
            {pet.name} - {pet.species}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PetList;
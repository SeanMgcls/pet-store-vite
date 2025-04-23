import React, { useState } from 'react';
import petService from '../services/petService';

const AddPetForm: React.FC = () => {
  const [name, setName] = useState('');
  const [species, setSpecies] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await petService.createPet({ name, species, price });
      setMessage('Pet added successfully.');
      setName('');
      setSpecies('');
      setPrice('');
    } catch {
      setMessage('Failed to add pet.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add a New Pet</h2>
      {message && <p>{message}</p>}
      <div>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Species:
          <input
            type="text"
            value={species}
            onChange={(e) => setSpecies(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Price:
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            required
          />
        </label>
      </div>
      <button type="submit">Add Pet</button>
    </form>
  );
};

export default AddPetForm; // Add this line to make it a default export
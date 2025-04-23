import React, { useEffect, useState } from 'react';
import petService from '../services/petService';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material';

interface Pet {
  id: number;
  name: string;
  species: string;
  breed: string;
  gender: string;
  price: number;
  description: string;
  image: string; // Ensure the image property is included
}

const PetList: React.FC<{ onEdit: (pet: Pet) => void }> = ({ onEdit }) => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const data = await petService.getAllPets();
        setPets(data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch pets.');
      }
    };

    fetchPets();
  }, []);

  const deletePet = async (id: number) => {
    try {
      await petService.deletePet(id);
      setPets(pets.filter((pet) => pet.id !== id));
    } catch (err) {
      console.error(err);
      setError('Failed to delete pet.');
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Pet List
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell> {/* New column for images */}
              <TableCell>Name</TableCell>
              <TableCell>Species</TableCell>
              <TableCell>Breed</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pets.map((pet) => (
              <TableRow key={pet.id}>
                <TableCell>
                  <img
                    src={pet.image} // Use the image property
                    alt={pet.name}
                    style={{ width: '100px', height: '100px', objectFit: 'cover' }} // Style the image
                  />
                </TableCell>
                <TableCell>{pet.name}</TableCell>
                <TableCell>{pet.species}</TableCell>
                <TableCell>{pet.breed}</TableCell>
                <TableCell>${pet.price}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => onEdit(pet)}
                  >
                    Edit
                  </Button>{' '}
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => deletePet(pet.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default PetList;
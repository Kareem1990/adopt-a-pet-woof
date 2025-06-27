import React, { useState, useEffect } from 'react';
import { Container, Card, CardColumns, Button, Form } from 'react-bootstrap';
import { useMutation, useQuery } from '@apollo/client';
import { SAVE_PET } from '../utils/mutations';
import { GET_PET } from '../utils/queries';
import Auth from '../utils/auth';
import { savePetIds, getSavedPetIds } from '../utils/localStorage';

const SearchPets = () => {
  const [searchInput, setSearchInput] = useState('');
  const [savedPetIds, setSavedPetIds] = useState(getSavedPetIds());

  const [savePet, { error }] = useMutation(SAVE_PET);
  const { loading, data } = useQuery(GET_PET);
  const petData = data?.getPet || [];

  // ✅ Filter pets by search term
  const filteredPets = petData.filter((pet) =>
    pet.title.toLowerCase().includes(searchInput.toLowerCase())
  );

  // ✅ Save localStorage on savedPetIds change
  useEffect(() => {
    savePetIds(savedPetIds);
  }, [savedPetIds]);

  const handleSavePet = async (id) => {
    const petToSave = petData.find((pet) => pet._id === id);
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token || !petToSave) return false;

    try {
      await savePet({ variables: { savedPet: id } });
      setSavedPetIds([...savedPetIds, id]);
    } catch (err) {
      console.error('Save failed:', err.message);
    }
  };

  if (loading) return <h2 className="text-center mt-4">Loading pets...</h2>;

  return (
    <Container className="mt-4">
      <h2>
        {filteredPets.length
          ? `Viewing ${filteredPets.length} result${filteredPets.length === 1 ? '' : 's'}:`
          : 'No pets found.'}
      </h2>

      <Form className="mb-4">
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Search pets by title..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </Form.Group>
      </Form>

      <CardColumns>
        {filteredPets.map((pet) => (
          <Card key={pet._id || pet.title} border="dark">
            {pet.image && (
              <Card.Img
                variant="top"
                src={pet.image}
                alt={`Pet: ${pet.title}`}
                className="card-img-top"
              />
            )}
            <Card.Body>
              <Card.Title>{pet.title}</Card.Title>
              <p className="small">Owner: {pet.owner}</p>
              <Card.Text>{pet.description}</Card.Text>
              {Auth.loggedIn() ? (
                <Button
                  disabled={savedPetIds.includes(pet._id)}
                  className="btn-block btn-info"
                  onClick={() => handleSavePet(pet._id)}
                >
                  {savedPetIds.includes(pet._id)
                    ? 'This pet is already saved!'
                    : '💾 Save this Pet'}
                </Button>
              ) : (
                <p className="text-muted">🔒 Log in to save pets</p>
              )}
              {error && <div className="text-danger mt-2">Something went wrong!</div>}
            </Card.Body>
          </Card>
        ))}
      </CardColumns>
    </Container>
  );
};

export default SearchPets;

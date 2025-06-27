import '../styles/SavedPets.css';
import React from 'react';
import { Container, CardColumns, Card, Button, Row, Col } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { REMOVE_PET } from '../utils/mutations';
import Auth from '../utils/auth';
import { removePetId } from '../utils/localStorage';
import PetForm from '../components/PetForm';


const SavedPets = () => {
  const { loading, data, refetch } = useQuery(GET_ME);
  const [removePet, { error }] = useMutation(REMOVE_PET);

  const userData = data?.me;

  const handleDeletePet = async (petId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) return false;

    try {
      await removePet({ variables: { _id: petId } });
      removePetId(petId);
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <h2 className="text-center mt-4">Loading profile...</h2>;
  if (!userData) return <h2 className="text-center mt-4">User data not found.</h2>;

  return (
    <>
      <Container className="mt-4">
        <Row className="mb-4">
          <Col md={4}>
            <div className="p-3 border rounded bg-light">
              <h3>👤 {userData.username}</h3>
              <p><strong>Email:</strong> {userData.email}</p>
              <p><strong>Saved Pets:</strong> {userData.savedPets.length}</p>
            </div>
          </Col>

          <Col md={8}>
            <h2 className="mb-3">
              {userData.savedPets.length
                ? `Saved Pet${userData.savedPets.length === 1 ? '' : 's'}`
                : 'You have no saved pets!'}
            </h2>

            <CardColumns>
              {userData.savedPets.map((pet, index) => (
                <Card key={index} border="dark">
                  {pet.image && (
                    <Card.Img src={pet.image} alt={`Cover for ${pet.title}`} variant="top" />
                  )}
                  <Card.Body>
                    <Card.Title>{pet.title}</Card.Title>
                    <p className="small">Owner: {pet.owner}</p>
                    <Card.Text>{pet.description}</Card.Text>
                    <Button
                      className="btn-block btn-danger"
                      onClick={() => handleDeletePet(pet._id)}
                    >
                      ❌ Remove this Pet
                    </Button>
                    {error && <div className="text-danger mt-2">Something went wrong!</div>}
                  </Card.Body>
                </Card>
              ))}
            </CardColumns>
          </Col>
        </Row>
        <PetForm />
      </Container>
    </>
  );
};

export default SavedPets;

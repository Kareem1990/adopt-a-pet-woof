import React from 'react'; 
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
import Auth from '../utils/auth';
import { removePetId } from '../utils/localStorage';
import { GET_ME } from '../utils/queries';
import { REMOVE_PET } from '../utils/mutations';
import { useMutation, useQuery } from '@apollo/client';
import PetForm from '../components/PetForm';

const SavedPets = () => {

  const { loading, data } = useQuery(GET_ME);
  const [removePet, { error }] = useMutation(REMOVE_PET);
  const userData = data?.me || {}
  

  // create function that accepts the 's mongo _id value as param and deletes the  from the database
  const handleDeletePet = async (pet) => {

    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }
    try {
      const { data } = await removePet({
        variables: { _id: pet },
      })
      console.log(data);
      // upon success, remove 's id from localStorage
      removePetId(pet);
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>

      <Container>
        {console.log(userData)}
        <h2>
          {userData.savedPets.length
            ? `Viewing ${userData.savedPets.length} saved ${userData.savedPets.length === 1 ? 'pet' : 'pets'}:`
            : 'You have no saved pets!'}
        </h2>
        <CardColumns>
          {userData.savedPets.map((pet, index) => {
            console.log(pet)
            return (
              <Card key={index} border='dark'>
                {pet.image ? <Card.Img src={pet.image} alt={`The cover for ${pet.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{pet.title}</Card.Title>
                  <p className='small'>Owners: {pet.owner}</p>
                  <Card.Text>{pet.description}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeletePet(pet._id)}>
                    Delete this Pet!
                  </Button>
                  {error && <div>Something went wrong!</div>}
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
      <PetForm/>
    </>

  );
};

export default SavedPets;
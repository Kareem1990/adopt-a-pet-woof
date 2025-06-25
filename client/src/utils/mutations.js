import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const SAVE_PET = gql`
mutation savePet($savedPet: ID!) {
    savePet(savedPet: $savedPet) {
      _id
      savedPets {
        _id
        owner
        description
        image
        title
      }
    }
  }
`;

export const REMOVE_PET = gql`
    mutation removePet($_id: ID!) {
        removePet(_id: $_id) {
            _id
            username
            email
            savedPets{
                _id
                owner
                description
                title
                image
            }
        }
    }
`;
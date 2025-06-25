import gql from "graphql-tag";

export const GET_ME = gql`
  {
    me {
      _id
      username
      email
      petCount
      savedPets {
        _id
        owner
        description
        title
        image
      }
    }
  }
`;

export const GET_PET = gql`
query getPet {
  getPet {
    _id
    description
    owner
    image
    title
  }
}`;
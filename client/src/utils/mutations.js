import gql from 'graphql-tag';

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
  mutation addUser($username: String!, $password: String!, $email: String!) {
    addUser(username: $username, password: $password, email: $email) {
      token
      user {
        username
        email
      }
    }
  }
`;

export const SAVE_BOOK= gql`
    mutation saveBook($bookData: BookInput!) {
        saveBook(bookData: $bookData) {
            _id
            username
            email
            bookCount
            savedBooks
        }
    }
`;

export const REMOVE_BOOK= gql`
    mutation removeBook($bookId: ID!) {
        removeBook(bookId: $bookId) {
            username
        }
    }
`;
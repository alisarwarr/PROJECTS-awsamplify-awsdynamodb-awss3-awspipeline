/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const addBookmark = /* GraphQL */ `
  mutation AddBookmark($title: String!, $url: String!, $description: String!) {
    addBookmark(title: $title, url: $url, description: $description) {
      id
      title
      url
      description
    }
  }
`;
export const delBookmark = /* GraphQL */ `
  mutation DelBookmark($thatId: ID!) {
    delBookmark(thatId: $thatId)
  }
`;

/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTodo = /* GraphQL */ `
  mutation CreateTodo($detail: String!) {
    createTodo(detail: $detail) {
      id
      detail
    }
  }
`;
export const deleteTodo = /* GraphQL */ `
  mutation DeleteTodo($thatId: ID!) {
    deleteTodo(thatId: $thatId)
  }
`;
export const updateTodo = /* GraphQL */ `
  mutation UpdateTodo($id: ID!, $detail: String!) {
    updateTodo(id: $id, detail: $detail) {
      id
      detail
    }
  }
`;

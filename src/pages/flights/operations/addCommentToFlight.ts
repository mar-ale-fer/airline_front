import { gql } from '@apollo/client';

export const ADD_COMMENT_TO_FLIGHT = gql`
mutation AddCommentToFlight($flightId: ID!, $text: String!, $tags: [String]!) {
  addCommentToFlight(flightId: $flightId, text: $text, tags: $tags) {
    success
    message
    flight {
      id
      name
    }
  }
}
`;

// vars:
// {  "flightId": 1,
//   "text": "un comentario",
//   "tags": ["aaa","bbb","ccccc"]
// }
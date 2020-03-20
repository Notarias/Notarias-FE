
import { gql }                from 'apollo-boost';

export const GLOBAL_MESSAGE = gql`
  query {
    globalMessage @client {
      message
      type
    }
  }
`;

export const REMOVE_MESSAGE_MUTATION = gql`
  mutation removeMessage($message: String, $type: String) {
    removeMessage(message: $message, type: $type) @client
  }
`

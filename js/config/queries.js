import gql from 'graphql-tag';

export const SIGNUP_USER = gql`
  mutation SignupUser($email: String!, $username: String!, $password: String!) {
    signupUser(email: $email, username: $username, password: $password) {
      id
      token
    }
  }
`;

export const AUTH_USER = gql`
  mutation AuthenticateUser($email: String!, $password: String!) {
    authenticateUser(email: $email, password: $password) {
      id
      token
    }
  }
`;

export const GET_CHAT = gql`
  query($id: ID!) {
    Chat(id: $id) {
      participants {
        id
      }
    }
  }
`;

export const USER_CHATS = gql`
  query UserChats($id: ID!) {
    allChats(filter: { participants_some: { id: $id } }) {
      id
      item {
        title
        id
        createdAt
        price
        images
        location {
          title
        }
        subCategory {
          title
        }
        user {
          id
        }
      }
      messages(last: 1) {
        content
      }
    }
  }
`;

export const CHAT_MESSAGES = gql`
  query ChatMessages($chatId: ID!) {
    allMessages(filter: { chat: { id: $chatId } }, orderBy: createdAt_ASC) {
      content
      from
      id
    }
  }
`;

export const GET_ITEMS = gql`
  query($filter: ItemFilter, $order: ItemOrderBy) {
    allItems(filter: $filter, orderBy: $order) {
      title
      id
      title
      postStatus
      description
      location {
        title
      }
      subCategory {
        title
      }
      user {
        username
      }
      price
      postStatus
      images
    }
  }
`;

export const GET_ITEM = gql`
  query GetItem($id: ID!) {
    Item(id: $id) {
      title
      id
      price
      description
      subCategory {
        title
      }
      location {
        title
      }
      user {
        username
        id
      }
      images
    }
  }
`;

export const USER_ITEMS = gql`
  query($id: ID!) {
    allItems(filter: { user: { id: $id } }) {
      title
      id
      createdAt
      price
      location {
        title
      }
      subCategory {
        title
      }
      user {
        id
        username
      }
      postStatus
      images
    }
  }
`;

export const GET_LOCATIONS = gql`
  query {
    allLocations {
      title
      id
    }
  }
`;

export const GET_USER = gql`
  query($id: ID!) {
    allUsers(filter: { id: $id }) {
      username
      profilePic
    }
  }
`;

export const UPDATE_PROFILE_PIC = gql`
  mutation($id: ID!, $pic: [String!]) {
    updateUser(id: $id, profilePic: $pic) {
      id
      profilePic
    }
  }
`;

export const CREATE_ITEM = gql`
  mutation(
    $locationId: ID
    $title: String!
    $description: String
    $images: [String!]!
    $price: Int
    $userId: ID
    $postStatus: DateTime
    $subCategoryId: ID
  ) {
    createItem(
      locationId: $locationId
      title: $title
      description: $description
      images: $images
      price: $price
      userId: $userId
      postStatus: $postStatus
      subCategoryId: $subCategoryId
    ) {
      title
      id
    }
  }
`;
export const ITEM_STATUS = gql`
  mutation($id: ID!, $date: DateTime) {
    updateItem(id: $id, postStatus: $date) {
      id
    }
  }
`;

export const GET_SUBCATEGORIES = gql`
  query($filter: SubCategoryFilter) {
    allSubCategories(filter: $filter) {
      id
      title
      items {
        title
      }
    }
  }
`;

export const MESSAGES_SUBSCRIPTION = gql`
  subscription newMessage($chatId: ID!) {
    Message(
      filter: { mutation_in: [CREATED], node: { chat: { id: $chatId } } }
    ) {
      node {
        id
        content
        from
      }
    }
  }
`;

export const CHATS_SUBSCRIPTION = gql`
  subscription newMessage($userId: ID!) {
    Message(
      filter: {
        mutation_in: [CREATED]
        node: { chat: { participants_some: { id: $userId } } }
      }
    ) {
      node {
        id
        content
      }
    }
  }
`;

export const CREATE_CHAT = gql`
  mutation CreateChat(
    $participantsIdOne: ID!
    $participantsIdTwo: ID!
    $itemId: ID!
  ) {
    createChat(
      itemId: $itemId
      messagesIds: []
      participantsIds: [$participantsIdOne, $participantsIdTwo]
    ) {
      id
    }
  }
`;

export const CREATE_MESSAGE = gql`
  mutation CreateMessage($content: String!, $chatId: ID!, $from: String!) {
    createMessage(content: $content, chatId: $chatId, from: $from) {
      id
    }
  }
`;

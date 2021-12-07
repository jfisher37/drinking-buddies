import { gql } from "@apollo/client";

export const ADD_USER = gql`
mutation ADD_USER ($name: String!, $email: String!, $password: String!){
  addUser (name: $name, email: $email, password: $password){
    token
  }
}
`;

export const UPDATE_USER_INFO = gql`
mutation UPDATE_USER_INFO($_id: ID!, $name: String!, $email: String!, $password: String!){
  updateUserInfo(_id: $_id, name: $name, email: $email, password: $password){
    name
    email
  }
}
`;

export const LOGIN = gql`
mutation LOGIN($email: String!, $password: String!){
  login(email: $email, password: $password){
    token
  }
}
`;

export const ADD_INTEREST = gql`
mutation ADD_INTEREST($name: String!){
  addInterest (name: $name){
    _id
    name
  }
}
`;

export const ADD_USER_INTEREST = gql`
mutation ADD_USER_INTEREST($_id: ID!, $interest: ID!){
  addUserInterest (_id: $_id, interest: $interest){
    name
    interests {
      name
    }
  }
}
`;

export const UPDATE_DISLIKES = gql`
  mutation updateDislikes($videoId: String, $user: String) {
    updateDislikes(videoId: $videoId, user: $user) {
      _id
      title
      cloudURL
      likes
      dislikes
      views
      publishDate
      likedBy
      dislikedBy
    }
  }
`;

export const REMOVE_VIDEO = gql`
  mutation removeVideo($videoId: ID!) {
    removeVideo(videoId: $videoId) {
      _id
      title
      cloudURL
      likes
      dislikes
      views
      publishDate
    }
  }
`

export default ADD_INTEREST;








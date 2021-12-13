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

export const DELETE_USER_INTEREST = gql`
mutation DELETE_USER_INTEREST ($_id: ID!, $interest: ID!){
  deleteUserInterest (_id: $_id, interest: $interest){
    name
    interests {
      name
    }
  }
}
`;

export const ADD_PRICE_RANGE = gql`
mutation ADD_PRICE_RANGE($_id: ID!, $price_range: Int){
  addPriceRange(_id: $_id, price_range: $price_range){
    name
    price_range
  }
}
`;

export const DELETE_PRICE_RANGE = gql`
mutation DELETE_PRICE_RANGE($_id:ID!, $price_range: Int){
  deletePriceRange(_id: $_id, price_range: $price_range){
    name
    price_range
  }
}
`;

export const ADD_DRINK_LEVEL = gql`
mutation ADD_DRINK_LEVEL($_id: ID!, $drink_level: Int){
  addDrinkLevel(_id: $_id, drink_level: $drink_level){
    name
    drink_level
  }
}
`;

export const DELETE_DRINK_LEVEL = gql`
mutation DELETE_DRINK_LEVEL($_id: ID!, $drink_level: Int){
  deleteDrinkLevel(_id: $_id, drink_level: $drink_level){
    name
    drink_level
  }
}
`;

export const INC_POPULARITY = gql`
mutation INC_POPULARITY($_id: ID!){
  incPopularity(_id: $_id){
    name
    popularity
  }
}
`;

export const DEC_POPULARITY = gql`
mutation DEC_POPULARITY ($_id: ID!){
  decPopularity(_id: $_id){
    name
    popularity
  }
}
`;

export default ADD_INTEREST;








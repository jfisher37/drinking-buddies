import { gql } from "@apollo/client";

export const QUERY_ALL_USERS = gql`
query QUERY_ALL_USERS{
  users{
    _id
    name
    email
    password
    drink_level
    price_range
    interests {
      name
    }
  }
}
`

export const QUERY_SINGLE_USER = gql`
query QUERY_SINGLE_USER ($_id: ID!){
  user (_id: $_id){
    name
    email
    password
    drink_level
    price_range
    interests {
      name
    }
    }
  }
`

export const QUERY_ALL_INTERESTS = gql`
query QUERY_ALL_INTERESTS {
  interests{
    _id
    name
    popularity
  }
}  
`

export const QUERY_SINGLE_INTEREST = gql`
query QUERY_SINGLE_INTEREST ($_id: ID!){
  interest (_id: $_id){
    name
    popularity
  }
} 
`
;

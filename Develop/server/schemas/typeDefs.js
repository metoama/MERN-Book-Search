const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID
    username: String
    email: String 
    bookCount
    savedBooks 

type Auth {
    token: ID!
    user: User
}

type Query {
    users: [User]!
    user(userId: ID!): User
}

type Book {
    bookId
    authors: [String]
    description: String
    title: String
    image: 
    link:

}


type Mutation {
    addUser(name: String!, email: String!, password: String!): Auth
    login: (email: String!, password: String!): Auth
    saveBook: () 
    removeBook: (bookId: ID!): User
}`









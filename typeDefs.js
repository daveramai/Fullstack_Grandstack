const {gql} = require("apollo-server");

const typeDefs = gql`
type Business {
    businessId: ID!
    name: String
    address: String
    avgStars: Float
    photos: [Photo]
    reviews: [Review]
}

type User {
    userId: ID!
    name: String
    photos: [Photo]
    reviews: [Review]
}

type Photo {
    business: Business
    user: User
    photoId: ID!
    url: String
}

type Review {
    reviewId: ID!
    stars: Float
    text: String
    user: User
    business: Business
}

type Query {
    allBusinesses: [Business]
    businessBySearchTerm(search: String!): [Business]
    userById(id: ID!): User
}
`;

module.exports = {typeDefs};
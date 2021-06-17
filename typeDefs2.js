const typeDefs = /* GraphQL */ `
    type Business {
        businessId: ID!
        name: String!
        city: String!
        state: String!
        address: String!
        location: Point!
        reviews: [Review] @relation(name: "REVIEWS", direction: IN)
        categories: [Category] @relation(name: "IN_CATEGORY", direction: OUT)
    }

    type User {
        userID: ID!
        name: String!
        reviews: [Review] @relation(name: "WROTE", direction: OUT)
    }

    type Review {
        reviewId: ID!
        stars: Float!
        date: Date!
        text: String
        user: User @relation(name:"WROTE", direction: IN)
        business: Business @relation(name: "REVIEWS", direction: OUT)
    }

    type Category {
        name: String!
        businesses: [Business] @relation(name: "IN_CATEGORY", direction: IN)
    }
`;

module.exports = {typeDefs};
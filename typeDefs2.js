const typeDefs = /* GraphQL */ `
    type Business {
        businessId: ID!
        waitTime: Int! @neo4j_ignore
        avgStars: Float! @cypher(statement: "MATCH (this)<-[:REVIEWS]-(r:Review) RETURN avg(r.stars)")
        recommended(first: Int = 1): [Business] @cypher(statement: "MATCH (this)<-[:REVIEWS]-(:Review)<-[:WROTE]-(:User)-[:WROTE]->(:Review)-[:REVIEWS]->(rec:Business) WITH rec, COUNT(*) AS score RETURN rec ORDER BY score DESC LIMIT $first")
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

    type Query {
        fuzzyBusinessByName(searchString: String): [Business] @cypher(
        statement: """
            CALL db.index.fulltext.queryNodes( 'businessNameIndex', $searchString+'~')
            YIELD node RETURN node
        """
        )
    }
`;

//run this on neo4j db browser to index Business > name field for fuzzy search above to work
//CALL db.index.fulltext.createNodeIndex("businessNameIndex", ["Business"],["name"])

module.exports = {typeDefs};
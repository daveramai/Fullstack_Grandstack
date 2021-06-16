const resolvers = {
    Query: {
        allBusinesses: (obj, args, context, info) => {
        // TODO: return all businesses
        return context.db.businesses
        },
    },

    Business: {
        name: (obj, args, context, info) => {
            return obj.name
        },
        reviews: (obj, args, context, info) => {
        return obj.reviewIds.map(v => { return context.db.reviews.find(review => { return review.reviewId === v;});});
        }
    },

    Review: {
        user: (obj, args, context, info) => {
            return context.db.users.find( user => {return user.userId === obj.userId })
        }
    }

        
        
}

module.exports = resolvers;
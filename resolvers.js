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
        }
    }
}

module.exports = resolvers;
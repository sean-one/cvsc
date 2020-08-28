const BusinessType = `
    type Business {
        _id: ID
        businessname: String
        about: String
        businessType: String
        address: String
        location: Location
        contact: Contact
    }

    type Query {
        businesses: [Business]
        businessById(id: ID!): Business!
        brands: [Business]
        dispensaries: [Business]
    }

    type Mutation {
        createBusiness(businessinput: BusinessInput): Business
        updateBusiness(updatebusinessinput: UpdateBusinessInput ): Business!
        deleteBusiness(id: ID!): Business!
    }

    input BusinessInput {
        businessname: String!
        about: String!
        businessType: String!
        address: String!
    }

    input UpdateBusinessInput {
        id: ID!
        businessname: String
        about: String
        businessType: String
        address: String
    }
`;

module.exports = BusinessType;
const ContactType = `
    type Contact {
        _id: ID!
        phone: String
        email: String
        url: String
        instagram: String
    }

    type Mutation {
        createUserContact(userinput: UserContactInput): Contact!
        createBusinessContact(businessinput: BusinessContactInput): Contact!
        updateContact(updatecontact: ContactUpdate): Contact!
        deleteContact(id: ID!): Contact!
    }

    input ContactUpdate {
        contactId: ID!
        phone: String
        email: String
        url: String
        instagram: String
    }

    input BusinessContactInput {
        id: ID!
        phone: String!
        email: String!
        url: String
        instagram: String
    }

    input UserContactInput {
        id: ID!
        phone: String
        email: String
        url: String
        instagram: String
    }
`;

module.exports = ContactType;
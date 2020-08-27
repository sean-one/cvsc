const UserType = `
    type User {
        _id: ID
        username: String
        password: String
        contact: Contact
        brandsFollowed: [Business]
        dispensariesFollowed: [Business]
    }

    type Query {
        userByUsername(username: String): User!
        userById(id: ID): User!
        users: [User]
    }

    type Mutation {
        createUser(userinput: UserInput!): User!
        updateUser(updateuserinput: UpdateUserInput!): User!
        deleteUserById(id: ID!): User!
        follow(userId: ID, businessId: ID): User
        unfollow(userId: ID, businessId: ID): User
    }

    input UserInput {
        username: String!
        password: String!
    }

    input UpdateUserInput {
        id: ID!
        username: String
        password: String
    }
`;

module.exports = UserType;
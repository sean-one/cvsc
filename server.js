require('dotenv').config();

const express = require('express');
const graphqlHTTP = require('express-graphql');
// const schema = require('./schema/schema');
const schema = require('./graphql');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
}));

// sanity check
app.get('/', (req, res) => {
    res.status(200).json({ api: 'here i go' })
});

const port = 5000;

mongoose.connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cvsmokersclub-xmozl.mongodb.net/test?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    },
    () => console.log("connected to database")
    );

app.listen(port, () => console.log(`C.V.S.C. server running on port: ${port}`));
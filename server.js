const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const cors = require('cors');

// Routers
const userRouter = require('./routes/userRouter');
const brandRouter = require('./routes/brandRouter');
const dispRouter = require('./routes/dispRouter');
const eventRouter = require('./routes/eventRouter');
const brandFilterRouter = require('./routes/brandFilterRouter');
const dispFilterRouter = require('./routes/dispFilterRouter');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
}));

app.use('/api/users', userRouter);
app.use('/api/brands', brandRouter);
app.use('/api/dispensary', dispRouter);
app.use('/api/events', eventRouter);
app.use('/api/b/filter', brandFilterRouter);
app.use('/api/d/filter', dispFilterRouter);

// sanity check
app.get('/', (req, res) => {
    res.status(200).json({ api: 'here i go' })
});

const port = 5000;

app.listen(port, () => console.log(`C.V.S.C. server running on port: ${port}`));
const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const cors = require('cors');
const mongoose = require('mongoose');

// Routers
const userRouter = require('./routes/userRouter');
const brandRouter = require('./routes/brandRouter');
const dispRouter = require('./routes/dispRouter');
const eventRouter = require('./routes/eventRouter');

const ulRouter = require('./routes/ulRouter');

const filterRouter = require('./routes/filterRouter');
const alertRouter = require('./routes/alertRouter');
const editorRouter = require('./routes/editorRouter');

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

app.use('/api/ul', ulRouter);

app.use('/api/filter', filterRouter);
app.use('/api/alert', alertRouter);
app.use('/api/editor', editorRouter);

// sanity check
app.get('/', (req, res) => {
    res.status(200).json({ api: 'here i go' })
});

const port = 5000;

mongoose.connect(
    `mongodb + srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cvsc-xmozl.mongodb.net/test?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    () => console.log("connected to database")
    );

app.listen(port, () => console.log(`C.V.S.C. server running on port: ${port}`));
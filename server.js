const express = require('express');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');
const schema = require('./schema');
const path = require('path');

// initialize express
const app = express();

// Allow cros-origin
app.use(cors());

// endpoint that runs graphqlHTTP
app.use('/graphql', graphqlHTTP({
    // point to the schema
    schema: schema,
    graphiql: true
}));

app.use(express.static('public'));

// whenever any route except /graphql is hit, it's going to redirect to React's index.html
// we are just sending the file here - index.html; we need to define the path correctly

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
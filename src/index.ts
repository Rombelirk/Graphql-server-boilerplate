import express from 'express';
import graphqlHTTP from 'express-graphql';
import mongoose from 'mongoose';
import schema from './graphql/schema';
import isAuth from './middleware/isAuthenticated';

mongoose.connect('mongodb://localhost:27017/GP', { useNewUrlParser: true }, (err) => {
    if (err) {
        console.log(err);
    }
    console.log('connected to db');
});

const app = express();
app.use(
    '/graphql',
    graphqlHTTP({
        schema,
        graphiql: true,
    })
);

app.use(isAuth);

app.listen(3000);

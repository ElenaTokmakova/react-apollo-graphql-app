const fetch = require("node-fetch");
const axios = require('axios');

const { GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLBoolean,
    GraphQLList,
    GraphQLSchema
} = require('graphql');

// structure you schema around your data

// Launch Type
const LaunchType = new GraphQLObjectType({
    name: 'Launch',
    fields: () => ({
        flight_number: { type:  GraphQLInt},
        mission_name: { type: GraphQLString},
        launch_year: { type: GraphQLString},
        launch_date_local: { type: GraphQLString},
        launch_success: { type: GraphQLBoolean},
        rocket: { type: RocketType }
    })
});

// this is how you create relationships within your schema

// Rocket Type
const RocketType = new GraphQLObjectType({
    name: 'Rocket',
    fields: () => ({
        rocket_id: { type:  GraphQLString},
        rocket_name: { type: GraphQLString},
        rocket_type: { type: GraphQLString}
    })
});

// create a root query
// in the root query, create endpoints
// that will have resolvers
// that will resolve our data

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        launches: {
            type: new GraphQLList(LaunchType),
            resolve(parent, args) {

                return axios.get('https://api.spacexdata.com/v3/launches')
                    .then(res => res.data)

                /*
                return fetch('https://api.spacexdata.com/v3/launches')
                .then(response => response.json())
                .then(json => {
                    console.log('Success', json.data);
                })
                .catch(error => console.log('Error', error));
                */
            }
        },
        launch: {
            type: LaunchType,
            args: {
                flight_number: {  type: GraphQLInt  }
            },
            resolve(parent, args) {
                return axios.get(`https://api.spacexdata.com/v3/launches/${args.flight_number}`)
                    .then(res => res.data)
            }
        },
        rockets: {
            type: new GraphQLList(RocketType),
            resolve(parent, args) {

                return axios.get('https://api.spacexdata.com/v3/rockets')
                    .then(res => res.data)
            }
        },
        rocket: {
            type: RocketType,
            args: {
                id: {  type: GraphQLInt  }
            },
            resolve(parent, args) {
                return axios.get(`https://api.spacexdata.com/v3/rockets/${args.id}`)
                    .then(res => res.data)
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
});
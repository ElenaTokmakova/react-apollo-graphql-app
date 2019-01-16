// this is where we want to make a query to GraphQL

// to generate a class, type rce and press Tab or Enter if the React/Redux/GraphQL extension is installed

import React, { Component, Fragment } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import LaunchItem from './Launchitem';
import MissionKey from './MissionKey';

const LAUNCHES_QUERY = gql`
    query LaunchesQuery {
        launches {
            flight_number,
            mission_name,
            launch_date_local,
            launch_success
        }
    }
`;

export class Launches extends Component {
  render() {
    return (
      <div>
        <Fragment>
          <h1 className="display-4 my-3">Launches</h1>
          <MissionKey />
          <Query query={LAUNCHES_QUERY}>
            {
              ({ loading, error, data }) => {
                // loading is a boolean
                if (loading) return <h4>Loading...</h4>
                if (error) console.log(error);
                console.log(data);
                return <Fragment>
                  {
                    data.launches.map(launch => (
                      <LaunchItem key={launch.flight_number} launch={launch} />
                    ))
                  }
                </Fragment>
              }
            }
          </Query>
        </Fragment>
      </div>
    )
  }
}

export default Launches

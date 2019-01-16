import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import './App.css';
import Launches from './components/Launches';
import Launch from './components/Launch';
import logo from './logo.png';

// wrap the component in a provider and pass in the client

// we want to make sure we hit that graphql route because on our server we have one endpoint
const client = new ApolloClient({
  uri: '/graphql'
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
       <Router>
        <div className="container">
          <img src={logo} alt="SpaceX" style={{ width: 500, display: 'block', margin: 'auto'}}></img>
          <Route exact path="/" component={Launches} />
          <Route exact path="/launch/:flight_number" component={Launch} />
        </div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;

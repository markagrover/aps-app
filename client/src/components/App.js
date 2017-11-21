import React, { Component } from "react";
import MGRouter from './Router';
import { connect } from "react-redux";
import * as actions from "../actions";
import MainLayout from '../components/layouts/MainLayout';
import { BrowserRouter } from 'react-router-dom';
import Todos from './Todos';
import Test from './Test';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  componentDidMount() {
    this.props.fetchTest();
    this.props.fetchTodos();
    this.props.fetchUser();
  }
  render() {
      // Add new routes here and pass in components.
    return (
      <BrowserRouter>
        <MainLayout MGRouter={<MGRouter
            routes={{
                "/": () => <h1>Landing...</h1>,
                "/todos": Todos  ,
                "/test": Test
            }} />
            }/>
      </BrowserRouter>
    );
  }
}

export default connect(null, actions)(App);

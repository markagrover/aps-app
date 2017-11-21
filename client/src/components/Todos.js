import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";

class Test extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: []
    };
  }
  renderTodos() {
    if (this.state.todos) {
      return this.state.todos.map((todo, i) => {
        return <li key={i}>{todo.name}</li>;
      });
    } else {
      return "Loading ...";
    }
  }
  async componentDidMount() {
    await this.props.fetchTodos();
    this.setState({
      todos: this.props.todos
    });
  }
  render() {
    console.log(this.props);
    return (
      <div>
        <h2>Todos Test</h2>
        {this.renderTodos()}
      </div>
    );
  }
}

function mapStateToProps({ todos }) {
  return {
    todos
  };
}

export default connect(mapStateToProps, actions)(Test);

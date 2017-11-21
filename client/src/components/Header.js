import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Button from 'react-toolbox/lib/button/Button';

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li>
            <a href="/auth/google">Log In With Google</a>
          </li>
        );
      default:
        return (
          <li key={"logout"}>
            <a href="/api/logout">Log Out</a>
          </li>
        );
    }
  }
  render() {
    return (
        <div>
          <nav>
            <div className="nav-wrapper blue-grey ">
              <Link
                  to={this.props.auth ? "/todos" : "/"}
                  className="left brand-logo"
              >
                Code Journal
              </Link>
              <ul id="nav-mobile" className="right">
                <li>
                  <Link to="/todos">TODOS</Link>
                </li>
                  {this.renderContent()}
              </ul>
            </div>
          </nav>
          <div>
            <Button icon='bookmark' label='Bookmark' accent />
            <Button icon='bookmark' label='Bookmark' raised primary />
            <Button icon='inbox' label='Inbox' flat />
            <Button icon='add' floating />
            <Button icon='add' floating accent mini />
          </div>
        </div>

    );
  }
}

function mapStateToProps({ auth }) {
  return {
    auth
  };
}

export default connect(mapStateToProps)(Header);

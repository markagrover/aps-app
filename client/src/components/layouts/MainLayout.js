import React, { Component } from "react";
import Layout from "react-toolbox/lib/layout/Layout";
import NavDrawer from "react-toolbox/lib/layout/NavDrawer";
import Panel from "react-toolbox/lib/layout/Panel";
import Sidebar from "react-toolbox/lib/layout/Sidebar";
import Checkbox from "react-toolbox/lib/checkbox/Checkbox";
import IconButton from "react-toolbox/lib/button/IconButton";
import MGAppBar from "../RTComponents/Appbar";
import MGNav from "../RTComponents/Navigation";

class MainLayout extends Component {
  state = {
    drawerActive: false,
    drawerPinned: false,
    sidebarPinned: false
  };

  toggleDrawerActive = () => {
    this.setState({ drawerActive: !this.state.drawerActive });
  };

  toggleDrawerPinned = () => {
    this.setState({ drawerPinned: !this.state.drawerPinned });
  };

  toggleSidebar = () => {
    this.setState({ sidebarPinned: !this.state.sidebarPinned });
  };

  render() {
    return (
      <Layout>
        <NavDrawer
          active={this.state.drawerActive}
          pinned={this.state.drawerPinned}
          onOverlayClick={this.toggleDrawerActive}
        >
          <MGNav />
        </NavDrawer>
        <Panel>
          <MGAppBar menuIconOnClick={this.toggleDrawerPinned} />
          <div style={{ flex: 1, overflowY: "auto", padding: "1.8rem" }}>

            <Checkbox
              label={"Show Sidebar"}
              checked={this.state.sidebarPinned}
              onChange={this.toggleSidebar}
            />
          </div>
            {this.props.MGRouter}
        </Panel>
        <Sidebar pinned={this.state.sidebarPinned} width={5}>
          <div>
            <IconButton icon="close" onClick={this.toggleSidebar} />
            <div style={{ flex: 1 }}>
              <p>Supplement content goes here.</p>
            </div>
          </div>
        </Sidebar>
      </Layout>
    );
  }
}

export default MainLayout;

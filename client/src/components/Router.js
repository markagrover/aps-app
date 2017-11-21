import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

function createRoutes(routes){
    const keys = Reflect.ownKeys(routes);
    return keys.map((key, i) => {
        return <Route key={i} exact path={`${key}`} component={routes[key]} />
    });
}

const MGRouter = props => {
  return (
    <div>
        <div className="container">
            {createRoutes(props.routes)}
        </div>
    </div>
  );
};
export default MGRouter;

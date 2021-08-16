import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//layouts
import DashboardLayout from "./layouts/DashboardLayout/DashboardLayout";
import AuthLayout from "./layouts/AuthLayout/AuthLayout";

//pages
import Assets from "./pages/Assets/Assets";
import Login from "./pages/Login/Login";

import setupInterceptors from "./services/setupInterceptors";
import PrivateRoute from "./helpers/PrivateRoute";

setupInterceptors();

function App() {
  return (
    <React.Suspense fallback={<div>Loading</div>}>
      <Router>
        <Switch>
          <Route exact path={"/login"}>
            <AuthLayout>
              <Login />
            </AuthLayout>
          </Route>

          <PrivateRoute
            exact
            path={"/"}
            component={() => <DashboardLayout>Dashboard</DashboardLayout>}
          />

          <PrivateRoute
            exact
            path={"/assets"}
            component={() => (
              <DashboardLayout>
                <Assets />
              </DashboardLayout>
            )}
          />

          <PrivateRoute
            exact
            path={"/users"}
            component={() => <DashboardLayout>users</DashboardLayout>}
          />
        </Switch>
      </Router>
    </React.Suspense>
  );
}

export default App;

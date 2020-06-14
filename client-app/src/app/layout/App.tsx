import React, { Fragment, FC } from "react";
import { Container } from "semantic-ui-react";
import { Navbar } from "../../features/Navbar";
import ActivitiesDashboard from "../../features/Activities/Dashboard/ActivitiesDashboard";
import "mobx-react-lite/batchingForReactDom";
import { observer } from "mobx-react-lite";
import { Route, withRouter, RouteComponentProps } from "react-router-dom";
import HomePage from "../../features/home/homePage";
import ActivityForm from "../../features/Activities/Form/ActivityForm";
import ActivityDetails from "../../features/Activities/Details/ActivityDetails";
const App: FC<RouteComponentProps> = ({ location }) => {
  return (
    <Fragment>
      <Route exact={true} path="/" component={HomePage} />
      <Route
        path="/(.+)"
        render={() => (
          <Fragment>
            <Navbar />
            <Container style={{ marginTop: "7em" }}>
              <Route
                exact={true}
                path="/activities"
                component={ActivitiesDashboard}
              />
              <Route path="/activities/:id" component={ActivityDetails} />
              <Route
                key={location.key}
                path={["/createActivity", "/manage/:id"]}
                component={ActivityForm}
              />
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
};

export default withRouter(observer(App));

import React, { useEffect, Fragment, useContext } from "react";
import { Container } from "semantic-ui-react";
import { Navbar } from "../../features/Navbar";
import ActivitiesDashboard from "../../features/Activities/Dashboard/ActivitiesDashboard";
import ActivityStore from "../store/activityStore";
import { Loading } from "./Loading";
import "mobx-react-lite/batchingForReactDom";
import { observer } from "mobx-react-lite";
const App = () => {
  const activityStore = useContext(ActivityStore);

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial)
    return <Loading content="Loading activities..." />;
  return (
    <Fragment>
      <Navbar />
      <Container style={{ marginTop: "7em" }}>
        <ActivitiesDashboard />
      </Container>
    </Fragment>
  );
};

export default observer(App);

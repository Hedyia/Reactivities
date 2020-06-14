import React, { useContext, useEffect } from "react";
import { Grid, GridColumn } from "semantic-ui-react";
import ActivitiesList from "../List/ActivitiesList";
import { observer } from "mobx-react-lite";
import { Loading } from "../../../app/layout/Loading";
import ActivityStore from "../../../app/store/activityStore";

const ActivitiesDashboard: React.FC = () => {
  const activityStore = useContext(ActivityStore);

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial)
    return <Loading content="Loading activities..." />;
  return (
    <Grid>
      <GridColumn width={10}>
        <ActivitiesList />
      </GridColumn>
      <GridColumn width={6}>
        <h2>Filter..</h2>
      </GridColumn>
    </Grid>
  );
};
export default observer(ActivitiesDashboard);

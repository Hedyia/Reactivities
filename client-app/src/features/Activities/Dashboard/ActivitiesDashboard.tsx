import React, { useContext } from "react";
import { Grid, GridColumn } from "semantic-ui-react";
import ActivitiesList from "../List/ActivitiesList";
import ActivityDetails from "../Details/ActivityDetails";
import ActivityForm from "../Form/ActivityForm";
import { observer } from "mobx-react-lite";
import ActivityStore from "../../../app/store/activityStore";

const ActivitiesDashboard: React.FC = () => {
  const activityStore = useContext(ActivityStore);
  const { editMode, selectedActivity } = activityStore;
  return (
    <Grid>
      <GridColumn width={10}>
        <ActivitiesList />
      </GridColumn>
      <GridColumn width={6}>
        {selectedActivity && !editMode && <ActivityDetails />}
        {editMode && (
          <ActivityForm
            key={(selectedActivity && selectedActivity.id) || 0}
            activity={selectedActivity!}
          />
        )}
      </GridColumn>
    </Grid>
  );
};
export default observer(ActivitiesDashboard);

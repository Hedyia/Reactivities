import React from "react";
import { IActivity } from "../../../app/models/activity";
import { Grid, GridColumn } from "semantic-ui-react";
import { ActivitiesList } from "../List/ActivitiesList";
import { ActivityDetails } from "../Details/ActivityDetails";
import { ActivityForm } from "../Form/ActivityForm";

interface IProps {
  activities: IActivity[];
  onSelectActivity: (id: string) => void;
  selectedActivity: IActivity | null;
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
  setSelectedActivity: (activity: IActivity | null) => void;
  createActivity: (activity: IActivity) => void;
  editActivity: (activity: IActivity) => void;
  deleteActivity: (id: string) => void;
}

export const ActivitiesDashboard: React.FC<IProps> = ({
  activities,
  onSelectActivity,
  selectedActivity,
  editMode,
  setEditMode,
  setSelectedActivity,
  createActivity,
  editActivity,
  deleteActivity,
}) => {
  return (
    <Grid>
      <GridColumn width={10}>
        <ActivitiesList
          actvities={activities}
          onSelectActivity={onSelectActivity}
          deleteActivity={deleteActivity}
        />
      </GridColumn>
      <GridColumn width={6}>
        {selectedActivity && !editMode && (
          <ActivityDetails
            setSelectedActivity={setSelectedActivity}
            activity={selectedActivity}
            setEditMode={setEditMode}
          />
        )}
        {editMode && (
          <ActivityForm
            key={(selectedActivity && selectedActivity.id) || 0}
            setEditMode={setEditMode}
            activity={selectedActivity!}
            createActivity={createActivity}
            editActivity={editActivity}
          />
        )}
      </GridColumn>
    </Grid>
  );
};

import React, { useState, useEffect, Fragment } from "react";
import { Container } from "semantic-ui-react";
import axios from "axios";
import { IActivity } from "../models/activity";
import { Navbar } from "../../features/Navbar";
import { ActivitiesDashboard } from "../../features/Activities/Dashboard/ActivitiesDashboard";

const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(
    null
  );

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios
      .get<IActivity[]>("http://localhost:5000/api/activities")
      .then((response) => {
        let activities: IActivity[] = [];
        response.data.forEach((activity) => {
          activity.date = activity.date.split(".")[0];
          activities.push(activity);
        });
        setActivities(activities);
      });
  }, []);

  const handleCreate = () => {
    setSelectedActivity(null);
    setEditMode(true);
  };
  const handelActivity = (id: string) => {
    const activity = activities.filter((a) => a.id === id)[0];
    setSelectedActivity(activity);
    setEditMode(false);
  };
  const handleDelete = (id: string) => {
    setActivities([...activities.filter((activity) => activity.id !== id)]);
  };

  const handleCreateActivity = (activity: IActivity) => {
    setActivities([...activities, activity]);
    setSelectedActivity(activity);
    setEditMode(false);
  };
  const handleEditActivity = (activity: IActivity) => {
    setActivities([
      ...activities.filter((a) => a.id !== activity.id),
      activity,
    ]);
    setSelectedActivity(activity);
    setEditMode(false);
  };

  return (
    <Fragment>
      <Navbar onHandleCreate={handleCreate} />
      <Container style={{ marginTop: "7em" }}>
        <ActivitiesDashboard
          activities={activities}
          onSelectActivity={handelActivity}
          selectedActivity={selectedActivity}
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedActivity={setSelectedActivity}
          createActivity={handleCreateActivity}
          editActivity={handleEditActivity}
          deleteActivity={handleDelete}
        />
      </Container>
    </Fragment>
  );
};

export default App;
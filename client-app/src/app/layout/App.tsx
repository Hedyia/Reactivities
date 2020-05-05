import React, { useState, useEffect, Fragment } from "react";
import { Container } from "semantic-ui-react";
import { IActivity } from "../models/activity";
import { Navbar } from "../../features/Navbar";
import { ActivitiesDashboard } from "../../features/Activities/Dashboard/ActivitiesDashboard";
import agent from "../api/agent";
import { Loading } from "./Loading";

const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(
    null
  );

  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [target, setTarget] = useState("");
  useEffect(() => {
    agent.Activities.list()
      .then((response) => {
        let activities: IActivity[] = [];
        response.forEach((activity) => {
          activity.date = activity.date.split(".")[0];
          activities.push(activity);
        });
        setActivities(activities);
      })
      .then(() => setLoading(false));
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
  const handleDelete = (e: string, id: string) => {
    setTarget(e);
    setSubmitting(true);
    agent.Activities.del(id)
      .then(() => {
        setActivities([...activities.filter((activity) => activity.id !== id)]);
      })
      .then(() => setSubmitting(false));
  };

  const handleCreateActivity = (activity: IActivity) => {
    setSubmitting(true);
    agent.Activities.create(activity)
      .then(() => {
        setActivities([...activities, activity]);
        setSelectedActivity(activity);
        setEditMode(false);
      })
      .then(() => setSubmitting(false));
  };
  const handleEditActivity = (activity: IActivity) => {
    setSubmitting(true);
    agent.Activities.update(activity)
      .then(() => {
        setActivities([
          ...activities.filter((a) => a.id !== activity.id),
          activity,
        ]);
        setSelectedActivity(activity);
        setEditMode(false);
      })
      .then(() => setSubmitting(false));
  };

  if (loading) return <Loading content="Loading activities..." />;
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
          submitting={submitting}
          target={target}
        />
      </Container>
    </Fragment>
  );
};

export default App;

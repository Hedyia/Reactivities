import React, { FC, useState, FormEvent, useContext, useEffect } from "react";
import { Form, Segment, Button } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import { v4 as uuid } from "uuid";
import ActivityStore from "../../../app/store/activityStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps, Link } from "react-router-dom";

interface IProps {
  id: string;
}
const ActivityForm: FC<RouteComponentProps<IProps>> = ({ match, history }) => {
  const activityStore = useContext(ActivityStore);
  const {
    activity: initialFormState,
    loadActivity,
    createActivity,
    editActivity,
    submitting,
    clearActivity,
  } = activityStore;

  useEffect(() => {
    if (match.params.id && activity.id.length === 0) {
      loadActivity(match.params.id).then(
        () => initialFormState && setActivity(initialFormState)
      );
    }
    return () => {
      clearActivity();
    };
  });

  const [activity, setActivity] = useState<IActivity>({
    id: "",
    title: "",
    category: "",
    city: "",
    date: "",
    description: "",
    venue: "",
  });

  const handleInputChange = (
    e: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.currentTarget;
    setActivity({ ...activity, [name]: value });
  };
  const handleSubmit = () => {
    if (activity.id.length !== 0) {
      editActivity({ ...activity }).then(() => {
        history.push(`/activities/${activity.id}`);
      });
    } else
      createActivity({ ...activity, id: uuid() }).then(() => {
        history.push(`/activities/${activity.id}`);
      });
  };
  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          name="title"
          placholder="Title"
          value={activity.title}
          onChange={handleInputChange}
        />
        <Form.TextArea
          name="description"
          placholder="Description"
          row={2}
          value={activity.description}
          onChange={handleInputChange}
        />
        <Form.Input
          name="category"
          placholder="Category"
          value={activity.category}
          onChange={handleInputChange}
        />
        <Form.Input
          name="date"
          placholder="Date"
          type="date"
          value={activity.date}
          onChange={handleInputChange}
        />
        <Form.Input
          name="city"
          placholder="City"
          value={activity.city}
          onChange={handleInputChange}
        />
        <Form.Input
          name="venue"
          placholder="Venue"
          value={activity.venue}
          onChange={handleInputChange}
        />
        <Button
          loading={submitting}
          floated="right"
          positive
          type="submit"
          content="Submit"
        />
        <Button
          floated="right"
          as={Link}
          to={"/activities"}
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
};
export default observer(ActivityForm);

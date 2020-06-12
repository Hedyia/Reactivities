import React, { FC, useState, FormEvent, useContext } from "react";
import { Form, Segment, Button } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import { v4 as uuid } from "uuid";
import ActivityStore from "../../../app/store/activityStore";
import { observer } from "mobx-react-lite";
interface IProps {
  activity: IActivity;
}
const ActivityForm: FC<IProps> = ({ activity: initialState }) => {
  const activityStore = useContext(ActivityStore);
  const {
    createActivity,
    editActivity,
    submitting,
    setEditMode,
  } = activityStore;
  const initializeForm = () => {
    if (initialState) return initialState;
    else
      return {
        id: "",
        title: "",
        description: "",
        category: "",
        date: "",
        city: "",
        venue: "",
      };
  };
  const [activity, setActivity] = useState<IActivity>(initializeForm);

  const handleInputChange = (
    e: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.currentTarget;
    setActivity({ ...activity, [name]: value });
  };
  const handleSubmit = () => {
    if (activity.id.length !== 0) {
      editActivity({ ...activity });
    } else createActivity({ ...activity, id: uuid() });
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
          type="button"
          content="Cancel"
          onClick={() => {
            setEditMode(false);
          }}
        />
      </Form>
    </Segment>
  );
};
export default observer(ActivityForm);

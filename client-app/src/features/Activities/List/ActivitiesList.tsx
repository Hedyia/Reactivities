import React, { FC, useContext } from "react";
import { Item, Button, Segment, Label } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import ActivityStore from "../../../app/store/activityStore";
import { Link } from "react-router-dom";

const ActivitiesList: FC = () => {
  const activityStore = useContext(ActivityStore);
  const { sortByDate, submitting, deleteActivity, target } = activityStore;
  return (
    <Segment clearing>
      <Item.Group divided>
        {sortByDate.map((activity) => (
          <Item key={activity.id}>
            <Item.Content>
              <Item.Header as="a">{activity.title}</Item.Header>
              <Item.Meta>{activity.date}</Item.Meta>
              <Item.Description>
                <div>{activity.description}</div>
                <div>
                  {activity.city}, {activity.venue}
                </div>
              </Item.Description>
              <Item.Extra>
                <Button
                  floated="right"
                  content="view"
                  color="blue"
                  as={Link}
                  to={`/activities/${activity.id}`}
                />
                <Button
                  name={activity.id}
                  floated="right"
                  content="Delete"
                  color="red"
                  loading={target === activity.id && submitting}
                  onClick={(e) =>
                    deleteActivity(e.currentTarget.name, activity.id)
                  }
                />
                <Label basic content={activity.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
};

export default observer(ActivitiesList);

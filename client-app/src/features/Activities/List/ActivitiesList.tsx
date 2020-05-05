import React, { FC } from "react";
import { Item, Button, Segment, Label } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";

interface IProps {
  actvities: IActivity[];
  onSelectActivity: (id: string) => void;
  deleteActivity: (e: string, id: string) => void;
  submitting: boolean;
  target: string;
}
export const ActivitiesList: FC<IProps> = ({
  actvities,
  onSelectActivity,
  deleteActivity,
  submitting,
  target,
}) => {
  return (
    <Segment clearing>
      <Item.Group divided>
        {actvities.map((activity) => (
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
                  onClick={() => onSelectActivity(activity.id)}
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

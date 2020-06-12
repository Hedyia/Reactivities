import React, { FC, useContext } from "react";
import { Card, Image, ButtonGroup, Button } from "semantic-ui-react";
import ActivityStore from "../../../app/store/activityStore";
import { observer } from "mobx-react-lite";

const ActivityDetails: FC = () => {
  const activityStore = useContext(ActivityStore);
  const {
    selectedActivity: activity,
    setEditMode,
    setSelectedActivity,
  } = activityStore;
  return (
    <Card fluid>
      <Image
        src={`/assets/categoryImages/${activity!.category}.jpg`}
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header>{activity!.title}</Card.Header>
        <Card.Meta>
          <span>{activity!.date}</span>
        </Card.Meta>
        <Card.Description>{activity!.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <ButtonGroup widths={2}>
          <Button
            onClick={() => setEditMode(true)}
            basic
            color="blue"
            content="Edit"
          />
          <Button
            onClick={() => setSelectedActivity(undefined)}
            basic
            color="grey"
            content="Cancel"
          />
        </ButtonGroup>
      </Card.Content>
    </Card>
  );
};
export default observer(ActivityDetails);

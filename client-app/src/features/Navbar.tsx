import React, { FC, useContext } from "react";
import { Menu, Container, Button } from "semantic-ui-react";
import ActivityStore from "../app/store/activityStore";

export const Navbar: FC = () => {
  const activityStore = useContext(ActivityStore);
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header>
          <img
            src="/assets/logo.png"
            style={{ marginRight: 10 }}
            alt="assets src"
          />
          Reactivities
        </Menu.Item>
        <Menu.Item name="Activities" />
        <Menu.Item>
          <Button onClick={() => activityStore.openCreateForm()} positive>
            Create Activity
          </Button>
        </Menu.Item>
      </Container>
    </Menu>
  );
};

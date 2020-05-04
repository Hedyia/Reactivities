import React, { FC } from "react";
import { Menu, Container, Button } from "semantic-ui-react";

interface IProps {
  onHandleCreate: () => void;
}
export const Navbar: FC<IProps> = ({ onHandleCreate }) => {
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
          <Button onClick={() => onHandleCreate()} positive>
            Create Activity
          </Button>
        </Menu.Item>
      </Container>
    </Menu>
  );
};

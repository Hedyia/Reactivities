import React, { FC } from "react";
import { Menu, Container, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

export const Navbar: FC = () => {
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header as={Link} exact to="/">
          <img
            src="/assets/logo.png"
            style={{ marginRight: 10 }}
            alt="assets src"
          />
          Reactivities
        </Menu.Item>
        <Menu.Item name="Activities" as={Link} to="/activities" />
        <Menu.Item>
          <Button as={Link} to="/createActivity" positive>
            Create Activity
          </Button>
        </Menu.Item>
      </Container>
    </Menu>
  );
};

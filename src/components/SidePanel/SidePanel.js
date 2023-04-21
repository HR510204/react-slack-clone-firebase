import React from "react";
import { Menu } from "semantic-ui-react";
import UserPanel from "./UserPanel";
import Chanels from "./Channels";
const SidePanel = () => {
  return (
    <Menu
      size={"large"}
      vertical
      inverted
      style={{
        background: "#4c3c4c",
        fontsize: "1.2rem",
      }}
      fixed={"left"}
    >
      <UserPanel />
      <Chanels />
    </Menu>
  );
};
export default SidePanel;

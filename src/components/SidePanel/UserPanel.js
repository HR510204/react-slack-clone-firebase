import React from "react";
import { Dropdown, Grid, Header, Icon, Image } from "semantic-ui-react";
import firebase from "../../firebase";
import { connect } from "react-redux";
const UserPanel = (props) => {
  console.log("userpanel", props);
  const handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("sign out");
      });
  };
  const dropdownOptions = () => [
    {
      key: "User",
      disabled: true,
      text: (
        <span>
          Signed in as
          <strong>{props.currentUser && props.currentUser.displayName}</strong>
        </span>
      ),
    },
    {
      key: "Avatar",
      text: <span>Change Avatar</span>,
    },
    {
      key: "signout",
      text: <span>Sign Out</span>,
      onClick: () => handleSignOut(),
    },
  ];
  return (
    <Grid
      style={{
        background: "#4c3c4c",
      }}
    >
      <Grid.Column>
        <Grid.Row style={{ padding: "1.2em", margin: 0 }}>
          <Header inverted float={"left"} as={"h2"}>
            <Icon name={"code"} />
            <Header.Content>Dev Chat</Header.Content>
          </Header>
          <Header
            inverted
            style={{
              padding: "0.25em",
            }}
            as={"h4"}
          >
            <Dropdown
              trigger={
                <span>
                  <Image
                    src={props.currentUser && props.currentUser.photoURL}
                    spaced={"right"}
                    avatar
                  />
                  {props.currentUser && props.currentUser.displayName}
                </span>
              }
              options={dropdownOptions()}
            />
          </Header>
        </Grid.Row>
      </Grid.Column>
    </Grid>
  );
};
const mapStateToProps = (store) => ({
  currentUser: store.user.currentUser,
});
export default connect(mapStateToProps)(UserPanel);

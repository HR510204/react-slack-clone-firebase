import React, { useState } from "react";
import {
  Button,
  Header,
  Image,
  Icon,
  Menu,
  Modal,
  Form,
  Input,
} from "semantic-ui-react";
import firebase from "../../firebase";
import { connect } from "react-redux";
import { useEffect } from "react";
import { setChannel } from "../../actions";

const Channels = ({ currentUser, setChannel }) => {
  const [channels, setChannels] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const channelRef = firebase.database().ref("channels");
  console.log("abhinav", channels);
  useEffect(() => {
    const channelListener = channelRef.on("child_added", (snap) => {
      setChannels((prevChannels) => [...prevChannels, snap.val()]);
    });
    return () => channelRef.off("child_added", channelListener);
  }, []);
  const handleChange = (event) => {
    event.persist();
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const isFormValid = ({ channelName, channelDetail }) =>
    channelName && channelDetail;
  const addChannel = async () => {
    const key = channelRef.push().key;
    const newChannel = {
      id: key,
      name: formData.channelName,
      details: formData.channelDetail,
      createdBy: {
        name: currentUser.displayName,
        avatar: currentUser.photoURL,
      },
    };
    await channelRef.child(key).update(newChannel);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isFormValid(formData)) {
      setLoading(true);
      try {
        const result = await addChannel();
      } catch (error) {
      } finally {
        setLoading(false);
        setOpen(false);
        setFormData({});
      }
    }
  };
  return (
    <Menu.Menu style={{ paddingBottom: "2em" }}>
      <Menu.Item>
        <span>
          <Icon name={"exchange"} /> CHANNELS
        </span>{" "}
        ({channels.length})
        <Icon
          style={{ cursor: "pointer" }}
          onClick={() => setOpen(true)}
          name={"add"}
        />
      </Menu.Item>
      {channels.length > 0 &&
        channels.map((item) => (
          <Menu.Item
            key={item.id}
            onClick={() => setChannel(item)}
            name={item.name}
            style={{ opacity: 0.7 }}
          >
            #{item.name}
          </Menu.Item>
        ))}
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
      >
        <Modal.Header>Add a Channel</Modal.Header>
        <Modal.Content>
          <Form onSubmit={handleSubmit}>
            <Form.Field>
              <Input
                label={"Name of Channel"}
                onChange={handleChange}
                name={"channelName"}
                value={formData.channelName}
              />
            </Form.Field>
            <Form.Field>
              <Input
                label={"About the Channel"}
                onChange={handleChange}
                name={"channelDetail"}
                value={formData.channelDetail}
              />
            </Form.Field>
            <Modal.Actions style={{ display: "flex", justifyContent: "end" }}>
              <Button color="black" onClick={() => setOpen(false)}>
                Nope
              </Button>
              <Button
                type="submit"
                content="Create"
                labelPosition="right"
                icon="plus"
                loading={loading}
                disabled={loading}
                positive
              />
            </Modal.Actions>
          </Form>
        </Modal.Content>
      </Modal>
    </Menu.Menu>
  );
};

const mapStateToProps = (store) => ({
  currentUser: store.user.currentUser,
});

export default connect(mapStateToProps, {
  setChannel,
})(Channels);

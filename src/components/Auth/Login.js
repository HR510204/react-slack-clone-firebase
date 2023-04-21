import React, { useState } from "react";
import {
  Form,
  Button,
  Header,
  Segment,
  Grid,
  Message,
  Icon,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import firebase from "../../firebase";
const Register = () => {
  const [formData, setFormData] = useState({
    password: "",
    email: "",
  });

  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const { password, email } = formData;

  const handleChange = (event) => {
    event.persist();
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };
  const isFormValid = ({ email, password }) => email && password;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isFormValid) {
      setErrors([]);
      setLoading(true);
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
      } catch (e) {
        setErrors(errors.concat(e));
      } finally {
        setLoading(false);
      }
    }
  };
  const displayErrors = (errors) =>
    errors.map((error) => <p key={error.message}>{error.message}</p>);
  return (
    <Grid textAlign={"center"} verticalAlign={"middle"} className={"app"}>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as={"h2"} icon color={"orange"} textAlign={"center"}>
          <Icon name={"code branch"} color={"orange"} />
          Login for Dev Chat
        </Header>
        <Form onSubmit={handleSubmit} size={"large"}>
          <Segment>
            <Form.Input
              fluid
              name={"email"}
              icon={"mail"}
              iconPosition={"left"}
              placeholder={"abc@abc.com"}
              onChange={handleChange}
              value={email}
              type={"email"}
              className={
                errors.some((err) =>
                  err.message.toLowerCase().includes("email")
                ) && "error"
              }
            />
            <Form.Input
              fluid
              name={"password"}
              icon={"lock"}
              iconPosition={"left"}
              placeholder={"Password"}
              onChange={handleChange}
              value={password}
              type={"password"}
              className={
                errors.some((err) =>
                  err.message.toLowerCase().includes("password")
                ) && "error"
              }
            />

            <Button
              color={"orange"}
              disabled={loading}
              loading={loading}
              fluid
              size={"large"}
            >
              Login
            </Button>
          </Segment>
        </Form>
        {errors.length > 0 && (
          <Message error>
            <Header as={"h2"}>Errors</Header>
            {displayErrors(errors)}
          </Message>
        )}
        <Message>
          Create a User ? <Link to={"/register"}>Register</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Register;

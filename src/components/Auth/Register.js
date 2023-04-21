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
import md5 from "md5";
const Register = () => {
  const [formData, setFormData] = useState({
    userName: "",
    passwordConformation: "",
    password: "",
    email: "",
  });
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const userRef = firebase.database().ref("users");
  const { userName, password, email, passwordConformation } = formData;
  const isFormEmpty = ({ userName, email, password, passwordConformation }) =>
    !userName.length ||
    !email.length ||
    !password.length ||
    !passwordConformation.length;
  const isPasswordValid = ({ password, passwordConformation }) => {
    if (password.length < 6 || passwordConformation.length < 6) {
      return false;
    } else return password === passwordConformation;
  };
  const isFormValid = () => {
    let error;
    let errors = [];
    if (isFormEmpty(formData)) {
      error = { message: "Fill all the Fields" };
      setErrors(errors.concat(error));
      return false;
    } else if (!isPasswordValid(formData)) {
      error = { message: "Password is Invalid" };
      setErrors(errors.concat(error));
      return false;
    } else {
      return true;
    }
  };

  const handleChange = (event) => {
    event.persist();
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };
  const saveUser = (createdUser) =>
    userRef.child(createdUser.user.uid).set({
      displayName: createdUser.user.displayName,
      photoURL: createdUser.user.photoURL,
    });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isFormValid()) {
      setErrors([]);
      setLoading(true);
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((createdUser) => {
          console.log(createdUser);
          createdUser.user
            .updateProfile({
              displayName: userName,
              photoURL: `http://gravatar.com/avatar/${md5(
                createdUser.user.email
              )}?d=identicon`,
            })
            .then(() =>
              saveUser(createdUser).then(() => {
                console.log("user saved");
              })
            )
            .catch((err) => setErrors(errors.concat(err)));
        })
        .catch((err) => setErrors(errors.concat(err)))
        .finally(() => setLoading(false));
    }
  };
  const displayErrors = (errors) =>
    errors.map((error) => <p key={error.message}>{error.message}</p>);
  return (
    <Grid textAlign={"center"} verticalAlign={"middle"} className={"app"}>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as={"h2"} icon color={"orange"} textAlign={"center"}>
          <Icon name={"puzzle piece"} color={"orange"} />
          Register for Dev Chat
        </Header>
        <Form
          onSubmit={handleSubmit}
          size={"large"}
          style={{ borderBottom: 0 }}
        >
          <Segment>
            <Form.Input
              fluid
              name={"userName"}
              icon={"user"}
              iconPosition={"left"}
              placeholder={"User Name"}
              onChange={handleChange}
              value={userName}
              type={"text"}
              className={
                errors.some((err) =>
                  err.message.toLowerCase().includes("username")
                ) && "error"
              }
            />
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
            <Form.Input
              fluid
              name={"passwordConformation"}
              icon={"repeat"}
              iconPosition={"left"}
              placeholder={"Password Conformation"}
              onChange={handleChange}
              value={passwordConformation}
              type={"password"}
            />
            <Button
              disabled={loading}
              loading={loading}
              color={"orange"}
              fluid
              size={"large"}
            >
              Submit
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
          Already a User ? <Link to={"/login"}>Login</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Register;

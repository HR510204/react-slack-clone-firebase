import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import registerServiceWorker from "./registerServiceWorker";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
} from "react-router-dom";
import firebase from "./firebase";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider, connect } from "react-redux";
import { setUser, clearUser } from "./actions";
import rootReducer from "./reducer";
import "semantic-ui-css/semantic.min.css";
import Spinner from "./components/Spinner";
const store = createStore(rootReducer, composeWithDevTools());
const Root = (props) => {
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        props.setUser(user);
        props.history.push("/");
      } else {
        props.history.push("/login");
        props.clearUser();
      }
    });
  }, []);
  return props.isLoading ? (
    <Spinner />
  ) : (
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
    </Switch>
  );
};
const mapStateToProps = (state) => ({
  isLoading: state.user.loading,
});
const RouterWithRoute = withRouter(
  connect(mapStateToProps, { setUser, clearUser })(Root)
);
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <RouterWithRoute />
    </Router>
  </Provider>,

  document.getElementById("root")
);
registerServiceWorker();

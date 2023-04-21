import { Dimmer, Loader } from "semantic-ui-react";
import React from "react";
const Spinner = () => {
  return (
    <Dimmer active>
      <Loader size={"huge"} content={"preparing Chat..."} />
    </Dimmer>
  );
};
export default Spinner;

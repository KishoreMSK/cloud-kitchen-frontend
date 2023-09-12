import axios from "axios";

export const loginUser = ({ success, error, object }) => {
  console.log("inside rrehisteer", object);
  const api = "http://192.168.43.32:5001/validateUser";

  axios
    .post(api, object)
    .then((response) => {
      success && success(response);
    })
    .catch((e) => {
      error && error(e);
    });
};

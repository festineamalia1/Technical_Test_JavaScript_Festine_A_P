const intialState = {
  num: 0,
  data: null,
  error: "",
};

const reducer = (state = { status: "logged out", value: "guest" }, action) => {
  switch (action.type) {
    case "LOGIN":
      console.log("LOGIN");
      return Object.assign({}, state, {
        status: "logged in",
        value: action.value,
      });
    case "LOGOUT":
      return Object.assign({}, state, {
        status: "logged out",
        value: action.value,
      });
    default:
      return state;
  }
};

export default reducer;

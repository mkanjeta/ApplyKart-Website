const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegex = /[a-zA-Z0-9].{6,20}$/;
export const Validator = (name = "", value = "", isRequired = false) => {
  switch (name) {
    case "email":
      return emailRegex.test(String(value).toLowerCase())
        ? ""
        : value.length
        ? "Invalid Email"
        : isRequired
        ? "Required!"
        : "";
    case "password":
      return passwordRegex.test(String(value).toLowerCase())
        ? ""
        : value.length
        ? value.length < 7
          ? "password should be greater than 6 character"
          : "Password can containes only alphabets and numbers"
        : isRequired
        ? "Required!"
        : "";
    default:
      return !value.length ? (isRequired ? "Required!" : "") : "";
  }
};

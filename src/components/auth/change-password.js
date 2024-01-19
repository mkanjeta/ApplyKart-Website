import { Fragment, useEffect, useState } from "react";
import Sidebar from "components/shared/sidebar";
import TopBar from "components/shared/topbar";
import Head from "next/head";
import { Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { changePassword } from "redux/actions/authActions";
import { toggleHamburger } from "../../helper/helper";
import { useRouter } from "next/router";

const ChangePasswordForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState(false);
  const [newPassword, setNewPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [input, setInput] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [seekerId, setSeekerId] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      const applyKart = localStorage.getItem("applyKart");

      if (applyKart) {
        const { userId } = JSON.parse(applyKart);
        setSeekerId(userId);
      } else {
        router?.push("/login");
      }
    }
  }, []);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateInput(e);
  };

  const validateInput = (e) => {
    let { name, value } = e.target;
    setError((prev) => {
      const stateObj = { ...prev, [name]: "" };

      switch (name) {
        case "currentPassword":
          if (!value) {
            stateObj[name] = "Please enter the current Password.";
          }
          break;

        case "newPassword":
          if (!value) {
            stateObj[name] = "Please enter Password.";
          } else if (input.confirmPassword && value !== input.confirmPassword) {
            stateObj["confirmPassword"] =
              "Password and Confirm Password does not match.";
          } else {
            stateObj["confirmPassword"] = input.confirmPassword
              ? ""
              : error.confirmPassword;
          }
          break;

        case "confirmPassword":
          if (!value) {
            stateObj[name] = "Please enter Confirm Password.";
          } else if (input.password && value !== input.password) {
            stateObj[name] = "Password and Confirm Password does not match.";
          }
          break;

        default:
          break;
      }

      return stateObj;
    });
  };
  const handleDataSubmit = () => {
    let err = {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    };
    if (!input.currentPassword && input.currentPassword.trim() == "") {
      err.currentPassword = "Enter current password";
      return;
    }
    if (!input.newPassword && input.newPassword.trim() == "") {
      err.newPassword = "Enter new password";
      return;
    }
    if (!input.confirmPassword && input.confirmPassword.trim() == "") {
      err.confirmPassword = "Enter confirm password";
      return;
    }
    if (input.confirmPassword != input.newPassword) {
      err.confirmPassword = "New password and Confirm password do not match";
      return;
    }
    console.log(err);
    setError(err);
    const obj = {
      userid: seekerId,
      currentpassword: input.currentPassword,
      newpassword: input.newPassword,
    };
    dispatch(changePassword(obj));
  };
  function toggleCurrentPassword() {
    setCurrentPassword(!currentPassword);
  }
  function toggleNewPassword() {
    setNewPassword(!newPassword);
  }
  function toggleConfirmPassword() {
    setConfirmPassword(!confirmPassword);
  }
  return (
    <Fragment>
      <Head>
        <title>ApplyKart</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <main className="main_wrapper">
        <div className="left_side sidebar" id="left_side">
          <Sidebar />
        </div>
        <div className="right_side dashboard">
          {/* TopBar */}
          <TopBar />
          {/* TopBar */}
          <div className="row">
            <div className="col-xl-12">
              <div className="dashboard_title_bar">
                <h3 className="title">Change Password</h3>
              </div>
            </div>
          </div>
          {/* Content Box */}
          <Row>
            <div className="col-lg-6">
              <div className="form_box">
                <form>
                  <div className="form-group password_icon">
                    <label className="text-black">Current Password</label>
                    <input
                      type={currentPassword ? "text" : "password"}
                      className="form-control"
                      name="currentPassword"
                      placeholder="Current Password"
                      value={input.currentPassword}
                      onChange={onInputChange}
                      onBlur={validateInput}
                      required
                    ></input>
                    {error.currentPassword && (
                      <span
                        style={{ color: "red", display: "inline-block" }}
                        className="err"
                      >
                        {error.currentPassword}
                      </span>
                    )}

                    <button
                      type="button"
                      className="button mb-2"
                      onClick={toggleCurrentPassword}
                    >
                      <i
                        className={
                          currentPassword ? "fal fa-eye-slash" : "fal fa-eye"
                        }
                      />
                    </button>
                  </div>
                  <div className="form-group password_icon">
                    <label className="text-black">New Password</label>
                    <input
                      type={newPassword ? "text" : "password"}
                      className="form-control"
                      name="newPassword"
                      placeholder="Password"
                      value={input.newPassword}
                      onChange={onInputChange}
                      onBlur={validateInput}
                      required
                    ></input>
                    {error.newPassword && (
                      <span style={{ color: "red" }} className="err">
                        {error.newPassword}
                      </span>
                    )}

                    <button
                      type="button"
                      className="button"
                      onClick={toggleNewPassword}
                    >
                      <i
                        className={
                          newPassword ? "fal fa-eye-slash" : "fal fa-eye"
                        }
                      />
                    </button>
                  </div>
                  <div className="form-group password_icon">
                    <label className="text-black">Confirm Password</label>
                    <input
                      type={confirmPassword ? "text" : "password"}
                      className="form-control"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      value={input.confirmPassword}
                      onChange={onInputChange}
                      onBlur={validateInput}
                      required
                    ></input>
                    {error.confirmPassword && (
                      <span style={{ color: "red" }} className="err">
                        {error.confirmPassword}
                      </span>
                    )}
                    <button
                      type="button"
                      className="button"
                      onClick={toggleConfirmPassword}
                    >
                      <i
                        className={
                          confirmPassword ? "fal fa-eye-slash" : "fal fa-eye"
                        }
                      />
                    </button>
                  </div>
                  <div className="form-group text-center mt-4">
                    <button
                      type="button"
                      onClick={() => handleDataSubmit()}
                      className="btn btn-warning w-50"
                    >
                      Update <i className="fal fa-long-arrow-right" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </Row>
          {/* Content Box */}
        </div>
        <div
          className="sidebar-overlay"
          id="sidebar-overlay"
          onClick={toggleHamburger}
        />
      </main>
    </Fragment>
  );
};

export default ChangePasswordForm;

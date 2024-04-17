import { Container } from "react-bootstrap";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "constants/constants";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { LoggedOut } from "redux/actions/authActions";


const Header = (props) => {
  const dispatch = useDispatch();
  const [seekerId, setSeekerId] = useState("");
  const [accessToken, setaccessToken] = useState("");
  const [showSidebar, setShowSidebar] = useState(false); // State to control sidebar visibility
  const { showButton } = props;
  const auth = useSelector(({ AuthReducer }) => AuthReducer);
  const router = useRouter();

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleLogout = () => {
    dispatch(LoggedOut());
    localStorage.clear();
    window.location.href = "/login";
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const applyKart = localStorage.getItem("applyKart");
      const data = JSON.parse(applyKart);
      setaccessToken(data?.encryptedToken);
      setSeekerId(data?.userId);
    }
    
  }, []);

  const homeClick = () => {
    if (accessToken) {
      router.push("/timeline");
    } else {
      router.push("/login");
    }
  };

  return (
    <div className={"header " + props.styleClass}>
      <Container>
        <div className="header-inner d-flex">
          <div className="logo">
            <a onClick={homeClick} className="d-flex">
              <img
                src={
                  props.logoUrl == "/assets/images/white-logo.svg" ||
                  props.logoUrl == "assets/images/white-logo.svg"
                    ? "/assets/images/white-logo.svg"
                    : "/assets/images/dark-logo.svg"
                }
                className="image-fit-contain"
                alt="Logo"
              />
            </a>
          </div>
          {!props.hideButtons && (
            <span>
              {router.asPath === "/" ||
              router.asPath === "/login" ||
              router.pathname === "/jobs/[id]" ? (
                <>
                  {router.asPath === "/login" ? null : (
                    <>

                  
                      <div className="actions">
                        <Link href="/login" passHref className="">
                          <button
                            type="button"
                            className="btn btn-outline-info me-4 d-none d-sm-block"
                            style={
                              router.pathname === "/jobs/[id]"
                                ? { borderColor: "#000000", color: "#000000" }
                                : {}
                            }
                          >
                            Login
                          </button>
                        </Link>
                        <Link href="/register" passHref className="">
                          <button type="button" className="btn btn-info d-none d-sm-block">
                            Register
                          </button>
                        </Link>
                        <button
                          type="button"
                          className="btn btn-outline-dark ms-1 d-block d-sm-none"
                          onClick={toggleSidebar}
                        >
                          &#9776; 
                        </button>
                      </div>
                    </>
                  )}
                </>
              ) : (
                <>
                  {seekerId && accessToken ? (
                    <>
                      {showButton && (
                        <button
                          type="button"
                          onClick={handleLogout}
                          className="btn btn-info mb-3"
                        >
                          Logout
                        </button>
                      )}
                    </>
                  ) : (
                    <div className="actions">
                      {/* <Link href="/login" passHref>
                        <button
                          type="button"
                          //onClick={loginClick}
                          className="btn btn-outline-info me-4"
                        >
                          Login
                        </button>
                      </Link>
                      <Link href="/register" passHref>
                        <button
                          type="button"
                          //onClick={registerClick}
                          className="btn btn-info"
                        >
                          Register
                        </button>
                      </Link> */}
                    </div>
                  )}
                </>
              )}
            </span>
          )}
        </div>
      </Container>

      {/* Sidebar */}
      {showSidebar && (
        <div className="sidebar headersidebar">

{!props.hideButtons && (
            <span className="d-block d-sm-none">
              {router.asPath === "/" ||
              router.asPath === "/login" ||
              router.pathname === "/jobs/[id]" ? (
                <>
                  {router.asPath === "/login" ? null : (
                    <>
                    <div className="closebutton">
                     <button
                          type="button"
                          className="btn mobileclose" style={{marginRight: "0"}}
                          onClick={toggleSidebar}
                        >
                         &times;
                        </button>
                      </div>
                      <div className="actions">
                        <Link href="/login" passHref>
                          <button
                            type="button"
                            className="btn btn-outline-info"
                            style={
                              router.pathname === "/jobs/[id]"
                                ? { borderColor: "#000000", color: "#000000" }
                                : {}
                            }
                          >
                            Login
                          </button>
                        </Link>
                        <Link href="/register" passHref>
                          <button type="button" className="btn btn-info">
                            Register
                          </button>
                        </Link>
                       
                      </div>
                    </>
                  )}
                </>
              ) : (
                <>
                  {seekerId && accessToken ? (
                    <>
                      {showButton && (
                        <button
                          type="button"
                          onClick={handleLogout}
                          className="btn btn-info mb-3"
                        >
                          Logout
                        </button>
                      )}
                    </>
                  ) : (
                    <div className="actions">
                      {/* <Link href="/login" passHref>
                        <button
                          type="button"
                          //onClick={loginClick}
                          className="btn btn-outline-info me-4"
                        >
                          Login
                        </button>
                      </Link>
                      <Link href="/register" passHref>
                        <button
                          type="button"
                          //onClick={registerClick}
                          className="btn btn-info"
                        >
                          Register
                        </button>
                      </Link> */}
                    </div>
                  )}
                </>
              )}
            </span>
          )}
        
        </div>
      )}
    </div>
  );
};

export default Header;

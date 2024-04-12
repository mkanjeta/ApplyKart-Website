import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Sidebar = ({ hideButtons, seekerId, accessToken, handleLogout }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="hamburger-menu" onClick={toggleSidebar}>
        <div className="icon"></div>
      </div>
      <div className="menu">
        {!hideButtons && (
          <span className="d-block d-sm-none">
            {router.asPath === "/" || router.asPath === "/login" || router.pathname === "/jobs/[id]" ? (
              <>
                {router.asPath === "/login" ? null : (
                  <>
                    <div className="actions">
                      <Link href="/login" passHref>
                        <button
                          type="button"
                          className="btn btn-outline-info mx-2"
                          style={router.pathname === "/jobs/[id]" ? ({borderColor:"#000000", color:"#000000"}) : ({})}
                        >
                          Login
                        </button>
                      </Link>
                      <Link href="/register" passHref>
                        <button
                          type="button"
                          className="btn btn-info"
                        >
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
                    {showButton
                      &&
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="btn btn-info mb-3"
                      >
                        Logout
                      </button>
                    }
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
    </div>
  );
};

export default Sidebar;
import TimelineHeader from "components/shared/timelineHeader";
import axios from "axios";
import { useRouter } from "next/router";
import { Fragment, useState, useEffect } from "react";
export default function BlogsView(props) {
  const db_url = "http://localhost:5500/api/v1";
  const [isLoading, setLoading] = useState(false);
  const [blogData, setBlogData] = useState(null);

  const router = useRouter();
  const { slugName } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${db_url}/blogs?slugName=${slugName}`
        );

        if (response.data.content) {
          setBlogData(response.data.content);
        } else {
          console.log(response);
        }
      } catch (error) {
        console.warn("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    if (slugName) {
      fetchData();
    }
  }, [slugName]);

  return (
    <Fragment>
      <div className="main_wrapper wrapper_style_two">
        <TimelineHeader />
        <div className="terms-condition-container">
          <div className="container">
            <h3 className="text-center faq-ask-que my-3">Blogs</h3>
            <p className="terms-condition-slogen text-center">
              Welcome to ApplyKart!
            </p>
            {isLoading ? (
              <h1>Loading</h1>
            ) : (
              <>
                {!isLoading && !blogData ? (
                  <>No Data Found</>
                ) : (
                  <div className="container">
                    <div className="row">
                      {/* LEFT SECTION VIEW */}
                      <div className="col-md-3">
                        <div className="left-sidebar">
                          <div className="profile-card mdx-sticky"></div>
                        </div>
                      </div>
                      {/* MIDDLE SECTION VIEW */}
                      <div className="col-md-6">
                        <div
                          id="html-canvas"
                          dangerouslySetInnerHTML={{ __html: blogData }}
                        ></div>
                      </div>

                      {/*   RIGHT SECTION VIEW */}
                      <div className="col-md-3 text-left mylist forwidth">
                        <div className="blog-sidebar">
                          <h4>GET A CALLBACK</h4>
                          <form
                            role="form"
                            name="forenquiry3"
                            id="forenquiry3"
                            noValidate="novalidate"
                          >
                            <input
                              type="text"
                              placeholder="YOUR NAME"
                              name="Name"
                              id="Name"
                              required=""
                              aria-required="true"
                            />
                            <input
                              type="text"
                              placeholder="YOUR EMAIL"
                              name="Email"
                              id="email"
                              required=""
                              aria-required="true"
                            />
                            <input
                              type="tel"
                              placeholder="MOBILE NO."
                              name="Phoneno"
                              id="phoneno"
                              required=""
                              aria-required="true"
                            />
                            <select
                              name="courseselect"
                              id="courseselect"
                              className="valid"
                              aria-invalid="false"
                            >
                              <option>SELECT COURSE</option>
                              <option>PTE</option>
                              <option>NAATI CCL</option>
                              <option>IELTS</option>
                            </select>

                            <select
                              name="branchselect"
                              id="branchselect"
                              className="valid"
                              aria-invalid="false"
                            >
                              <option>SELECT BRANCH</option>
                              <option>MELBOURNE</option>
                              <option>CLAYTON</option>
                              <option>TRUGANINA</option>
                            </select>

                            <input
                              type="submit"
                              className="btnsubmit"
                              id="btn_enq3"
                              value="Submit"
                            />
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

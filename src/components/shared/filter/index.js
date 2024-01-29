import { useEffect, useState } from "react";
import MultiRangeSlider from "constants/MultiRangeSlider";
import Autocomplete from "react-google-autocomplete";
import { getJobBrowseList } from "redux/actions/jobBrowse";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

const minValueStatic = 0;
const maxValueStatic = 5000;
const Filter = ({
  jobType = [],
  category = [],
  pageNo = 1,
  searchText = "",
  value = "",
  setPageNo,
  experience,
  setExperience
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [minValue, set_minValue] = useState(25);
  const [maxValue, set_maxValue] = useState(75);
  const [cities, setCities] = useState(() => {
    return router?.query?.location ? router?.query?.location : '';
  });
  const [salary, setSalary] = useState(null);
  const [searchJobTitle, setSearchJobTitle] = useState("");
  const [seekerId, setSeekerId] = useState(null);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const { location } = useSelector(({ jobBrowseReducer }) => jobBrowseReducer);

  // console.log("@@#", location);

  useEffect(() => {
    if (location) {
      setCities(location);
    }
  }, [location]);
  const handleInput = (e) => {
    set_minValue(e.minValue);
    set_maxValue(e.maxValue);
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      const applyKart = localStorage.getItem("applyKart");
      if (applyKart) {
        const { userId } = JSON.parse(applyKart);
        setSeekerId(userId);
      }
    }
  }, [dispatch]);

  const workExperience = [
    { id: 0, name: "0 year" },
    { id: 1, name: "1 year" },
    { id: 2, name: "2 year" },
    { id: 3, name: "3 year" },
    { id: 4, name: "4 year" },
    { id: 5, name: "5 year" },
    { id: 6, name: "6 year" },
    { id: 7, name: "7 year" },
    { id: 8, name: "8 year" },
    { id: 9, name: "9 year" },
    { id: 10, name: "10 year" },
  ];
  const salaryPerMonth = [
    { id: 1, name: 10 },
    { id: 2, name: 20 },
    { id: 3, name: 30 },
    { id: 4, name: 40 },
    { id: 5, name: 50 },
  ];

  const handleSubmit = () => {
    console.log("hello")
    const obj = {
      userId: seekerId,
      search: searchJobTitle,
      Experience: experience,
      WorkLocation: cities,
      // minSalary: minValue,
      // maxSalary: maxValue,
      // PerMonth: salary,
      jobType: jobType,
      category: category,
    };
    console.log(obj)
    dispatch(getJobBrowseList(obj));
    setPageNo(1);
  };

  useEffect(() => {
    handleSubmit();
  }, [jobType, category, searchText]);

  return (
    <div className="dashboard_bar-main-filter">
      <div className="row align-items-center my-4">
        <div className="col-md-12">
          <div className="dashboard_bar filter_bar d-block py-3 mr-2 mb-3 filter-header2">
            <div className="row align-items-center justify-content-between">
              <div className="col-xl-3 col-lg-3 col-sm-6">
                <div className="fl_select address-form-control">
                <img src="/assets/images/icon-map.svg" alt="location"/>
                  <Autocomplete
                    apiKey={apiKey}
                    options={{
                      types: ["establishment", "geocode"],
                      fields: ["formatted_address", "geometry", "name"],
                    }}
                    onPlaceSelected={(place) => {
                      setCities(place?.formatted_address);
                    }}
                    onChange={(e) => {
                      setCities(e.target.value);
                    }}
                    defaultValue={cities}
                    name="Work Location"
                    className="form-control"
                    style={{padding:"6px 0px 6px 10px"}}
                  />
                </div>
              </div>
              <div className="col-xl-3 col-lg-3 col-sm-6">
                <div className="input-group fl_select">
                <i className="fas fa-clock" style={{fontSize:"20px"}}></i>
                  <select
                    className="form-select form-select-solid"
                    name="experience"
                    onChange={(e) => {
                      let exp = "";
                      if (e.target.value != 0) {
                        exp = e.target.value
                      }
                      setExperience(exp)
                    }}
                    required
                    style={{ padding: "6px 0px 6px 10px" }}
                  >
                    <option value=''>Experience</option>
                    {workExperience?.map((item) => (
                      <option key={item?.id} id={item?.id} value={item?.id}>
                        {item?.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-xl-3 col-lg-3">
                <div className="fl_select border_none justify-content-end">
                  <img src="/assets/images/icon-search.svg" width={20} height={20} alt="search"/>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search by Job Title"
                      onChange={(e) => setSearchJobTitle(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-3">
                <div className="fl_select border_none justify-content-end">
                  <button
                    type="submit"
                    className="btn btn-warning"
                    onClick={handleSubmit}
                  >
                    Submit <i className="fal fa-long-arrow-right" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Filter;

import fetch from "isomorphic-unfetch";

const fetchData = async (props) => {
  const alldata = [];
  var citywise = "jobs-in-";
  var cityprofessionwise = "-jobs-in-";
  var professionwise = "-jobs";

  let type = props.query.id;
  let page = 1;
  if (props.query.page) {
    page = parseInt(props.query.page);
  }

  if (type.indexOf(cityprofessionwise) !== -1) {
    const cityprofessionparam = type.split(cityprofessionwise);
    // console.log(cityprofessionparam);
    var URL = `https://applykartfapp.azurewebsites.net/api/jobseeker/jobs?pageNo=${page}&pageSize=20&WorkLocation=${cityprofessionparam[1]}&Search=${cityprofessionparam[0]}`;
  } else if (type.indexOf(citywise) !== -1) {
    const cityparam = type.split(citywise);
    // console.log(cityparam);
    var URL = `https://applykartfapp.azurewebsites.net/api/jobseeker/jobs?pageNo=${page}&pageSize=20&WorkLocation=${cityparam[1]}`;
  } else if (type.indexOf(professionwise) !== -1) {
    const professionparam = type.split(professionwise);
    // console.log(professionparam[0]);
    var URL = `https://applykartfapp.azurewebsites.net/api/jobseeker/jobs?pageNo=${page}&pageSize=20&Search=${professionparam[0]}`;
  } else {
    var URL = `https://applykartfapp.azurewebsites.net/api/jobseeker/jobs?pageNo=${page}&pageSize=20&Search=${type}`;
  }
  // console.log("********");
  // console.log(URL);
  const res = await fetch(URL, {
    method: "GET",
    headers: {
      Authorization:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyVHlwZUlkIjoiMiIsInVzZXJJZCI6IjEzIiwibmJmIjoxNjU5MzUxNjkxLCJleHAiOjE2NTk5NTY0OTEsImlhdCI6MTY1OTM1MTY5MSwiaXNzIjoiYXBwbHlrYXJ0IiwiYXVkIjoiYXBwbHlrYXJ0In0.BDyWDPTkrHTuknubaoAKpJ8LzlfA1ldUUYIX2Wukp_U",
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();

  const response = await fetch(
    `https://buraaq.in/my-api/api.php?slug=${type}`,
    {
      method: "GET",
      headers: {
        Authorization:
          "R5cCI6IkpXVCJ9.eyJ1c2VyVHlwZUlkIjoiMiIsInVzZXJJZCI6IjEzIiwibmJmIjoxNjU5MzUxNjkxLCJleHAiOjE2NTk5NTY0OTEsImlhdCI6MTY1OTM1MTY5MSwiaXNzIjoiYXBwbHlrYX",
        "Content-Type": "application/json",
      },
    }
  );

  const metadetailsdata = await response.json();

  const pageurl = { pageurl: type };

  alldata.push(data, metadetailsdata, pageurl);

  return alldata;
};

export default fetchData;

import { baseUrl } from "api/constant";
import { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { SaveFileDataSucess } from "redux/actions/workActions";

export default function FileUpload({
  setState,
  state,
  handleVideoData,
  dataId,
  fileData,
  handleImageData,
}) {
  //console.log("@@@fileData",fileData,dataId)
  const dispatch = useDispatch();
  const [seekerId, setSeekerId] = useState("");
  const [accessToken, setaccessToken] = useState("");
  const [file, setFile] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      const applyKart = localStorage.getItem("applyKart");
      if (applyKart) {
        const { userId, encryptedToken } = JSON.parse(applyKart);
        setaccessToken(encryptedToken);
        setSeekerId(userId);
      }
    }
  }, []);

  async function uploadFile(files) {
    if (!files) return;
    const headers = new Headers({
      "Content-Type": "application/json",
      Authorization: `${accessToken}`,
    });
    const fileName = files;
    // console.log("@@@filename", fileName);

    if (fileData === "video") {
      handleVideoData(files);
      const options = {
        method: "PUT",
        headers: headers,
        body: JSON.stringify({
          User_Id: seekerId,
          Intro_Video_Available: 1,
          Intro_Video_Link: fileName.name,
          //contentType: files.type,
        }),
      };
      const response = await fetch(
        `${baseUrl}/IntroVideo`,
        options
      );
      let result = await response.json();

      const response1 = await fetch(result.data.intro_Video_Link, {
        method: "PUT",
        body: files,
        headers: {
          "Content-Type": files.type,
          "x-ms-blob-type": "BlockBlob",
          "x-ms-blob-content": files.type,
        },
      });

      // console.log("response", response1.url.split("?")[0])
      // dispatch(
      //   SaveFileDataSucess({
      //     fileName: response1.url.split("?")[0],
      //   })
      // );
    } else {
      handleImageData(files);
      dispatch(
        SaveFileDataSucess({
          fileName: fileName,
        })
      );
    }
  }

  return (
    <Fragment>
      <input
        type="file"
        id={dataId}
        name="profileImage"
        // multiple={props.multiple}
        className="custom-file-input"
        onChange={(e) => {
          // getVideoDuration(e.target.files, setFieldValue);
          uploadFile(e.target.files[0]);
        }}
        //accept={props.accept}
      />
    </Fragment>
  );
}

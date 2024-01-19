import { Watch } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="loader blob-loader-bg">
      <div className="bg-blur"></div>
      <div className="loading">
        <span className="blob1 blob"></span>
        <span className="blob2 blob"></span>
        <span className="blob3 blob"></span>
      </div>
    </div>
  );
};
export default Loader;

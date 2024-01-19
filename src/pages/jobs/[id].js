import Layout from "components/Layout/Layout";
import fetchData from "../../Functions/FetchData";
import JobsApi from "components/Layout/JobsApi";
import React, { Component } from "react";

class JobsList extends Component {
  renderContent = () => {
    const { content } = this.props;
    return <JobsApi apps={content} />;
  };

  render() {
    return <Layout>{this.renderContent()}</Layout>;
  }
}

JobsList.getInitialProps = async function (props) {
  const data = await fetchData(props);

  return {
    content: data,
  };
};

export default JobsList;

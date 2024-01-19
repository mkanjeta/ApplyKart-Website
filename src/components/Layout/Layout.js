import { Fragment } from "react";
import Header from "components/shared/header";
import Head from "next/head";
import AppFooter from "components/homepage/AppFooter";

const Layout = (props) => {
  var meta_title = "ApplyKart";
  var meta_keyword = "ApplyKart";
  if (props.children.props.apps[1]) {
    meta_title = props.children.props.apps[1].data.meta_title;
    meta_keyword = props.children.props.apps[1].data.meta_keyword;
  }

  return (
    <Fragment>
      <Head>
        <title>{meta_title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          property="og:image"
          content={"https://applykart.co/assets/images/applykart-logo.png"}
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="description" content={meta_keyword} />
      </Head>
      {props.children}
      <AppFooter />
    </Fragment>
  );
};

export default Layout;

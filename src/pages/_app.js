import App from "next/app";
import { initializeIcons } from "@uifabric/icons";
initializeIcons(undefined, { disableWarnings: true });
import "../../sass/main.scss";
import {Provider} from "react-redux";
import initStore from "../redux/store";
import withRedux from "next-redux-wrapper";

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};

    return { pageProps };
  }

  render() {
    const { Component, pageProps,store } = this.props;
    return (
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
    );
  }
}


export default withRedux(initStore)(MyApp);

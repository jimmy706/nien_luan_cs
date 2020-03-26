import App from "next/app";
import { initializeIcons } from "@uifabric/icons";
initializeIcons(undefined, { disableWarnings: true });
import "../../sass/main.scss";
import {Provider} from "react-redux";
import initStore from "../redux/store";
import withRedux from "next-redux-wrapper";
import {isAuth} from "../helpers/auth";
import jwtDecode from 'jwt-decode';
import {LOGIN_ACTION} from "../constants/action-types";

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};

    return { pageProps };
  }

  componentDidMount() {
    // TODO: Handle jwt that store in localStorage
    const {store} = this.props;
    if(isAuth()) {
      const token = JSON.parse(localStorage.getItem("jwtToken")).token;
      const user = jwtDecode(token);
      store.dispatch({
        type: LOGIN_ACTION,
        payload: {user}
      });
    }
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

import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { Stylesheet, InjectionMode, resetIds } from "office-ui-fabric-react";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const { renderPage } = ctx;
    const stylesheet = Stylesheet.getInstance();
    stylesheet.setConfig({
      injectionMode: InjectionMode.none,
      namespace: "server",
    });
    stylesheet.reset();
    resetIds();

    // const initialProps = await Document.getInitialProps(ctx);
    // return { ...initialProps }
    const page = renderPage((App) => (props) => <App {...props} />);

    return { ...page, styleTags: stylesheet.getRules(true) };
  }

  render() {
    return (
      <Html>
        <Head>
          <script
            src="https://apis.google.com/js/platform.js?onload=onLoadCallback"
            async
            defer
          />
          <style
            type="text/css"
            dangerouslySetInnerHTML={{ __html: this.props.styleTags }}
          />
          <meta
            name="google-signin-client_id"
            content="811793049599-q4fa97rb0idqv4gom75g25hqbmhsn97k.apps.googleusercontent.com"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

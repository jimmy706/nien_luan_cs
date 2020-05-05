import React from 'react';
import Document ,{ Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document{
    static async getInitialProps (ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps }
    };

    render() {
        return (
            <Html>
                <Head>
                    <script src="https://apis.google.com/js/platform.js?onload=onLoadCallback" async defer/>
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
        )
    }
}

export default MyDocument;

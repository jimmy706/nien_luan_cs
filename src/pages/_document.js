import React from 'react';
import { Html, Head, Main, NextScript } from 'next/document';

function Document() {
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

Document.getInitialProps = async function(ctx)  {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
};

export default Document;

import appConfig from '../config.json';

function GlobalStyle() {
    return (
        <style global jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          list-style: none;
        }
        /* App fit Height */ 
        html, body, #__next {
          min-height: 100vh;
          display: flex;
          flex: 1;
        }
        #__next {
          flex: 1;
        }
        #__next > * {
          flex: 1;
        }

        ::-webkit-scrollbar {
          width: 12px;               /* width of the entire scrollbar */
        }

        ::-webkit-scrollbar-track {
          background: ${appConfig.theme.colors.neutrals["700"]};        /* color of the tracking area */
        }

        ::-webkit-scrollbar-thumb {
          background-color: ${appConfig.theme.colors.neutrals["900"]};    /* color of the scroll thumb */
          border-radius: 24px;       /* roundness of the scroll thumb */
        }
        /* ./App fit Height */ 
      `}</style>
    );
}

export default function App({ Component, pageProps }) {
    return (
        <>
            <GlobalStyle />
            <Component {...pageProps} />
        </>
    );
}
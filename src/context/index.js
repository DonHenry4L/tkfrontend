import React from "react";
// import { AuthProvider } from "./AuthProvider";
import AuthProvider from "./AuthProvider";
import NotificationProvider from "./NotificationProvider";
import ThemeProvider from "./ThemeProvider";
// import SearchProvider from "./SearchProvider";
import { CookiesProvider } from "react-cookie";
import { Provider } from "react-redux";
import store from "../component/messenger/store/index.js";
import { PostProvider } from "./post";
import { MediaProvider } from "./Media";

export default function ContextProviders({ children }) {
  return (
    <NotificationProvider>
      {/* <SearchProvider> */}
      <PostProvider>
        <MediaProvider>
          {/* <MoviesProvider> */}
          <Provider store={store}>
            <AuthProvider>
              <ThemeProvider>
                <CookiesProvider>{children}</CookiesProvider>
              </ThemeProvider>
            </AuthProvider>
          </Provider>
          {/* </MoviesProvider> */}
        </MediaProvider>
      </PostProvider>
      {/* </SearchProvider> */}
    </NotificationProvider>
  );
}

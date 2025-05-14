import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { Provider } from "react-redux";
import store from "@/store/index";

import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

export let persistor = persistStore(store); // 새로고침, 종료해도 지속될 store 생성

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}

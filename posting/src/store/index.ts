import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// export default configureStore({
//   reducer: { user: userSlice },
//   //   reducer: { user: userSlice.reducer },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({ serializableCheck: false }),
// });

const reducers = combineReducers({
  // 여러 리듀서를 합침
  user: userSlice,
});

const persistConfig = {
  key: "root", // reducer의 어느 지점에서부터 데이터를 저장할 건지
  storage, // 저장할 곳. 또는 sessionStorage
  whitelist: ["user"], // 포함할 것 지정
  // blacklist: 제외할 것 지정
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }), // 직렬화 가능한 값을 체크하는 미들웨어를 사용하지 않는다.
  //serializable == 직렬화 : OBJECT -> STRING 으로 변환
  //리덕스는 직렬화 되지 않은 값들은 에러로 처리하기 때문에 serializableCheck를 ignored 한다.(false)
});

export default store;

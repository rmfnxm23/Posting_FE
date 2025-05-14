// 전체에서 공유되는 상태를 저장하는 store(중앙 저장소)
// 상태를 논리적으로 나누어 관리하는 slice(작은 저장소)
// 상태 변경을 요청하는 명령(action)
// 상태를 업데이트하는 로직을 실행(reducer)

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// interface StateType {
//   // state 타입 정의
//   id: string;
//   email: string;
//   nickname: string;
//   name: string;
//   phone: string;
// }
interface ActionType {
  // action 타입 정의
  id: string;
  email: string;
  nickname: string;
  name: string;
  phone: string;
}

export const userSlice = createSlice({
  name: "user", // slice 이름 // 상태 변화 함수(reducer)를 만들고 실행(action)할 때, reducer의 이름을 호출
  initialState: {
    // 초기값 설정
    id: "",
    email: "",
    nickname: "",
    name: "",
    phone: "",
  },
  reducers: {
    // 상태 변경을 위한 함수
    // 로그인 액션: 유저 정보 저장
    // state : 함수에서 위(initialState)에 선언한 변수들에 접근하기 위한 객체 이름
    // action : 외부에서 reducer 내에 정의된 함수를 호출하면서 전달해 준 전달인수를 받는 매개변수
    loginAction: (state, action: PayloadAction<ActionType>) => {
      // 타입을 없애도 작동 되지만 문제가 생길수도 있으니 일단 작성해둠
      state.id = action.payload.id; // payload 를 거쳐서 감
      state.email = action.payload.email;
      state.nickname = action.payload.nickname;
      state.name = action.payload.name;
      state.phone = action.payload.phone;
    },
    // 로그아웃 액션
    logoutAction: (state) => {
      state.id = "";
      state.email = "";
      state.nickname = "";
      state.name = "";
      state.phone = "";
      // initialState,
    },
  },
});

//action, reducer 내보내기
export const { loginAction, logoutAction } = userSlice.actions;
export default userSlice.reducer;
// userSlice로 내보낼 시 index.ts에서  user: userSlice.reducer
// userSlice.reducer로 내보낼 시 index.ts에서  user: userSlice로 해야 에러가 나지 않음

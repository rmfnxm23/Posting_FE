import api from "@/util/api";
import { passCheckValidation, passValidation } from "@/util/validation";
import { useFormik } from "formik";
import { useState } from "react";
import { FindPwStyled } from "./styled";
import clsx from "clsx";

const FindPwPage = () => {
  const [userEmail, setUserEmail] = useState(); // 조회한 이메일
  const [notFound, setNotFound] = useState(""); // 등록된 이메일이 없을 때 메세지 관리

  const [passError, setPassError] = useState(""); // 비밀번호 유효성 상태 관리 메세지
  const [passCheckError, setPassCheckError] = useState(""); // 비밀번호 확인 유효성 상태 관리 메세지

  // 버튼 비활성화 / 활성화 조건 boolean 관리 (비밀번호 변경)
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordCheck, setIsPasswordCheck] = useState(false);

  // 비밀번호 찾기 버튼 (이메일 조회)
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: async (values) => {
      const email = values.email;
      try {
        const res = await api.post("/user/find/pw", { email });

        if (res.data.Message) {
          return setNotFound(res.data.Message);
        }

        if (res.data.success) {
          // setUserEmail(res.data.userId);

          setUserEmail(res.data.userId.email);
          console.log(res.data.userId.email);
        }
      } catch (err) {
        console.error(err);
      }
    },
  });

  // 비밀번호 변경 버튼 (새 비밀번호 저장)
  const formik2 = useFormik({
    initialValues: {
      password: "",
      passwordCheck: "",
    },
    onSubmit: async (values) => {
      const email = userEmail;
      const password = values.password;
      console.log(password, "????????????");
      console.log(email);

      try {
        const res = await api.put("/user/change/pw", { email, password });

        // if (res.data.Message) {
        //   return setNotFound(res.data.Message);
        // }
        // return;
        if (res.data.success === "true") {
          alert("goal!!!!!!!!!!!!");
        }
      } catch (err) {
        console.error(err);
      }
    },
  });
  return (
    <FindPwStyled className={clsx("findpw-wrap")}>
      <div className="findpw-container">
        <h2>비밀번호 찾기</h2>
        <form onSubmit={formik.handleSubmit}>
          <input
            type="text"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          <button>찾기</button>
        </form>
        {userEmail ? (
          <div>
            <h2>비밀번호 변경</h2>
            <form onSubmit={formik2.handleSubmit}>
              <input
                type="password"
                name="password"
                value={formik2.values.password}
                // onChange={formik.handleChange}
                onChange={(e) => {
                  formik2.handleChange(e);
                  passValidation(e.target.value, setPassError, setIsPassword); // 입력할 때마다 유효성 검사
                }}
                placeholder="새 비밀번호"
                required
              />
              {/* {formik.errors.password && <p>{formik.errors.password}</p>} */}
              <p className="error-message">{passError}</p>

              {/* 비밀번호 확인 */}

              <input
                type="password"
                name="passwordCheck"
                value={formik2.values.passwordCheck}
                onChange={(e) => {
                  formik2.handleChange(e);
                  passCheckValidation(
                    e.target.value,
                    formik2.values.password,
                    setPassCheckError,
                    setIsPasswordCheck
                  );
                }}
                placeholder="새 비밀번호 확인"
                required
              />
              <p className="error-message">{passCheckError}</p>

              <button>변경하기</button>
            </form>
          </div>
        ) : (
          <div style={{ color: "red" }}>{notFound}</div>
        )}
      </div>
    </FindPwStyled>
  );
};

export default FindPwPage;

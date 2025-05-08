import api from "@/util/api";
import { emailValidation, passValidation } from "@/util/validation";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useState } from "react";
import { LoginStyled } from "./styled";
import clsx from "clsx";
// import { Input } from "antd";

const LoginPage = () => {
  const router = useRouter();

  const [loginError, setLoginError] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    // validate: (emailValidation: any, passValidation: any) => {},
    onSubmit: async (values) => {
      try {
        const data = { email: values.email, password: values.password };

        if (!data.email || !data.password) {
          setLoginError("아이디 또는 비밀번호를 입력해주세요.");
        }

        const res = await api.post("/user/login", data, {
          withCredentials: true, // 요청에 자동으로 쿠키가 담겨서 보냄. 또한, 서버로부터 오는 쿠키를 받기 위해서도 이 설정은 꼭 필요! (서버에서도 credentials 설정 필요)
        });

        if (res.data.success === false) {
          setLoginError(res.data.Message);
        }

        if (res.data.token) {
          console.log(res.data.token);
          const accessToken = res.data.token;

          // 토큰을 쿠키에 저장
          Cookies.set("accessToken", accessToken, {
            expires: 7, // 쿠키 만료일 (일 단위)
            // path: "/", // 쿠키가 적용될 경로 (기본값은 현재 웹사이트 경로)
            // secure: true, // HTTPS 통신 시에만 쿠키가 전송됨
            // httpOnly: true, // 자바스크립트로 접근할 수 없도록 설정 // 쿠키 저장 안됨
            // maxAge: 60 * 60 * 24 * 7, // 7일
            // sameSite: "strict",
          });

          // Cookies.set("refreshToken", refreshToken, {
          //   httpOnly: true,
          //   secure: process.env.NODE_ENV === "production",
          //   sameSite: "strict",
          //   maxAge: refresh_token_expires_in,
          //   path: "/",
          // });

          alert("login good");
          router.push("/");
        }
      } catch (err: any) {
        console.error(err);
      }
    },
  });

  return (
    <LoginStyled className={clsx("login-wrap")}>
      <div className="login-container">
        <h2>로그인</h2>
        <form onSubmit={formik.handleSubmit} className="form-box">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: 300,
              gap: 10,
            }}
          >
            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={(e) => {
                formik.handleChange(e);
                emailValidation;
                setLoginError("");
              }}
              //   required
            />
            <input
              type="password"
              name="password"
              value={formik.values.password}
              onChange={(e) => {
                formik.handleChange(e);
                passValidation;
                setLoginError("");
              }}
              //   required
            />
            <div
              className="login-moveUrl"
              style={{ display: "flex", justifyContent: "end" }}
            >
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <span
                  onClick={() => {
                    router.push("/find/id");
                  }}
                >
                  id찾기
                </span>
                /
                <span
                  onClick={() => {
                    router.push("/find/pw");
                  }}
                >
                  pw찾기
                </span>
              </div>
            </div>
            <button type="submit">로그인</button>
            <p style={{ color: "red", fontSize: 12 }}>{loginError}</p>

            <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "center",
                gap: 10,
              }}
            >
              <p>아직 계정이 없으신가요?</p>
              <p
                onClick={() => {
                  router.push("/signup");
                }}
              >
                회원가입
              </p>
            </div>
          </div>
        </form>
      </div>
    </LoginStyled>
  );
};

export default LoginPage;

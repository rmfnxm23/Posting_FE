import api from "@/util/api";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
// import { Input } from "antd";

const LoginPage = () => {
  const router = useRouter();

  const [loginError, setLoginError] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        const data = { email: values.email, password: values.password };
        if (!data.email || !data.password) {
          setLoginError("아이디 또는 비밀번호를 입력해주세요.");
          return;
        }
        const res = await api.post("/user/login", data, {
          //   withCredentials: true,
        });
        console.log(res, "뭐가 왔니");
        if (res.data.token) {
          alert("login success");
        } else {
          alert(res.data.Message);
        }
      } catch (err) {
        console.error(err);
      }
    },
  });

  return (
    <>
      <div>
        <h2>로그인</h2>
        <form onSubmit={formik.handleSubmit}>
          <div style={{ display: "flex", flexDirection: "column", width: 300 }}>
            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              //   required
            />
            <input
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              //   required
            />
            <div
              className="login-moveUrl"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div>
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
              <span
                onClick={() => {
                  router.push("/signup");
                }}
              >
                회원가입
              </span>
            </div>
            <button type="submit">로그인</button>
            <p>{loginError}</p>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginPage;

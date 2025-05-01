import { useFormik } from "formik";
import { SignupStyled } from "./styled";
import { useState } from "react";
import axios from "axios";
import api from "@/util/api";
import {
  emailValidation,
  formatPhone,
  nameValidation,
  nicknameValidation,
  passCheckValidation,
  passValidation,
  phoneValidation,
} from "@/util/validation"; // 유효성 검사

const SignupPage = () => {
  //   const [email, setEmail] = useState("");
  //   const [password, setPassword] = useState("");
  //   const [passwordCheck, setPasswordCheck] = useState("");
  //   const [nickname, setNickname] = useState("");
  //   const [name, setName] = useState("");
  //   const [phone, setPhone] = useState("");

  // 에러 메세지
  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");
  const [passCheckError, setPassCheckError] = useState("");
  const [nicknameError, setNicknameError] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  //   const validate = (values: signForm) => {
  //     const errors: any = {};
  //     // 아이디(이메일)
  //     if (!values.email) {
  //       errors.email = "이메일을 입력해주세요.";
  //     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
  //       errors.email = "유효하지 않은 이메일 형식입니다.";
  //     }

  //     // 비밀번호
  //     const pwRegex =
  //       /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()])[a-zA-Z\d!@#$%^&*()]{8,16}$/;
  //     if (!values.password) {
  //       errors.password = "비밀번호를 입력해주세요.";
  //     } else if (!pwRegex.test(values.password)) {
  //       errors.password =
  //         "비밀번호는 8자 이상 16자이하의 대소문자, 숫자, 특수문자가 포함되어야 합니다.";
  //     }

  //     // 비밀번호 확인
  //     if (!values.passwordCheck) {
  //       errors.passwordCheck = "비밀번호를 확인해주세요.";
  //     } else if (values.password !== values.passwordCheck) {
  //       errors.passwordCheck = "비밀번호가 일치하지 않습니다.";
  //     }

  //     return errors;
  //   };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordCheck: "",
      nickname: "",
      name: "",
      phone: "",
    },

    // validate,
    // validate: (values) => {
    //   const errors: any = {};
    //   if (!values.email) {
    //     errors.email = "이메일을 입력해주세요.";
    //   } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    //     errors.email = "유효하지 않은 이메일 형식입니다.";
    //   }

    //   const pwRegex =
    //     /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()])[a-zA-Z\d!@#$%^&*()]{8,16}$/;
    //   if (!values.password) {
    //     errors.password = "비밀번호를 입력해주세요.";
    //   } else if (!pwRegex.test(values.password)) {
    //     errors.password =
    //       "비밀번호는 8자 이상 16자이하의 대소문자, 숫자, 특수문자가 포함되어야 합니다.";
    //   }

    //   return errors;
    // },

    onSubmit: async (values) => {
      //   console.log("Form submitted", values);
      //   alert(JSON.stringify(values, null, 2));
      //   actions.setSubmitting(false);

      try {
        // const res = await axios.post(
        //   "http://localhost:5000/user/register",
        //   values
        // );
        const res = await api.post("/user/register", values);
        if (res.status === 201) {
          alert("회원가입 완료");
        }
      } catch {
        console.log("실패");
      }
    },
  });
  return (
    <SignupStyled>
      <div>
        <h2>회원가입</h2>
        <form onSubmit={formik.handleSubmit}>
          {/* 아이디 (이메일) */}
          <div>아이디</div>
          <input
            type="email"
            name="email"
            value={formik.values.email}
            // onChange={formik.handleChange}
            onChange={(e) => {
              formik.handleChange(e); // (e) : event를 입력해줘야 onchange가 실행된다.
              emailValidation(e.target.value, setEmailError); // 입력할 때마다 유효성 검사
            }}
            required
          />
          <button>중복검사</button>
          {/* useformik validate */}
          {/* {formik.errors.email && <p>{formik.errors.email}</p>} */}

          {/* usestate errormessage */}
          <p style={{ color: "red", fontSize: "11px" }}>{emailError}</p>

          {/* 비밀번호 */}
          <div>비밀번호</div>
          <input
            type="password"
            name="password"
            value={formik.values.password}
            // onChange={formik.handleChange}
            onChange={(e) => {
              formik.handleChange(e);
              passValidation(e.target.value, setPassError); // 입력할 때마다 유효성 검사
            }}
            required
          />
          {/* {formik.errors.password && <p>{formik.errors.password}</p>} */}
          <p style={{ color: "red", fontSize: "11px" }}>{passError}</p>

          {/* 비밀번호 확인 */}
          <div>비밀번호 확인</div>
          <input
            type="password"
            name="passwordCheck"
            value={formik.values.passwordCheck}
            onChange={(e) => {
              formik.handleChange(e);
              passCheckValidation(
                e.target.value,
                formik.values.password,
                setPassCheckError
              );
            }}
            required
          />
          {/* {formik.errors.passwordCheck && <p>{formik.errors.passwordCheck}</p>} */}
          <p style={{ color: "red", fontSize: "11px" }}>{passCheckError}</p>

          {/* 닉네임 */}
          <div>닉네임</div>
          <input
            type="text"
            name="nickname"
            value={formik.values.nickname}
            // onChange={formik.handleChange}
            onChange={(e) => {
              formik.handleChange(e);
              nicknameValidation(e.target.value, setNicknameError);
            }}
            required
          />
          <p style={{ color: "red", fontSize: "11px" }}>{nicknameError}</p>

          {/* 이름 */}
          <div>이름</div>
          <input
            type="text"
            name="name"
            value={formik.values.name}
            onChange={(e) => {
              formik.handleChange(e);
              nameValidation(e.target.value, setNameError);
            }}
            required
          />
          <p style={{ color: "red", fontSize: "11px" }}>{nameError}</p>

          {/* 휴대폰 번호 */}
          <div>휴대폰 번호</div>
          <input
            type="text"
            name="phone"
            value={formik.values.phone}
            // onChange={(e) => {
            //   formik.handleChange(e);
            //   phoneValidation(e.target.value, setPhoneError);
            // }}
            onChange={(e) => {
              const formatted = formatPhone(e.target.value);
              //   formik.handleChange(e);
              formik.setFieldValue("phone", formatted); // 포맷된 값으로 폼 상태 업데이트
              phoneValidation(formatted, setPhoneError);
            }}
            required
            maxLength={13}
          />
          <p style={{ color: "red", fontSize: "11px" }}>{phoneError}</p>

          <button type="submit">회원가입</button>
        </form>
      </div>
    </SignupStyled>
  );
};

export default SignupPage;

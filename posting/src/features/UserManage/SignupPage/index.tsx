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
import clsx from "clsx";
import { useRouter } from "next/router";

const SignupPage = () => {
  const router = useRouter();

  // 에러 메세지 상태
  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");
  const [passCheckError, setPassCheckError] = useState("");
  const [nicknameError, setNicknameError] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  // 유효성 검사 boolean 상태
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordCheck, setIsPasswordCheck] = useState(false);
  const [isNickname, setIsNickname] = useState(false);
  const [isname, setIsName] = useState(false);
  const [isPhone, setIsPhone] = useState(false);

  // 중복 상태 메세지
  const [emailDuplicate, setEmailDuplicate] = useState("");
  const [nicknameDuplicate, setNicknameDuplicate] = useState("");
  const [phoneDuplicate, setPhoneDuplicate] = useState("");

  // 중복 검사 boolean 상태
  const [isEmailDuplicate, setIsEmailDuplicate] = useState(false);
  const [isNicknameDuplicate, setIsNicknameDuplicate] = useState(false);
  const [isPhoneDuplicate, setIsPhoneDuplicate] = useState(false);

  //   중복확인 - 이메일
  const duplicateCheck = async (email: string) => {
    try {
      if (!email.trim()) {
        setEmailDuplicate("이메일을 입력해주세요."); // ✅ 메시지 출력
        setIsEmailDuplicate(false);
        return;
      }

      const res = await api.post(`/user/check/email`, { email });

      if (res.data.exist) {
        console.log(res, "front");
        // setEmailError("이미 사용된 이메일입니다.");
        setEmailDuplicate("이미 사용된 이메일입니다.");
        setIsEmailDuplicate(false);
      } else {
        // setEmailError("사용 가능한 이메일입니다.");
        setEmailDuplicate("사용 가능한 이메일입니다.");
        setIsEmailDuplicate(true);
      }
    } catch (err) {
      console.error(err, "중복확인 실패");
    }
  };

  //   중복확인 - 닉네임
  const duplicateCheck2 = async (nickname: string) => {
    try {
      if (!nickname.trim()) {
        setNicknameDuplicate("닉네임을 입력해주세요."); // ✅ 메시지 출력
        setIsNicknameDuplicate(false);
        return;
      }

      const res = await api.post(`/user/check/nickname`, { nickname });
      if (res.data.exist) {
        console.log(res, "front");
        setNicknameDuplicate("이미 사용된 닉네임입니다.");
        setIsNicknameDuplicate(false);
      } else {
        setNicknameDuplicate("사용 가능한 닉네임입니다.");
        setIsNicknameDuplicate(true);
      }
    } catch (err) {
      console.error(err, "중복확인 실패");
    }
  };

  //   중복확인 - 휴대폰 번호
  const duplicateCheck3 = async (phone: string) => {
    try {
      if (!phone.trim()) {
        setPhoneDuplicate("번호를 입력해주세요."); // ✅ 메시지 출력
        setIsPhoneDuplicate(false);
        return;
      }

      const res = await api.post(`/user/check/phone`, { phone });

      if (res.data.exist) {
        setPhoneDuplicate("이미 사용된 번호입니다.");
        setIsPhoneDuplicate(false);
      } else {
        setPhoneDuplicate("사용 가능한 번호입니다.");
        setIsPhoneDuplicate(true);
      }
    } catch (err) {
      console.error(err, "중복확인 실패");
    }
  };

  //   비활성화 / 활성화 상태
  const isValid =
    isEmail &&
    isPassword &&
    isPasswordCheck &&
    isNickname &&
    isname &&
    isPhone && // 모든 form의 유효성이 false 일 때
    isEmailDuplicate &&
    isNicknameDuplicate &&
    isPhoneDuplicate; // 중복확인이 false 일 때

  // console.log(isEmail, "isEmail");
  // console.log(isPassword, "isPassword");
  // console.log(isPasswordCheck, "isPasswordCheck");
  // console.log(isNickname, "isNickname");
  // console.log(isname, "isname");
  // console.log(isPhone, "isPhone");
  // console.log(isEmailDuplicate, "isEmailDuplicate");
  // console.log(isNicknameDuplicate, "isNicknameDuplicate");
  // console.log(isPhoneDuplicate, "isPhoneDuplicate");

  // console.log(isValid, "비활성화? 활성화?");

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

    onSubmit: async (values) => {
      try {
        const res = await api.post("/user/register", values);
        if (res.status === 201) {
          alert("회원가입 완료");
          router.push("/login");
        }
      } catch {
        console.log("실패");
      }
    },
  });

  return (
    <SignupStyled className={clsx("signup-wrap")}>
      <div className="signup-container">
        <h2>회원가입</h2>
        <form onSubmit={formik.handleSubmit}>
          {/* 아이디 (이메일) */}
          <div>아이디</div>
          <div style={{ display: "flex" }}>
            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={(e) => {
                formik.handleChange(e); // (e) : event를 입력해줘야 onchange가 실행된다.
                emailValidation(e.target.value, setEmailError, setIsEmail); // 입력할 때마다 유효성 검사
                setEmailDuplicate(""); // 중복 상태 메세지 초기화
              }}
              required
            />
            <button
              type="button"
              onClick={() => {
                duplicateCheck(formik.values.email);
              }}
              className="duplicate-btn"
              style={{ cursor: "pointer" }}
            >
              중복확인
            </button>
          </div>

          {/* useformik validate */}
          {/* {formik.errors.email && <p>{formik.errors.email}</p>} */}

          {/* usestate errormessage */}
          <p className="error-message">{emailError || emailDuplicate}</p>

          {/* 비밀번호 */}
          <div>비밀번호</div>
          <input
            type="password"
            name="password"
            value={formik.values.password}
            onChange={(e) => {
              formik.handleChange(e);
              passValidation(e.target.value, setPassError, setIsPassword); // 입력할 때마다 유효성 검사
            }}
            required
          />
          {/* {formik.errors.password && <p>{formik.errors.password}</p>} */}
          <p className="error-message">{passError}</p>

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
                setPassCheckError,
                setIsPasswordCheck
              );
            }}
            required
          />
          {/* {formik.errors.passwordCheck && <p>{formik.errors.passwordCheck}</p>} */}
          <p className="error-message">{passCheckError}</p>

          {/* 닉네임 */}
          <div>닉네임</div>
          <div style={{ display: "flex" }}>
            <input
              type="text"
              name="nickname"
              value={formik.values.nickname}
              onChange={(e) => {
                formik.handleChange(e);
                nicknameValidation(
                  e.target.value,
                  setNicknameError,
                  setIsNickname
                );
                setNicknameDuplicate("");
              }}
              required
            />
            <button
              type="button"
              onClick={() => {
                duplicateCheck2(formik.values.nickname);
              }}
              className="duplicate-btn"
              style={{ cursor: "pointer" }}
            >
              중복확인
            </button>
          </div>

          <p className="error-message">{nicknameError || nicknameDuplicate}</p>

          {/* 이름 */}
          <div>이름</div>
          <input
            type="text"
            name="name"
            value={formik.values.name}
            onChange={(e) => {
              formik.handleChange(e);
              nameValidation(e.target.value, setNameError, setIsName);
            }}
            required
          />
          <p className="error-message">{nameError}</p>

          {/* 휴대폰 번호 */}
          <div>휴대폰 번호</div>
          <div style={{ display: "flex" }}>
            <input
              type="text"
              name="phone"
              value={formik.values.phone}
              onChange={(e) => {
                const formatted = formatPhone(e.target.value);
                //   formik.handleChange(e); // 입력값을 가공하지 않고, 그대로 저장할 때 사용
                formik.setFieldValue("phone", formatted); // 포맷된 값으로 폼 상태 업데이트 // 가공된 값 입력에 필수, 직접 제어 가능
                // "phone" → 폼 필드 이름 (name 속성 값)
                phoneValidation(formatted, setPhoneError, setIsPhone);
                setPhoneDuplicate(""); // 중복 확인 메세지 초기화
              }}
              required
              maxLength={13}
            />
            <button
              type="button"
              onClick={() => {
                duplicateCheck3(formik.values.phone);
              }}
              className="duplicate-btn"
              style={{ cursor: "pointer" }}
            >
              중복확인
            </button>
          </div>

          <p className="error-message">{phoneError || phoneDuplicate}</p>

          <button type="submit" disabled={!isValid} className="signup-submit">
            회원가입
          </button>
        </form>
      </div>
    </SignupStyled>
  );
};

export default SignupPage;

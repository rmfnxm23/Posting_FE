// 아이디(이메일) 유효성 검사
export const emailValidation = (
  email: string,
  setEmailError: any,
  setIsEmail: any
) => {
  console.log(email, "이메일 input 입력 중");
  const valid = /\S+@\S+\.\S+/.test(email);
  if (!email) {
    setEmailError("이메일을 입력해주세요.");
    setIsEmail(false);
  } else if (!valid) {
    setEmailError("유효한 이메일이 아닙니다.");
    setIsEmail(false);
  } else {
    setEmailError("");
    setIsEmail(true);
  }
};

// 비밀번호 유효성 검사
export const passValidation = (
  password: string,
  setPassError: any,
  setIsPassword: any
) => {
  const valid =
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()])[a-zA-Z\d!@#$%^&*()]{8,16}$/;
  if (!password) {
    setPassError("비밀번호를 입력해주세요.");
    setIsPassword(false);
  } else if (!valid.test(password)) {
    setPassError(
      "비밀번호는 8자 이상 16자이하의 대소문자, 숫자, 특수문자가 포함되어야 합니다."
    );
    setIsPassword(false);
  } else {
    setPassError("");
    setIsPassword(true);
  }
};

// 비밀번호 확인 유효성 검사
export const passCheckValidation = (
  password: string,
  passwordCheck: string,
  setPassCheckError: any,
  setIsPasswordCheck: any
) => {
  if (!passwordCheck) {
    setPassCheckError("비밀번호를 확인해주세요.");
    setIsPasswordCheck(false);
  } else if (password !== passwordCheck) {
    setPassCheckError("비밀번호가 일치하지 않습니다.");
    setIsPasswordCheck(false);
  } else {
    setPassCheckError("");
    setIsPasswordCheck(true);
  }
};

// 닉네임 유효성 검사
export const nicknameValidation = (
  nickname: string,
  setNicknameError: any,
  setIsNickname: any
) => {
  if (!nickname) {
    setNicknameError("닉네임을 입력해주세요.");
    setIsNickname(false);
  } else if (nickname.length > 12) {
    setNicknameError("닉네임은 12자 이하여야 합니다.");
    setIsNickname(false);
  } else {
    setNicknameError("");
    setIsNickname(true);
  }
};

// 이름 유효성 검사
export const nameValidation = (
  name: string,
  setNameError: any,
  setIsName: any
) => {
  if (!name) {
    setNameError("이름을 입력해주세요.");
    setIsName(false);
  } else {
    setNameError("");
    setIsName(true);
  }
};

// 휴대폰 번호 유효성 검사
export const phoneValidation = (
  phone: string,
  setPhoneError: any,
  setIsPhone: any
) => {
  const regex = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
  if (!phone) {
    setPhoneError("번호를 입력해주세요.");
    setIsPhone(false);
  } else if (!regex.test(phone)) {
    setPhoneError("올바른 번호가 아닙니다.");
    setIsPhone(false);
  } else {
    setPhoneError("");
    setIsPhone(true);
  }
};

// 휴대폰 번호 자동 하이픈(-) 생성
export const formatPhone = (phone?: any) => {
  let phoneNumber = phone.replace(/[^\d]/g, "");
  let formattedPhone = ""; // 전역변수로 설정한 뒤 조건에 맞는 값이 저장되게 함.

  // 길이가 4보닥 크고 7보다 작을때
  if (phoneNumber.length >= 4 && phoneNumber.length <= 7) {
    formattedPhone = phoneNumber.slice(0, 3) + "-" + phoneNumber.slice(3);
  } else if (phoneNumber.length >= 8) {
    // 길이가 8보다 클 때
    formattedPhone =
      phoneNumber.slice(0, 3) +
      "-" +
      phoneNumber.slice(3, 7) +
      "-" +
      phoneNumber.slice(7);
  } else {
    formattedPhone = phoneNumber; // 3자리 이하일 때
  }

  return formattedPhone; // 여기에 조건에 맞는 전화번호를 반환
};

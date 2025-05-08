import api from "@/util/api";
import { formatPhone, phoneValidation } from "@/util/validation";
import { useFormik } from "formik";
import { useState } from "react";
import { FindIdStyled } from "./styled";
import clsx from "clsx";

const FindIdPage = () => {
  const [findId, setFindId] = useState<any>(null); // 일치하는 폰번호의 이메일
  // const [findName, setFindName] = useState(null);
  const [findIdMessage, setFindIdMessage] = useState(false); // 데이터 없을때나 빈값일 때 메세지

  const formik = useFormik({
    initialValues: {
      phone: "",
    },
    onSubmit: async (values) => {
      const phone = values.phone;
      // console.log()
      try {
        const res = await api.post("/user/find/id", { phone });
        // if (res.data) {
        //   console.log(res.data);
        //   // setUserEmail(res.data.email);
        //   // setUserName(res.data.name);
        //   setFindId(res.data);
        // }
        // if (res.data) {
        //   setFindId(res.data.email);
        //   setNotFound(false);
        // } else {
        //   setFindId(null);
        //   setNotFound(true);
        // }

        if (res.data.exists) {
          setFindIdMessage(res.data.Message);
          // console.log(res.data.Message);
          setFindId("");
        } else {
          // setFindId(res.data.data.email);
          // setFindName(res.data.data.name);
          // alert("아이디 찾기 성공");
          setFindId(res.data.userPhone.email);
          console.log();
          // setFindName(res.data.userPhone.name);
          // console.log(res.data.data.name);
          // setFindIdMessage();

          console.log(res.data.userPhone, "2");
          console.log(res.data.userPhone.email, "3");
          console.log(res.data.userPhone.name, "4");
          console.log(formik.values.phone, "------------");
        }
      } catch (err) {
        console.error(err);
      }
    },
  });

  return (
    <FindIdStyled className={clsx("findid-wrap")}>
      <div className="findid-container">
        <h2>아이디 찾기</h2>
        <form onSubmit={formik.handleSubmit}>
          <input
            type="text"
            name="phone"
            value={formik.values.phone}
            onChange={(e) => {
              const formatted = formatPhone(e.target.value);
              formik.setFieldValue("phone", formatted);
            }}
            maxLength={13}
          />
          <button type="submit">아이디 찾기</button>
          {findId ? (
            <div>
              아이디는 <strong>{findId}</strong>입니다.
            </div>
          ) : (
            <div style={{ color: "red" }}>{findIdMessage}</div>
          )}
        </form>
      </div>
    </FindIdStyled>
  );
};

export default FindIdPage;

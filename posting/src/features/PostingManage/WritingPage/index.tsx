import clsx from "clsx";
import { WritingStyled } from "./styled";
import { useFormik } from "formik";
import api from "@/util/api";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { message, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";

interface props {
  id: number;
  category: string;
}

const WritingPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const loginUser = useSelector((state: any) => state.user);
  console.log(loginUser, "writingpage");

  const [messageApi, contextHolder] = message.useMessage();

  const [categories, setCategories] = useState<props[]>([]); // 카테고리 저장

  useEffect(() => {
    if (!loginUser.id) {
      alert("로그인이 필요합니다.");
      // messageApi.open({
      //   type: "warning",
      //   content: "로그인이 필요합니다.",
      // });

      router.push("/login");
    }
  }, []);

  // 리액트의 생명주기 : 컴포넌트가 랜더링이 시작되는 지점부터 끝나는 지점을 말함
  // useEffect(function, deps)
  // function: 실행하고자 하는 함수
  // deps: 배열 형태. function을 실행시킬 조건. 컴포넌트가 mount될 때, unmount될때, 업데이트 될 때 useEffect 실행
  useEffect(() => {
    const getCategory = async () => {
      try {
        const res = await api.get("/category");
        // console.log(res.data.data);
        // console.log(res.data.data);
        const data = res.data.data;

        // const formattedCategory = res.data.map(
        //   (category: { id: number; category: string }) => ({
        //     label: category.category,
        //     value: category.id,
        //   })
        // );
        // setCategories(formattedCategory);
        // const formattedCategory = res.data.data.map((x: any) => {
        //   return {
        //     id: x.id,
        //     category: x.category,
        //   };
        // });
        // setCategories(formattedCategory);
        setCategories(data);

        return;
      } catch (err) {
        console.error("카테고리 불러오기 실패: ", err);
      }
    };
    getCategory(); // 함수를 불러서 실행 // 부르지 않으면 코드만 짠거라 실행되지 않음
  }, []); // [] : 맨 처음 렌더링될 때 한 번만 실행 // 없으면 계속 렌더링됨

  //   console.log(categories);

  //   const handleSelect = (value?: any) => {
  //     setSelected(value);
  //   };

  //   console.log(categories, "dsdf");

  const formik = useFormik({
    initialValues: {
      categoryId: "",
      title: "",
      content: "",
    },
    onSubmit: async (values) => {
      const title = values.title;
      const content = values.content;
      const categoryId = values.categoryId;
      //   console.log(values);

      if (title === "" || content === "" || !categoryId) {
        return alert("입력해주세요");
      }

      const data = {
        title,
        content,
        categoryId: Number(categoryId),
        userId: loginUser.id, // 로그인한 유저의 id를 함께 보냄
      };
      console.log(data);
      try {
        const res = await api.post("/post/register", data);

        if (res.data) {
          alert(res.data.message);
          router.push("/");
        }
      } catch (err) {
        console.error(err);
      }
    },
  });

  return (
    <WritingStyled className={clsx("writing-wrap")}>
      <div className="writing-container">
        <h2>게시글 작성</h2>
        <form onSubmit={formik.handleSubmit}>
          {/* <select name="categoryId">
            <option>선택</option>
            {categories.map((x) => {
              <option value={x.id} key={x.id}>
                {x.category}
              </option>;
            })}
          </select> */}
          <select
            name="categoryId"
            value={formik.values.categoryId}
            onChange={formik.handleChange}
          >
            <option value="">카테고리 선택</option>
            {categories.map((x) => (
              <option value={x.id} key={x.id}>
                {x.category}
              </option>
            ))}
          </select>
          {/* <select
            value={selected}
            style={{ width: 120 }}
            onChange={handleSelect}
          ></select> */}

          <input
            type="text"
            name="title"
            placeholder="제목"
            value={formik.values.title}
            onChange={formik.handleChange}
          />
          <input
            type="text"
            name="content"
            placeholder="내용"
            value={formik.values.content}
            onChange={formik.handleChange}
          />
          <button type="submit" style={{ cursor: "pointer" }}>
            저장
          </button>
        </form>
      </div>
    </WritingStyled>
  );
};

export default WritingPage;

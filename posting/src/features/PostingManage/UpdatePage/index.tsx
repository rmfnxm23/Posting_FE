import api from "@/util/api";
// import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface PostProps {
  id: number;
  title?: string;
  content?: string;
  //   createdAt?: string;
  //   updatedAt?: string;
  categoryId: number;
}

interface props {
  id: number;
  category: string;
}

const UpdatePage = () => {
  const router = useRouter();
  const { id } = router.query;

  //   const [data, setData] = useState<PostProps | null>(null);
  const [data, setData] = useState<PostProps>(); // 작성된 내용 가져오기

  const [categories, setCategories] = useState<props[]>([]); // 카테고리 저장

  const [title, setTitle] = useState(""); // 제목 저장
  const [content, setContent] = useState(""); // 내용 저장
  //   const [categoryId, setCategoryId] = useState("");
  const [selected, setSelected] = useState(); // 선택된 카테고리

  // 카테고리 불러오기
  useEffect(() => {
    const getCategory = async () => {
      try {
        const res = await api.get("/category");

        const data = res.data.data;

        setCategories(data);

        return;
      } catch (err) {
        console.error("카테고리 불러오기 실패: ", err);
      }
    };
    getCategory(); // 함수를 불러서 실행 // 부르지 않으면 코드만 짠거라 실행되지 않음
  }, []); // [] : 맨 처음 렌더링될 때 한 번만 실행 // 없으면 계속 렌더링됨

  // 수정할 내용 가져오기
  useEffect(() => {
    const getUpdatePost = async (id: any) => {
      try {
        const res = await api.get(`/post/detail/${id}`);
        // console.log(res.data.data);
        const post = res.data.data;
        setData(post);

        setTitle(post.title);
        setContent(post.content);
        setSelected(post.categoryId);
      } catch (err) {
        console.error(err);
      }
    };
    getUpdatePost(id);
  }, [id]);

  // 호출할 때 값이 안들어오면 typeerror
  if (!data) {
    return <div>loading...</div>;
  }
  //   console.log(data?.title, "123");

  // 수정하기
  const handlesubmit = async (e: any) => {
    e.preventDefault();

    if (title === "" || content === "") {
      return alert("입력해주세요");
    }

    const formdata = {
      //   id: Number(id),
      //   id,
      //   title: data?.title,
      //   content: data?.content,
      //   categoryId: data?.categoryId,
      title,
      content,
      categoryId: selected,
    };

    console.log(formdata);
    // return;
    try {
      const res = await api.post(`/post/update/${id}`, formdata);

      if (res.data) {
        alert(res.data.message);
        router.push("/");
      }
    } catch (err) {
      console.error(err);
    }
  };

  //   const formik = useFormik({
  //     initialValues: {
  //       //   categoryId: "",
  //       title: data?.title,
  //       content: data?.content,
  //     },
  //     onSubmit: (values) => {},
  //   });

  return (
    <>
      <div className="writing-container">
        <h2>게시글 수정</h2>
        <form onSubmit={handlesubmit}>
          {/* <form onSubmit={formik.handleSubmit}> */}
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
            // value={formik.values.categoryId}
            // defaultValue={data?.categoryId}
            value={selected}
            // onChange={formik.handleChange}
            onChange={(e: any) => {
              setSelected(e.target.value);
            }}
          >
            {/* <option defaultValue={data?.categoryId}>{data?.categoryId}</option> */}
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
            // value={formik.values.title}
            // defaultValue={data?.title}
            value={title}
            // onChange={formik.handldssdeChange}
            onChange={(e: any) => {
              setTitle(e.target.value);
            }}
          />
          <input
            type="text"
            name="content"
            placeholder="내용"
            // value={formik.values.content}
            // defaultValue={data?.content}
            value={content}
            // onChange={formik.handleChange}
            onChange={(e: any) => {
              setContent(e.target.value);
            }}
          />
          <button type="submit" style={{ cursor: "pointer" }}>
            수정
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdatePage;

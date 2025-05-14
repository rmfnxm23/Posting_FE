import api from "@/util/api";
import { useRouter } from "next/router";
import { access } from "node:fs";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";

interface PostProps {
  id: number;
  title?: string;
  content?: string;
  createdAt?: string;
  //   updatedAt?: string;
  categoryId: number;
  Category: {
    id: number;
    category: string;
  };
  userId: number;
  // User: {
  user: {
    id: number;
    nickname: string;
  };
}

const DetailPage = () => {
  const router = useRouter();
  const { query } = router;
  const { id } = router.query;

  const dispatch = useDispatch();
  const loginUser = useSelector((state: any) => state.user);

  //   const [data, setData] = useState<[]>([]);
  //   const [data, setData] = useState<PostProps[]>([]);
  const [data, setData] = useState<PostProps>();
  //   const [data, setData] = useState<PostProps | null>(null);

  useEffect(() => {
    if (!id) return;

    console.log("query", query); // {id: '15'} 형태
    console.log(id);

    const getDetailPost = async (id: any) => {
      try {
        const res = await api.get(`/post/detail/${id}`);

        const data = res.data.data;
        console.log(data, "data");
        // console.log(data.User.nickname);
        setData(data);
      } catch (err) {
        console.error(err);
      }
    };
    getDetailPost(id);
  }, [id]); // []으로 맨 처음에만 랜더링하면 새로고침 시 데이터 없음 // [id]가 변경될 때마다 실행

  if (!data) return <div>Loading....</div>;

  // // 유저 검증
  // const userCheck = () => {
  //   const token = Cookies.get("accessToken");
  // };

  // 삭제 버튼
  const deletePost = async (id: any) => {
    try {
      const res = await api.delete(`/post/delete/${id}`);
      if (res.status === 200) {
        alert(res.data.message);
        router.push("/");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div>
        <div>제목: {data.title}</div>
        <div>내용: {data.content}</div>
        <div>작성한 날짜: {data.createdAt}</div>
        <div>{/* 작성자ID: {data.userId}, 작성자: {data.User.nickname} */}</div>
        <div>
          작성자ID: {data.userId}, 작성자: {data.user.nickname}
        </div>
        <div>
          카테고리ID: {data.categoryId}, 카테고리: {data.Category.category}
        </div>
        {loginUser.id === data.userId ? (
          <div>
            <button
              onClick={() => {
                router.push(`/updating/${id}`);
              }}
              style={{ cursor: "pointer" }}
            >
              수정
            </button>
            <button
              onClick={() => {
                deletePost(id);
              }}
              style={{ cursor: "pointer" }}
            >
              삭제
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => {
              router.push("/");
            }}
            style={{ cursor: "pointer", padding: 5 }}
          >
            홈
          </button>
        )}
      </div>
    </>
  );
};

export default DetailPage;

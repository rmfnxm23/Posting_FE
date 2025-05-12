import api from "@/util/api";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface PostProps {
  id: number;
  title?: string;
  content?: string;
  //   createdAT?: string;
  //   updatedAt?: string;
  //   categoryId: number;
}

const DetailPage = () => {
  const router = useRouter();
  const { query } = router;
  const { id } = router.query;

  //   const [data, setData] = useState<[]>([]);
  //   const [data, setData] = useState<PostProps[]>([]);
  const [data, setData] = useState<PostProps>();

  useEffect(() => {
    if (!id) return;

    console.log("query", query); // {id: '15'} 형태
    console.log(id);

    const getDetailPost = async (id: any) => {
      try {
        const res = await api.get(`/post/detail/${id}`);

        const data = res.data.data;
        console.log(data, "data");
        setData(data);
      } catch (err) {
        console.error(err);
      }
    };
    getDetailPost(id);
  }, [id]); // []으로 맨 처음에만 랜더링하면 새로고침 시 데이터 없음 // [id]가 변경될 때마다 실행

  if (!data) return <div>Loading....</div>;

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
        <div>{data.title}</div>
        <div>{data.content}</div>
        <button>수정</button>
        <button onClick={deletePost}>삭제</button>
      </div>
    </>
  );
};

export default DetailPage;

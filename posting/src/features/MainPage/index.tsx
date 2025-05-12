import api from "@/util/api";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface PostProps {
  id: number;
  title?: string;
  //   content?: string;
  //   createdAT?: string;
  //   updatedAt?: string;
  //   categoryId: number;
}

const MainPage = () => {
  const router = useRouter();

  const [posting, setPosting] = useState<PostProps[]>([]); // 객체 타입 형식 중요!! // map은 배열에서 사용가능하기 때문에

  useEffect(() => {
    const getPosting = async () => {
      try {
        const res = await api.get("/post/postAll");
        console.log(res.data.data);
        const data = res.data.data;

        setPosting(data);
      } catch (err) {
        console.error(err);
      }
    };

    getPosting();
  }, []);

  const pageMove = (id: any) => {
    router.push(`/detail/${id}`);
  };

  return (
    <>
      <div
        onClick={() => {
          router.push("/writing");
        }}
      >
        글쓰기
      </div>
      <div
        onClick={() => {
          router.push("/login");
        }}
      >
        로그인
      </div>
      <div>
        <h3>게시글 전체</h3>
        <div>
          {/* {posting.map((x)=>{
                <div></div>
            })} */}
          {posting.map((x) => (
            <div
              key={x.id}
              onClick={() => {
                pageMove(x.id); // query에 id가 올바르게 들어가기 위해서는 x.id를 입력해주어야함
              }}
            >
              {x.title}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MainPage;

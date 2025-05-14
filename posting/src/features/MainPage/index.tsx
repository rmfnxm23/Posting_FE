import api from "@/util/api";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { logoutAction } from "@/store/userSlice";
import { persistor } from "@/pages/_app";
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
  const dispatch = useDispatch();
  const loginUser = useSelector((state: any) => state.user);
  console.log(loginUser, "Mainpage");

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

  // 상세페이지 이동
  const pageMove = (id: any) => {
    router.push(`/detail/${id}`);
  };

  // 로그아웃
  const handleLogout = async () => {
    if (loginUser.id) {
      Cookies.remove("accessToken");
      await persistor.purge(); // 로그아웃 시 redux-persist가 관리하는 모든 상태 초기화
      dispatch(logoutAction());
      alert("로그아웃되었습니다");
      router.push("/");
    } else {
      return;
    }
  };

  return (
    <>
      <div
        onClick={() => {
          router.push("/writing");
        }}
        style={{ cursor: "pointer" }}
      >
        글쓰기
      </div>
      <div
        onClick={() => {
          router.push("/login");
        }}
        style={{ cursor: "pointer" }}
      >
        로그인
      </div>
      <div>
        <h3>게시글 전체</h3>
        <div>
          {posting.map((x) => (
            <div
              key={x.id}
              onClick={() => {
                pageMove(x.id); // query에 id가 올바르게 들어가기 위해서는 x.id를 입력해주어야함
              }}
              style={{ cursor: "pointer" }}
            >
              {x.title}
            </div>
          ))}
        </div>
      </div>
      <div onClick={handleLogout} style={{ cursor: "pointer" }}>
        로그아웃
      </div>
    </>
  );
};

export default MainPage;

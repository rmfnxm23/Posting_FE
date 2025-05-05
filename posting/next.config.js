// 기존 설정 방식 (Next.js 15 이상에서 사용 가능)
// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
//   reactStrictMode: true,
// };

// export default nextConfig;

// Next.js 14 버전으로 다운그레이드하여 ts파일 미지원으로 js파일로 변경에 따른 CommonJs형식의 다음과 같은 설정으로 정의 (TypeScript와 export default 구문 또한 사용 불가)
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // application 내에서 문제가 일어날 수 있는 부분에 대한 경고를 알려주는 기능
  swcMinify: true, // 필요없는 공백이나, 주석을 삭제하여 용량을 줄이고, 해당 스크립트를 해석할 수 없도록 암호화 하는 역할
  compiler: {
    styledComponents: true, // 새로고침 시에도 스타일 적용되게 하는 역할
  },
};

module.exports = nextConfig;

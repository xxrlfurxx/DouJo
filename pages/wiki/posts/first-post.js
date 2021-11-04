import Link from "next/link";

export default function FirstPost() {
  return (
    <>
      <h1>첫 포스트!</h1>
      <h2>
        <Link href="/">
          <a>홈으로 돌아가기</a>
        </Link>
      </h2>
    </>
  )
}
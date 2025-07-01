import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1>Hello World</h1>
      <Link href="/profile">Профиль</Link> <br />
      <Link href="/auth/login">Войти</Link>
    </>
  );
}

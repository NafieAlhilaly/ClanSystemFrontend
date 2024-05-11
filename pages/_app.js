import useLocalStorage from "@/store";
import "@/styles/globals.css";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const { getUserData } = useLocalStorage()
  function checkUserData() {
    if (!getUserData() || !getUserData().username) {
      router.push("/login")
    }
  }
  useEffect(() => {
    checkUserData()
    window.addEventListener('storage', checkUserData);
    return () => {
      window.removeEventListener('storage', checkUserData)
    }
  }, [])
  return <Component {...pageProps} />;
}

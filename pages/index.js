import ClanList from "@/components/ClanList";
import Footer from "@/components/Footer";
import Loading from "@/components/Loading";
import useLocalStorage from "@/store";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
  const [loading, setLoad] = useState(true);
  const [clans, setClans] = useState([])
  const { getUserData } = useLocalStorage()
  const router = useRouter();
  async function getClans(username) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/clan`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": process.env.NEXT_PUBLIC_BACKEND_URL,
        "Authorization": username,
      }
    })
    return await res.json()
  }
  useEffect(() => {
    const userData = getUserData();
    if (userData.clanId) {
      router.push("/clan")
    } else {
      getClans(userData.username).then(res => {
        setClans(res.data);
        setLoad(false)
      })
    }
  }, [])
  return (
    <main>
      <div className="flex justify-center mt-24">
        {loading ? <Loading /> : <div>
          <p className="text-center">You are not part of any Clan, join a clan</p>
          <div className="max-w-lg mt-4">
            <ClanList clans={clans} />
          </div>
        </div>}
      </div>
      <div className="max-w-6xl mt-16">
        <Footer username={getUserData().username ?? " "} />
      </div>
    </main>
  );
}

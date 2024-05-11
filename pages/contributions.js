import useLocalStorage from "@/store";
import { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import Loading from "@/components/Loading";
import StyledButton from "@/components/StyledButton";
import { useRouter } from "next/router";

export default function Contributions() {
    const [loading, setLoad] = useState(true);
    const [clan, setClan] = useState([])
    const { getUserData, setUserData } = useLocalStorage()
    const router = useRouter()
    async function getClanData(clanId) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/clan/${clanId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": process.env.NEXT_PUBLIC_BACKEND_URL,
                "Authorization": getUserData().username,
            }
        })
        return await res.json()
    }
    useEffect(() => {
        const clanId = getUserData().clanId;
        getClanData(clanId).then(res => {
            setClan(res.data);
            setLoad(false);
        })
    }, [])
    return (
        <div>
            {loading ? <Loading /> : <main className="p-9">
                <div className="flex gap-2 items-center justify-center">
                    <p className="text-center">Current contributions for clan </p>
                    <p className="text-2xl font-bold">{clan.name}</p>
                </div>
                <div className="flex justify-center">
                    <ul className="mt-9">
                        {clan.contributions.filter(contribution => contribution.name !== null).map(contribution => <li key={contribution.name}><div className="flex justify-between">
                            <div className="flex gap-2">
                                <p>{contribution.name}</p>
                                <p className="text-small text-red-600">{contribution.joined == 1 ? "" : "(Left the clan)"}</p>
                                <p>{": " + contribution.points}</p>
                            </div>
                        </div></li>)}
                    </ul>
                </div>
                <div className="flex justify-center">
                    <div className="mt-16 w-full max-w-md">
                        <StyledButton text="Close" onClick={() => {
                            router.push("/clan")
                        }} />
                    </div>
                </div>
            </main>}
            <div className="max-w-6xl mt-16">
                <Footer username={getUserData().username ?? " "} />
            </div>
        </div>
    );
}

import Loading from "@/components/Loading";
import StyledButton from "@/components/StyledButton";
import useLocalStorage from "@/store";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { calculateClanPoints } from "@/utils";
import Footer from "@/components/Footer";

export default function Clan() {
    const [loading, setLoad] = useState(true);
    const [clan, setClan] = useState([])
    const { getUserData, setUserData } = useLocalStorage()
    const router = useRouter();
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
    async function leaveClan(clanId) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/clan/leave`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": process.env.NEXT_PUBLIC_BACKEND_URL,
                "Authorization": getUserData().username,
            }
        })
        return await res.json()
    }
    async function addPointsToClan(e) {
        e.preventDefault();
        const points = e.target[0].value;
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/clan/add-points`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": process.env.NEXT_PUBLIC_BACKEND_URL,
                "Authorization": getUserData().username,
            },
            body: JSON.stringify({
                points: points
            })
        })
        return await res.json()
    }
    async function subtractPointsFromClan(e) {
        e.preventDefault();
        const points = e.target[0].value;
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/clan/subtract-points`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": process.env.NEXT_PUBLIC_BACKEND_URL,
                "Authorization": getUserData().username,
            },
            body: JSON.stringify({
                points: points
            })
        })
        return await res.json()
    }
    async function setClanPoints(e) {
        e.preventDefault();
        const points = e.target[0].value;
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/clan/set-points`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": process.env.NEXT_PUBLIC_BACKEND_URL,
                "Authorization": getUserData().username,
            },
            body: JSON.stringify({
                points: points
            })
        })
        return await res.json()
    }
    useEffect(() => {
        const clanId = getUserData().clanId;
        getClanData(clanId).then(res => {
            setClan(res.data);
            setLoad(false);
        })
    }, [loading])
    return (
        <div>
            <main className="p-30 flex justify-center mt-24">
                <div>
                    {loading ? <Loading /> : <div>
                        <div className="flex justify-between">
                            <div className="flex gap-2 items-center">
                                <p>You are a part of </p>
                                <p className="text-2xl font-bold">{clan.name}</p>
                            </div>
                            <StyledButton loading={false} text="Leave" onClick={() => {
                                setLoad(true)
                                leaveClan(getUserData().clanId).then(() => {
                                    setUserData({ username: getUserData().username, clanId: null })
                                    router.push("/")
                                })
                            }} />
                        </div>
                        <div className="flex gap-2">
                            <p className="text-small text-gray-400">Points:</p>
                            <p>{calculateClanPoints(clan.contributions)}</p>
                        </div>
                        <div className="grid grid-cols-12 gap-2 mt-8">
                            <div className="md:col-span-4 col-span-12">
                                <form onSubmit={(e) => {
                                    setLoad(true)
                                    addPointsToClan(e).then(() => {
                                        setLoad(false);
                                    })
                                }}>
                                    <div className="flex justify-center">
                                        <input className="border" type="number" min={0} defaultValue={0} />

                                    </div>
                                    <div className="flex justify-center mt-2">
                                        <StyledButton buttonType="submit" loading={false} text="Add points" onClick={() => { }} />

                                    </div>
                                </form>
                            </div>
                            <div className="md:col-span-4 col-span-12">
                                <form onSubmit={(e) => {
                                    setLoad(true)
                                    subtractPointsFromClan(e).then(() => {
                                        setLoad(false);
                                    })
                                }}>
                                    <div className="flex justify-center">
                                        <input className="border" type="number" min={0} defaultValue={0} />

                                    </div>
                                    <div className="flex justify-center mt-2">
                                        <StyledButton buttonType="submit" loading={false} text="Subtract points" onClick={() => { }} />

                                    </div>
                                </form>
                            </div>
                            <div className="md:col-span-4 col-span-12">
                                <form onSubmit={(e) => {
                                    setLoad(true)
                                    setClanPoints(e).then(() => {
                                        setLoad(false);
                                    })
                                }}>
                                    <div className="flex justify-center">
                                        <input className="border" type="number" min={0} defaultValue={0} />
                                    </div>
                                    <div className="flex justify-center mt-2">
                                        <StyledButton buttonType="submit" loading={false} text="Reset points" onClick={() => { }} />
                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>}
                    <div className="mt-24">
                        <StyledButton loading={false} text="Show contributions" onClick={() => {
                            router.push("/contributions")
                        }} />
                    </div>
                </div>
            </main>
            <div className="max-w-6xl mt-16">
                <Footer username={getUserData().username ?? " "} />
            </div>
        </div>
    );
}

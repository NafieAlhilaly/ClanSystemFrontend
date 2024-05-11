import { useState } from "react"
import Loading from "./Loading";
import { useRouter } from "next/router";
import useLocalStorage from "@/store";
import { calculateClanPoints } from "@/utils";

export default function ClanList({ clans }) {
    const [message, setMessage] = useState({
        text: "",
        color: "red"
    })
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { setUserData, getUserData } = useLocalStorage()
    async function joinClan(clanId) {
        setLoading(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/clan/join/${clanId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": process.env.NEXT_PUBLIC_BACKEND_URL,
                "Authorization": JSON.parse(localStorage.getItem(process.env.NEXT_PUBLIC_TOKENS_STORAGE_NAME)).username,
            }
        })
        setLoading(false);
        return await res.json()
    }
    return (
        <ul className="w-full">
            <p className={`text-small text-${message.color}-700`}>{message.text}</p>
            {
                clans.map(clan => <li key={clan.name} className="pb-3 sm:pb-4 p-3 border w-full">
                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                        <div className="flex-shrink-0">
                            <div className="w-8 h-8 rounded-full bg-gray-300" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xl">
                                {clan.name}
                            </p>
                            <div className="flex gap-3">
                                <p className="text-gray-400">Current points: </p>
                                <p>{calculateClanPoints(clan.contributions)}</p>
                            </div>
                        </div>
                        <div>
                            {loading ?
                                <Loading />
                                : <button onClick={() => {
                                    joinClan(clan.id).then(res => {
                                        setLoading(true)
                                        if (res.error) {
                                            setMessage({ text: res.error, color: "red" })
                                            setTimeout(() => {
                                                setMessage({ text: "", color: "red" })
                                                setLoading(false)
                                            }, 4000)
                                        }
                                        if (res.data) {
                                            setMessage({ text: res.data, color: "green" })
                                            setTimeout(() => {
                                                setMessage({ text: "", color: "red" })
                                                setUserData({ username: getUserData().username, clanId: clan.id })
                                                router.push("/clan")
                                            }, 2000)
                                        }
                                        setTimeout(() => {
                                            setMessage({ text: "", color: "red" })
                                        }, 4000)
                                    })
                                }} type="button" disabled={loading} className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Join</button>}
                        </div>
                    </div>
                </li>)
            }
        </ul>
    )
}
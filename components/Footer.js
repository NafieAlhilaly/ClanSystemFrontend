import { useEffect, useState } from "react"
import StyledButton from "./StyledButton"
import useLocalStorage from "@/store"
import { useRouter } from "next/router";

export default function Footer({ username }) {
    const [userName, setUserName] = useState("")
    const { clearStorage } = useLocalStorage();
    const router = useRouter()
    useEffect(() => {
        setUserName(username)
    }, [username])
    return (<div className="sticky bottom-0 flex justify-end gap-6 items-center">
        <p>Logged in as: {userName}</p>
        <StyledButton text="Logout" onClick={() => {
            clearStorage();
            router.push("/login")
        }} />
    </div>)
}
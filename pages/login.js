import useLocalStorage from "@/store";
import { useRouter } from "next/router";

export default function Login() {
    const router = useRouter()
    const { setUserData } = useLocalStorage()
    function login(e) {
        e.preventDefault();
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/login`, {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": process.env.NEXT_PUBLIC_BACKEND_URL,
            },
            body: JSON.stringify({
                username: e.target[0].value
            })
        }).then(d => {
            if (d.status === 200) {
                d.json().then(res => {
                    setUserData({
                        username: res.name,
                        clanId: res.clanId,
                    })
                    router.push("/")
                })

            }
        })
    }
    return <section>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <form className="space-y-4 md:space-y-6" onSubmit={login}>
                        <div className="grid grid-cols-12">
                        <div className="col-span-4">
                        <p className="text-small text-white">
                        Enter username
                    </p>
                        </div>
                        <div className="col-span-8">
                            <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                        </div>
                        </div>
                        <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Login</button>
                    </form>
                </div>
            </div>
        </div>
    </section>
}
export default function useLocalStorage() {
    const STORAGE_KEY_NAME = process.env.NEXT_PUBLIC_TOKENS_STORAGE_NAME;
    function setUserData(value) {
        try {
            window.localStorage.setItem(STORAGE_KEY_NAME, JSON.stringify(value))
        } catch (error) {
            console.log(error)
        }
    }

    function getUserData() {
        let userDataObj = {
            username: null,
            clanId: null
        }
        try {
            const userDataFromLocalStorage = window.localStorage.getItem(STORAGE_KEY_NAME);
            if (userDataFromLocalStorage !== null) {
                const parsedData = JSON.parse(userDataFromLocalStorage)
                userDataObj.username = parsedData.username;
                userDataObj.clanId = parsedData.clanId
            }

            return userDataObj;
        } catch (error) {
            console.log(error)
            return userDataObj;
        }
    }

    function clearStorage(){
        window.localStorage.removeItem(STORAGE_KEY_NAME);
    }

    return { setUserData, getUserData, clearStorage }
}
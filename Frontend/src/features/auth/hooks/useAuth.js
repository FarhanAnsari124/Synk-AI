import { useContext ,useEffect} from "react";
import { AuthContext } from "../auth.context"
import {login ,register,logout,getMe} from "../services/auth.api";

export const useAuth = () => {
    const context = useContext(AuthContext)
    const { user, setUser, loading, setLoading } = context
    const handleLogin = async ({email, password}) => {
        setLoading(true)
        try {
            const userData = await login({email, password})
            setUser(userData.user)
        } catch (error) {
            console.error("Error logging in:", error.message)
        } finally {
            setLoading(false)
        }
    }
    const handleRegister = async ({username, email, password}) => {
        setLoading(true)
        try {
            const userData = await register({username, email, password})
            setUser(userData.user)
        } catch (error) {
            console.error("Error registering user:", error.message)
        } finally {
            setLoading(false)
        }
    }
   const handleLogout = async () => {
        setLoading(true)
        try {
            await logout()
            setUser(null)
        } catch (error) {
            console.error("Error logging out:", error.message)
        } finally {
            setLoading(false)
        }
    }
    const fetchCurrentUser = async () => {
        try {
            const userData = await getMe()
            setUser(userData.user)
        } catch (error) {
            console.error("Error fetching user data:", error.message )
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchCurrentUser();
    }, []);

    return {
        user,
        loading,
        handleLogin,
        handleRegister,
        handleLogout,
        fetchCurrentUser
    }
}
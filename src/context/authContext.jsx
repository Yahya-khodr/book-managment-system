import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../firebase'



const AuthContext = createContext()

function AuthProvider({ children }) {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const signup = async (email, password) =>

        await createUserWithEmailAndPassword(auth, email, password)

    const login = async (email, password) =>
        await signInWithEmailAndPassword(auth, email, password)

    const logout = async () => {
        await signOut(auth)
    }

    const loginWithGoogle = async () => {
        const googleProvider = new GoogleAuthProvider()
        await signInWithPopup(auth, googleProvider)
    }

    const resetPassword = async (email) => await sendPasswordResetEmail(auth, email)

    useEffect(() => {
        onAuthStateChanged(auth, currendUser => {
            setUser(currendUser)
            setLoading(false)
        })
    }, [])
    return <AuthContext.Provider value={{ signup, login, logout, user, loading, loginWithGoogle, resetPassword }}>{children}</AuthContext.Provider>
}

export { AuthProvider };

export default AuthContext;
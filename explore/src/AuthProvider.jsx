import React ,{useState, useEffect} from 'react'
import auth from './firebase';
export const AuthContext= React.createContext();
export default function AuthProvider({children}) {

const[currUser, setUser]= useState("");

async function login(email,password){
 return await auth.signInWithEmailAndPassword(email,password);
} 
async function logout(e){
    e.preventDefault()

    return await auth.signOut();
}
async function signup(email,password){

    return await auth.createUserWithEmailAndPassword(email, password);
}
useEffect(() => {
    
    // let cleanup= auth.onAuthStateChanged(user => {
    //      setUser(user);
    //  })
    //  return cleanup

    const unsubscribe = auth.onAuthStateChanged(user => {
        console.log("inside listner", user);
        setUser(user);
        //setLoading(false);
    })
    return function () {
        console.log("Hello");
        unsubscribe();
    }
 }, []);
const value={
    login ,
    logout,
    signup,
    currUser
}




    return (
        <AuthContext.Provider value =
        {value}

        >{children} </AuthContext.Provider>
    )
}

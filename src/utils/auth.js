import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../config/firebase";

//signup

export const signup = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      return user; // Return user if signup is successful
    } catch (error) {
      return error.message; // Return error message if something goes wrong
    }
  };

//signin
export const signin = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      return user; // Return user if signin is successful
    } catch (error) {
      return error.message; // Return error message if something goes wrong
    }
  };

export const signout = async() => {
    try{
        await signOut(auth);
        alert("You have successfully signed out")
    }
    catch(e){
        return e.message;
    }
}
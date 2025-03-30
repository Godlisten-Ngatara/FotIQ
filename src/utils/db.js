import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

export const getQuizes = async() => {

    try{
        const quizCollection = collection(db, "quiz");
        if (quizCollection){
            const quizes = await getDocs(quizCollection)
            return quizes
        }
    }
    catch(e) {
        alert("Something went wrong")
        return null
    }


}
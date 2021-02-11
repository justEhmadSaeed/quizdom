import React, { useEffect, useState } from 'react'
import LoadingScreen from './LoadingScreen'
import firebase from "../firebase/firebase"

const Responses = ({ match }) => {
    const quizId = match.params.quizCode
    const uid = firebase.auth().currentUser.uid
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getResponses = async () => {
            const res = await fetch('/API/quizzes/responses', {
                method: 'POST',
                body: JSON.stringify({ quizCode: quizId, uid }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const responses = await res.json()
            setLoading(false)
        }
        getResponses();
    }, [])

    if (loading) return <LoadingScreen />
    else return <div></div>
}

export default Responses

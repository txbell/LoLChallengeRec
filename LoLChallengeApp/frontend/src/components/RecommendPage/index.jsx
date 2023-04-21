import { useEffect, useState } from "react"
import Recommendation from "../Recommendation"

export default function RecommendPage (getData) {
    const [puuid, setPuuid] = useState('')
    const [userChallengeData, setUserChallengeData] = useState('')

    const getUserChallengeData = async (event) => {
        console.log('getUserChallengeData')
        event.preventDefault()
        const res = await fetch(`https://na1.api.riotgames.com/lol/challenges/v1/player-data/${puuid}?api_key=${import.meta.env.VITE_RITO_KEY}`)
        const apiResponse = await res.json()
        const data = apiResponse
        console.log(data)
        setUserChallengeData(data)
    }

    let userChallContent = (<i>loading...</i>)

    if (userChallengeData) {
        userChallContent = userChallengeData
            .map((thing, i) => {
                console.log(thing.level)
                return (
                    <div key={i}>
                        <i>{thing.level}</i>
                    </div>
                )
            })
    }

    return (
        <>
        <h1>Recommend Page</h1>
        <ol>
            <li><Recommendation /></li>
            <li><Recommendation /></li>
        </ol>
        <form onSubmit={getUserChallengeData}>
            <label>
                Enter your PUUID:
                <input 
                    type="text" 
                    name="puuid"
                    placeholder="Enter your PUUID"
                    value={puuid}
                    onChange={event => setPuuid(event.target.value)}
                />
            </label>
            <br />
            <input type="submit" value="Submit" />
        </form>
        <p>{userChallContent}</p>
        </>
    )
}
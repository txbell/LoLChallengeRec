import { useEffect, useState } from "react"
import Recommendation from "../Recommendation"
import { getChallenge } from "../../utils/backend"

export default function RecommendPage (props) {
    const [userChallengeData, setUserChallengeData] = useState('')
    const [generalChallengeData, setGeneralChallengeData] = useState('')
    const [userChallContent, setUserChallContent] = useState([])

    // CORS error so seeding instead
    const getGeneralChallengeData = async (event) => {
        console.log('getGeneralChallengeData')
        const res = await fetch(`https://na1.api.riotgames.com/lol/challenges/v1/challenges/config?api_key=${import.meta.env.VITE_RITO_KEY}`)
        console.log(res)
        const apiResponse = await res.json()
        const data = apiResponse
        console.log(data)
        setGeneralChallengeData(data)
    }
    // useEffect(() => {
    // getGeneralChallengeData()
    // }, [])
        

    const getUserPuuid = async (event) => {
        console.log('getUserPuuid')
        event.preventDefault()
        const res = await fetch(`https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${props.gameName}/${props.tagLine}?api_key=${import.meta.env.VITE_RITO_KEY}`)
        const apiResponse = await res.json()
        const data = apiResponse
        console.log(data)
        props.setPuuid(data.puuid)
    }

    const getUserChallengeData = async (event) => {
        setUserChallContent('Data loading...')
        console.log('getUserChallengeData')
        event.preventDefault()
        const res = await fetch(`https://na1.api.riotgames.com/lol/challenges/v1/player-data/${props.puuid}?api_key=${import.meta.env.VITE_RITO_KEY}`)
        const apiResponse = await res.json()
        const data = apiResponse
        console.log(data)
        setUserChallengeData(data)
        console.log('userChallengeData set')
        return data
    }

    let textArray = ['test']

    let nameForm = (
        <form onSubmit={getUserPuuid} className="recForm">
            <label>
                Enter your RIOT username:
                <input 
                    type="text" 
                    name="puuid"
                    placeholder="Hide on Bush"
                    onChange={event => {
                        if (props.gameName !== 'undefined') {props.setGameName(event.target.value)}
                    }}
                />
            </label>
            <label>
                Enter your RIOT tagline:
                <input
                    type="text"
                    name="tagLine"
                    placeholder="NA1"
                    onChange={event => {
                        if (props.tagLine !== 'undefined') {props.setTagLine(event.target.value)}
                    }}
                />
            </label>
            <input type="submit" value="Submit" />
        </form>
    )

    const rankChallenges = async (event, data) => {
        textArray = ['Loading...']
        const challArr = []
        const completedArr = []
        console.log('rankChallenges')
        console.log(userChallengeData.challenges)
        console.log(data.challenges)
        data.challenges.map(challenge => {
            getChallenge(challenge.challengeId)
            .then(baseChall => {
                console.log(baseChall)
                let remaining = 0
                for (let i = 0; i < Object.entries(baseChall.data[0].thresholds).length; i++) {
                    if ((Object.entries(baseChall.data[0].thresholds)[i][1] - challenge.value) === 0) {
                        console.log(Object.entries(baseChall.data[0].thresholds)[i][0])
                        remaining = (Object.entries(baseChall.data[0].thresholds)[i][1] - challenge.value)
                        let comparisonObj = {
                            challengeId: challenge.challengeId,
                            value: challenge.value,
                            level: challenge.level,
                            percentile: challenge.percentile,
                            remaining: remaining,
                        }
                        completedArr.push(comparisonObj)
                    } else if (Object.entries(baseChall.data[0].thresholds)[i][0] === challenge.level) {
                        // textArray.append(challenge.threshold)
                        console.log(Object.entries(baseChall.data[0].thresholds)[i][0])
                        remaining = (Object.entries(baseChall.data[0].thresholds)[i][1] - challenge.value)
                        let comparisonObj = {
                            challengeId: challenge.challengeId,
                            value: challenge.value,
                            level: challenge.level,
                            percentile: challenge.percentile,
                            remaining: remaining,
                        }
                        challArr.push(comparisonObj)
                        console.log(challArr.length)
                    }
                }
                if (challArr.length === 257) {
                    challArr.sort((a, b) => (a.remaining < b.remaining) ? 1 : -1)
                    console.log(challArr)
                    let userContent = []
                    // challArr.map((thing, i) => {
                    //     userChallContent.push(<Recommendation key={i} challengeData={thing} />)
                    // })
                    for (let i = 0; i < 15; i++) {
                        userContent.push(<Recommendation key={i} challengeData={challArr[i]} />)
                    }
                    console.log(userContent)
                    setUserChallContent(userContent)
                }
            })
        })
    }

    // if (userChallengeData) {

    //     rankChallenges()
    //     // .then(() => {
    //     console.log('beginning of userChallContent')
    //     console.log(userChallengeData.challenges)
    //     let abc = userChallengeData.challenges
    //     // userChallContent = abc.map((thing, i) => { <Recommendation key={i} challengeData={thing} /> })
    //     // })
    // }

    function startThing (event) {
        getUserChallengeData(event)
        .then(data => {
            rankChallenges(event, data)
        })
    }

    return (
        <div className="recPage">
        <h1>Recommend Page</h1>
        <form onSubmit={startThing} className="recForm">
            <label>
                Enter your PUUID:
                <input 
                    type="text" 
                    name="puuid"
                    placeholder="Enter your PUUID"
                    onChange={event => {
                        if (props.puuid !== 'undefined') {props.setPuuid(event.target.value)}
                    }}
                />
            </label>
            <br />
            <input type="submit" value="Submit" />
        </form>
        {/* {nameForm} */}
        <div className="theStuff">{userChallContent}</div>
        {/* <div>{textArray}</div> */}
        </div>
    )
}
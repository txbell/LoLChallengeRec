import { useEffect, useState } from "react"
import { getChallenge } from "../../utils/backend"

export default function Recommendation({challengeData}) {
    const [challengeName, setChallengeName] = useState('')
    console.log(challengeData)

    useEffect(() => {
    getChallenge(challengeData.challengeId)
    .then(chall => {
        console.log('chall')
        console.log(chall.data[0].localizedNames.en_US.name)
        setChallengeName(chall.data[0].localizedNames.en_US.name)
    })
    }, [])



    return (
        <div className="Card">
        <p>Name: {challengeName}</p>
        {/* <p>ID: {challengeData.challengeId}</p> */}
        <p>Level: {challengeData.level}</p>
        {/* <p>Percentile: {challengeData.percentile}</p> */}
        <p>Points: {challengeData.value}</p>
        </div>
    )
}
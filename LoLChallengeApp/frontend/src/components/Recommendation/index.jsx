
export default function Recommendation({challengeData}) {
    console.log(challengeData)
    def = ''
    if (typeof challengeData.name != "undefined") {
        def = challengeData.name
    } else if (challengeData.challengeId) {
        def = challengeData.challengeId
    }
    return (
        <div className="Card">
        <p>ID: {challengeData.challengeId}</p>
        <p>Level: {challengeData.level}</p>
        <p>Percentile: {challengeData.percentile}</p>
        <p>Points: {challengeData.value}</p>
        </div>
    )
}

export default function Recommendation(challengeData) {
    console.log(challengeData)
    return (
        <div className="Recommendation">
        <time dateTime={challengeData.achievedTime}>{challengeData.achievedTime}</time>
        <p>{challengeData.challengeId}</p>
        <p>{challengeData.level}</p>
        <p>{challengeData.percentile}</p>
        <p>{challengeData.value}</p>
        </div>
    )
}
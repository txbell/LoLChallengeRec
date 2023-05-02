import { deleteUser } from "../../utils/backend";

export default function HomePage(props) {
    return (
        <div className="homePage">
        <h1>Home Page</h1>
        <a className="link" href="/auth/login">Log In</a>
        <a className="link" href="/recommend">Get some recommendations</a>
        <a className="link" href="/user">User Page</a>
    </div>
    )
    }
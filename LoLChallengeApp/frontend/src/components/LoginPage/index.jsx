export default function LoginPage() {
    return (
        <div className="loginPage">
            <h1>Login</h1>
            <form className="Form">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}
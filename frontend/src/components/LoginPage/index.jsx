import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { signUp, logIn } from "../../utils/backend"
import { useEffect } from "react";

export default function LoginPage(props) {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const handleInputChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    // Execute auth logic on form submit
async function handleSubmit(event) {
    // prevent the page from refreshing when the form is submitted
    event.preventDefault()
    // check what the URL parameter is to determine what request to make
    if (props.locc === 'login') {
        const token = await logIn(formData)
        localStorage.setItem('userToken', token)
    } else {
        const { token } = await signUp(formData)
        localStorage.setItem('userToken', token)
    }
    console.log(`setEmail: ${formData.email}`)
    props.setEmail(formData.email)
    console.log(`setPassword: ${formData.password}`)
    props.setPassword(formData.password)
    // redirect to the home page after signing/logging in
    navigate('/user')
}

    let actionText
    props.locc === 'login' ? actionText = 'Log In' : actionText = 'Sign Up'

    return (
        <div className="loginPage">
            <h1>{actionText}</h1>
            <form className="Form" onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" onChange={handleInputChange} value={formData.email}/>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" onChange={handleInputChange} value={formData.password} />
                <button type="submit">{actionText}</button>
            </form>
        </div>
    )
}
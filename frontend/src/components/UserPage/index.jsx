import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react'
import { getUser, updateUser } from "../../utils/backend";

export default function UserPage(props) {

    // console.log(props)
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    
    let body = null
    let uhPuuid = null

    


    const navigate = useNavigate();

    const handleInputChange = (event) => {
        // console.log(props)
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    // Execute auth logic on form submit
async function handleSubmit(event) {
    // prevent the page from refreshing when the form is submitted
    event.preventDefault()
    console.log(props.email)
    // check what the URL parameter is to determine what request to make
    console.log(props.id, formData)
    updateUser(formData, props.userId)
   
    console.log(`setEmail: ${formData.email}`)
    props.setEmail(formData.email)
    console.log(`setPassword: ${formData.password}`)
    props.setPassword(formData.password)
    // redirect to the home page after signing/logging in
    navigate('/user')
}

    useEffect(() => {
        console.log(`token: ${localStorage.getItem('userToken')}`)
        setFormData({
            email: props.email,
            password: props.password,
        })
        console.log('get User data')
        getUserData()
    }, [])

async function deleteUser() {
    console.log('deleting User data')
    const ooo = deleteUser(props.userId)
    navigate('/')
}

async function getUserData() {

    console.log('getting User data')
    const data = await getUser(props.email)
    console.log(data)
}

    if (props.puuid === undefined) {
        uhPuuid = (
            <>
                <form>
                    <label>
                        Enter your PUUID:
                        <input
                            type="text"
                            name="puuid"
                            placeholder="Enter your PUUID"
                            value={props.puuid}
                            onChange={event => props.setPuuid(event.target.value)}
                        />
                    </label>
                    <br />
                    <input type="submit" value="Submit" />
                </form>
            </>
        )
    } else {
        uhPuuid = props.puuid
    }

    if (props.email === undefined || props.password === undefined) {
        body = (
        <Link to="/auth/login">
            <h4 className="px-3 py-2 hover:text-white">Log In</h4>
        </Link>
        )
    } else {
        body = (
        <>
        <h2 className="userInfo" id="email">Email: {props.email}</h2>
        <h2 className="userInfo" id="pword">Password: {props.password}</h2>
        <h2 className="userInfo" id="puuid">Puuid: {uhPuuid}</h2>
        <h2 className="userInfo" id="id">userId: {props.userId}</h2>
        <form onSubmit={handleSubmit}>
            <label>
                Edit your email:
                <input
                    type="text"
                    name="email"
                    placeholder="Enter your email"
                    onChange={handleInputChange}
                />
            </label>
            <br />
            <label>
                Edit your password:
                <input
                    type="text"
                    name="password"
                    placeholder="Enter your password"
                    onChange={handleInputChange}
                />
            </label>
            <br />
            <input type="submit" value="Submit" />
        </form>
        <form onSubmit={deleteUser}>
            <input type="submit" value="Delete Account" />
        </form>
        </>
        )
    }
    return (
        <div className="userPage">
        <h1>User Page</h1>
        {body}
        </div>
    );
}
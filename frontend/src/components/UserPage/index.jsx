import { Link } from "react-router-dom";
import { useState, useEffect } from 'react'

export default function UserPage(props) {
    
    let body = null
    let uhPuuid = null


    useEffect(() => {
        console.log(`token: ${localStorage.getItem('userToken')}`)
    }, [])

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
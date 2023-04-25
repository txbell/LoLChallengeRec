import { redirect } from "react-router-dom"


export default function SignupPage() {
    const [createFormData, setCreateFormData] = useState({
        email: '',
        password: '',
    })

    function handleInputChange(event) {
        setCreateFormData({
            ...createFormData,
            [event.target.name]: event.target.value
        })
    }

    // Execute form submission logic
    function handleSubmit(event) {
        // prevent the page from reloading
        event.preventDefault()
        // clear the form
        setCreateFormData({
            email: '',
            password: ''
        })
        // close the form
        // setShowCreateForm(false)
        // create the comment in the backend
        postUser({ ...createFormData})
            .then(() => {
                // refresh the comment section data
                redirect('/')
            })
    }

    return (
        <div className="signupPage">
            <h1>Signup</h1>
            <form className="Form" onSubmit={handleSubmit} >
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" onChange={handleInputChange} />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" onChange={handleInputChange}/>
                <button type="submit">Signup</button>
            </form>
        </div>
    )
}
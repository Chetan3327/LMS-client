import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import {bg} from '../imageUrls'
import axios from 'axios'
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000'


const Register = () => {    
    const navigate = useNavigate()
    const [visible, setVisible] = useState(false)
    const [formData, setFormData] = useState(null)
    const [error, setError] = useState("")

    const handleInput = (e) => {
        setError("")
        const {name, value} = e.target
        setFormData({...formData, [name]: value})
        setError("")
    }

    const handleSubmit = (e) => {
        setError("")
        e.preventDefault()
        console.log(formData)
        if (!formData || !formData.email || !formData.password || !formData.username || !formData.firstName || !formData.lastName) {
            setError("Required Fields missing!");
            return;
        }
        formData["firstName"] = formData["firstName"].charAt(0).toUpperCase() + formData["firstName"].slice(1);
        formData["lastName"] = formData["lastName"].charAt(0).toUpperCase() + formData["firstName"].slice(1);
        axios.post(`${BACKEND_URL}/user/register`, formData).then((response) => {
            console.log(response)
            console.log('registerd')
            if(response.status === 201){
                axios.post(`${BACKEND_URL}/password/send-otp`, {email: formData.email}).then((response) => {
                    console.log('navigaing sended mail')
                    navigate('/verify', {state: formData.email})
                })
            }
        }).catch((error) => {
            console.log('error')
            if (error.message === 'Network Error') {
                setError('Oops! Something went wrong.');
            } else {
                setError(error.response.data.error);
            }
        })
    }
    return(
        <section className="bg-gray-50 min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200">
            {/* container */}
            <div className="bg-gray-100 flex shadow-lg max-w-3xl p-5 items-center">
                {/* form */} 
                <div className="md:w-1/2 px-8">
                    <h2 className="text-[#002d74] font-bold text-lg">Register</h2>
                    <p className="text-[#002d74] text-xs mt-2">New to our platform? Create an account</p>

                    {/* Register form */}
                    <form className="flex flex-col gap-3">
                        <input className="outline-none rounded-xl border p-2 mt-8" name="username" type="text" placeholder="Username" onChange={(e) => handleInput(e)} />
                        <input className="outline-none rounded-xl border p-2" name="firstName" type="text" placeholder="First Name" onChange={(e) => handleInput(e)} />
                        <input className="outline-none rounded-xl border p-2" name="lastName" type="text" placeholder="Last Name" onChange={(e) => handleInput(e)} />
                        <input className="outline-none rounded-xl border p-2" name="email" type="email" placeholder="Email" onChange={(e) => handleInput(e)} />
                        <div className="relative">
                            <input className="outline-none rounded-xl border p-2 w-full" name="password" type={visible ? "text" : "password"} placeholder="Password" onChange={(e) => handleInput(e)} />
                            {visible ? 
                            (<FaRegEyeSlash className="text-gray-600 absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer" onClick={() => setVisible(false)}/>) 
                            : (<FaRegEye className="text-gray-600 absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer" onClick={() => setVisible(true)}/>)}
                        </div>
                        <button className="bg-[#002d74] rounded-xl text-white py-2 hover:scale-105 duration-300" onClick={(e) => handleSubmit(e)}>Register</button>
                        {error && (<div className="text-center border-red-400 p-2 border-solid border-2 rounded-xl bg-red-100">{error}</div>)}
                    </form>

                    <div className="text-xs flex justify-between items-center mt-3">
                        <p className="mr-2">Already have an account?</p>
                        <button className="py-2 px-4 bg-white border-2 rounded-xl hover:scale-110 duration-300" onClick={() => navigate('/login')}>Login</button>
                    </div>
                </div>
                {/* image */}
                <div className="w-1/2 md:block hidden">
                    <img src={bg} alt="sider" className="rounded-2xl" />
                </div>
            </div>
        </section>
    )
}
export default Register
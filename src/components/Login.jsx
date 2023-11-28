import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import {bg} from '../imageUrls'
import axios from 'axios'
import { useCookies } from 'react-cookie';
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000'
// https://99designs.com/profiles/MilutinAleksic/designs/1840857

const Login = () => {    
    const navigate = useNavigate()
    const [cookie, setCookie] = useCookies(['jwt-access-token'])

    const [visible, setVisible] = useState(false)   
    const [formData, setFormData] = useState(null)
    const [error, setError] = useState("")

    const handleInput = (e) => {
        const {name, value} = e.target
        setFormData({...formData, [name]: value})
        setError("")
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formData)
        if (!formData || !formData.email || !formData.password) {
            setError("Email and password are required");
            return;
        }
        axios.post(`${BACKEND_URL}/user/login`, formData).then((response) => {
            if(response.status === 200){
                console.log(response.data.token)
                localStorage.setItem('imageUrl', response.data.imageUrl)
                setCookie('jwt-access-token', response.data.token)
                navigate('/profile')
            }else{
                setError(response.data.error)
            }
        }).catch((error) => {
            console.log(error)
            if (error.message === 'Network Error') {
                setError('Oops! Something went wrong.');
            } else {
                console.log(error)
                setError(error.response.data.error);
                if(error.response.data.error === 'User Email Not Verified!'){
                    console.log('navigae')
                    navigate('/verify', {state: formData.email})
                }
            }
        })
    }
    return(
        <section className="bg-gray-50 min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200">
            {/* container */}
            <div className="bg-gray-100 flex shadow-lg max-w-3xl p-5 items-center">
                {/* image */}
                <div className="w-1/2 md:block hidden">
                    <img src={bg} alt="sider" className="rounded-2xl" />
                </div>
                {/* form */}
                <div className="md:w-1/2 px-8">
                    <h2 className="text-[#002d74] font-bold text-lg">Login</h2>
                    <p className="text-[#002d74] text-xs mt-2">If You Are Already A Member. Log In</p>

                    {/* login form */}
                    <form className="flex flex-col gap-4">
                        <input className="outline-none rounded-xl border p-2 mt-8" name="email" type="email" placeholder="Email" onChange={(e) => handleInput(e)} />
                        <div className="relative">
                            <input className="outline-none rounded-xl border p-2 w-full" name="password" type={visible ? "text" : "password"} placeholder="Password" onChange={(e) => handleInput(e)} />
                            {visible ? 
                            (<FaRegEyeSlash className="text-gray-600 absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer" onClick={() => setVisible(false)}/>) 
                            : (<FaRegEye className="text-gray-600 absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer" onClick={() => setVisible(true)}/>)}
                        </div>
                        <button className="bg-[#002d74] rounded-xl text-white py-2 hover:scale-105 duration-300" onClick={(e) => handleSubmit(e)}>Login</button>
                        {error && (<div className="text-center border-red-400 p-2 border-solid border-2 rounded-xl bg-red-100">{error}</div>)}
                    </form>

                    <p className="mt-4 text-xs border-b py-4 cursor-pointer" onClick={() => navigate('/forgot-password')}>Forgot your password?</p>

                    <div className="text-xs flex justify-between items-center mt-3">
                        <p className="mr-2">Don't have an account?</p>
                        <button className="py-2 px-4 bg-white border rounded-xl hover:scale-110 duration-300" onClick={() => navigate('/register')}>Register</button>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Login
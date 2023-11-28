import { useState } from "react";
import axios from 'axios'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000'
// https://99designs.com/profiles/MilutinAleksic/designs/1840857

const ForgotPassword = () => {    
    const [formData, setformData] = useState(null)
    const [visible, setVisible] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [mailSent, setMailSent] = useState(false)

    const handleInput = (e) => {
        setError("")
        const {name, value} = e.target
        setformData({...formData, [name]: value})
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (!formData.email || !formData.password) {
            setError("Email and Password is required");
            return;
        }
        axios.post(`${BACKEND_URL}/user/forgot-password`, formData).then((response) => {
            if(response.status === 200){
                console.log(response.data)
                setSuccess(response.data.message)
                setMailSent(true)
            }
        }).catch((error) => {
            setError("Error in forgot password request");
        })
    }
    return(
        <section className="bg-gray-50 min-h-screen flex items-center justify-center">
            {/* container */}
            <div className="bg-gray-100 flex shadow-lg p-5 items-center max-w-3xl">

                {/* form */}
                <div className="px-8">
                    <h2 className="text-[#002d74] font-bold text-lg">Account Recovery</h2>
                    <p className="text-[#002d74] text-xs mt-2">{mailSent ? 'Please check your Email!' : 'Enter your email to reset your password.' }</p>

                    {/* login form */}
                    {!mailSent && (<form className="flex flex-col gap-4">
                        <input className="outline-none rounded-xl border p-2 mt-4" name="email" type="email" placeholder="Email" onChange={(e) => handleInput(e)} />
                        <div className="relative">
                            <input className="outline-none rounded-xl border p-2 w-full" name="password" type={visible ? "text" : "password"} placeholder="New Password" onChange={(e) => handleInput(e)} />
                            {visible ? 
                            (<FaRegEyeSlash className="text-gray-600 absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer" onClick={() => setVisible(false)}/>) 
                            : (<FaRegEye className="text-gray-600 absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer" onClick={() => setVisible(true)}/>)}
                        </div>
                        <button className="bg-[#002d74] rounded-xl text-white py-2 hover:scale-105 duration-300" onClick={(e) => handleSubmit(e)}>Send Mail</button>
                    </form>)}

                    {error && (<div className="text-center border-red-400 p-2 mt-2 border-solid border-2 rounded-xl bg-red-100">{error}</div>)}
                    {success && (<div className="text-center border-green-400-400 p-2 mt-2 border-solid border-2 rounded-xl bg-green-100">{success}</div>)}


                    
                </div>
            </div>
        </section>
    )
}
export default ForgotPassword
import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react'
import {useNavigate, useLocation} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000'

const VerifyAccount = () => {
    const location = useLocation()
    const [email, setEmail] = useState(location.state || "chauhanchetan12789@gmail.com")
    const navigate = useNavigate()
    const length = 4
    const [otp, setOtp] = useState(Array(length).fill(''))
    const inputRefs = useRef(Array(length).fill(null));
    const handleInput = (index, value) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
    
        if (!newOtp.includes('')) {
          console.log(newOtp.join(''));
        }
    
        if (index < length - 1 && value !== '') {
          inputRefs.current[index + 1].focus();
        }
    };


    const handleKeyDown = (e, index) => {
        // if (e.key === 'Backspace' && index > 0) {
        //   inputRefs.current[index - 1].focus();
        // }
        if (e.key === 'Backspace' && index > 0 && otp[index] === '') {
            // If the current input is empty, focus on the previous input
            inputRefs.current[index - 1].focus();
        } else if (e.key === 'Backspace' && index > 0 && otp[index] !== '') {
            // If the current input is not empty, clear it
            const newOtp = [...otp];
            newOtp[index] = '';
            setOtp(newOtp);
        }
    };
    
    useEffect(() => {
        inputRefs.current[0].focus();

    }, []);

    const handleSubmit = (e) => {
        e.preventDefault()
        if(otp.join('').length !== length){
            toast.error("Enter 4-Digit Code!", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
            return ;
        }
        axios.post(`${BACKEND_URL}/password/verify-otp`, {email: email, otp: Number(otp.join(''))}).then((response) => {
            console.log(response)
            if(response.status === 200){
                navigate('/login')
            }
        }).catch((error) => {
            console.log('error')
            if (error.message === 'Network Error') {
                toast.error('Oops! Something went wrong.', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
            } else {
                toast.error(error.response.data.error, {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
            }
        })
    }

    const resend = (e) => {
        e.preventDefault()
        const resendPromise = new Promise((resolve, reject) => {
            axios.post(`${BACKEND_URL}/password/send-otp`, {email}).then((response) => {
                if(response.status === 200){
                    resolve(response.data.message)
                }else{
                    reject('Failed to send Email')
                }
            }).catch((error) => {
                console.error('Error sending email:', error);
                reject('Error occurred in sending email');
            })
        })
        toast.promise(resendPromise, {
            pending: 'Sending mail',
            success: 'Mail sent',
            error: 'Error occurred in sending mail',
            position: toast.POSITION.BOTTOM_RIGHT,
        });

    }

    return (
        <div className="bg-gray-50 min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200">
            <div className="bg-white flex flex-col gap-2 shadow-lg max-w-3xl p-7 items-center rounded">
                <h3 className='text-3xl font-semibold'>Email Verification</h3>
                <p className='text-gray-400 '>We have sent a code to your email {email}</p>
                <div className='flex my-3'>
                    {otp.map((digit, idx) => {
                        return(
                            <input id={`opt-input-${idx}`} className='bg-blue-50 m-1 w-20 py-5 rounded-full text-center outline-gray-50 focus:outline-blue-300' type="text" key={idx} maxLength="1" value={digit} onChange={(e) => handleInput(idx, e.target.value)} onKeyDown={(e) => handleKeyDown(e, idx)} ref={(input) => (inputRefs.current[idx] = input)} />
                        )
                    })}
                </div>
                <button className='bg-primary p-2 px-4 text-white rounded w-full' onClick={(e) => handleSubmit(e)}>Verify Account</button>
                <section className='flex gap-2'>
                    <p className='text-gray-500'>Didn't recieve code?</p>
                    <span className='cursor-pointer text-blue-400' onClick={(e) => resend(e)}>Resend</span>
                </section>
            </div>
            <ToastContainer />
        </div>
    )
}

export default VerifyAccount

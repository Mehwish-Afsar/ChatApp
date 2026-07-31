import React, { useState } from 'react'
import { useAuthStore } from '../store/authStore';
import BorderAnimatedController from '../components/BorderAnimatedController'
import { Lock, MailIcon, MessageCircleIcon, UserIcon } from 'lucide-react'
import { LoaderIcon } from 'react-hot-toast'
import { Link } from "react-router-dom"

function Login() {
    const [formData, setFormData] = useState({email: "", password: "" })
        const { login, isLoggedIn, isCheckingAuth } = useAuthStore()
    
        const handleLogin = (e) => {
        e.preventDefault()

        login(formData)
    }
    
     return (
        <div className="w-full flex justify-center items-center bg-slate-900 p-4">
            <div className="relative w-full max-w-4xl md:h-[600px] h-auto">
                <BorderAnimatedController>
                    <div className="w-full h-full flex flex-col md:flex-row">

                        {/* Left Side - Form */}
                        <div className="md:w-1/2 p-8 flex flex-col justify-center md:border-r border-slate-600/30">
                            <div className="w-full max-w-md mx-auto">
                                <div className="text-center mb-6">
                                    <MessageCircleIcon className="w-12 h-12 mx-auto text-slate-400 mb-4" />
                                    <h2 className="text-2xl font-bold text-white mb-2">
                                        Welcome Back
                                    </h2>
                                    <p className="text-slate-400">
                                        Login to access your account
                                    </p>
                                </div>

                                <form onSubmit={handleLogin} className="space-y-6">
                                    {/* Email */}
                                    <div>
                                        <label className="auth-input-label text-sm text-slate-300 block mb-2">
                                            Email
                                        </label>
                                        <div className="relative">
                                            <MailIcon className="auth-input-icon absolute left-3 top-3 w-5 h-5 text-slate-400" />
                                            <input
                                                type="email"
                                                className="w-full pl-10 pr-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                                                value={formData.email}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        email: e.target.value,
                                                    })
                                                }
                                                placeholder="johndoe@gmail.com"
                                            />
                                        </div>
                                    </div>

                                    {/* Password */}
                                    <div>
                                        <label className="auth-input-label text-sm text-slate-300 block mb-2">
                                            Password
                                        </label>
                                        <div className="relative">
                                            <Lock className="auth-input-icon absolute left-3 top-3 w-5 h-5 text-slate-400" />
                                            <input
                                                type="password"
                                                className="w-full pl-10 pr-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                                                value={formData.password}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        password: e.target.value,
                                                    })
                                                }
                                                placeholder="Enter your Password"
                                            />
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <button className='auth-btn' type='submit' disabled={isLoggedIn}>
                                        {isLoggedIn ? (
                                            <LoaderIcon className='w-full h-5 animate-spin text-center' />
                                        ) : (
                                            "Login"
                                        )
                                        }
                                    </button>
                                </form>

                                <div className='mt-6 text-center'>
                                    <Link to="/signup" className="auth-link">
                                        Don't have an account? Sign up
                                    </Link>


                                </div>
                            </div>
                        </div>

                        {/* Right Side - Illustration / Graphic Placeholder */}
                        <div className="hidden md:w-1/2 p-6 md:flex items-center justify-center bg-gradient-to-bl form-slate-800/20 to-transparent">
                            <div>
                                <img src="/login.png"
                                    alt="people using mobile devices"
                                    className='w-full h-auto object-contain '
                                />
                                <div className='mt-6 text-center'>
                                    <h3 className='text-xl font-medium text-cyan-400'>Start Your Journey Today</h3>
                                    <div className='mt-4 flex justify-center gap-4'>
                                        <span className='auth-badge'>Free</span>
                                        <span className='auth-badge'>Easy Setup</span>
                                        <span className='auth-badge'>Private</span>

                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </BorderAnimatedController>
            </div>
        </div>
    );
}

export default Login

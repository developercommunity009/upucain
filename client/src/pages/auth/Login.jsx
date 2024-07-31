

import bg from '../../assets/bg.webp'
import logo from '../../assets/fulllogo.png'


import { useContext, useState } from 'react'
import { useNavigate } from "react-router-dom"
import InputFeild from "../../components/InputFeild"
import StatesContext from "../../context/StatesContext"
import { BACKEND_URL } from '../../constant'
import { useMutation } from '@tanstack/react-query'
import { CircularProgress } from '@mui/material'


const data = ['Yes', 'No']


const Login = () => {

    const context = useContext(StatesContext)
    const { handleStateChange } = context
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')

    const [options, setoptions] = useState('Is Master Account?')
    const [openDropDown, setopenDropDown] = useState(false)

    const navigate = useNavigate()

    const mutation = useMutation({
        mutationFn: (newData) => {
            return fetch(`${BACKEND_URL}/api/v1/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(newData)
            });
        },

        async onSuccess(data) {
            let res = await data.json();
            if (res.success) {
                if (res.user.role === "admin") {
                    navigate('/master/companies')
                } else {
                    navigate('/shipments')
                }
                const currentDate = new Date().getTime()
                localStorage.setItem('LoggedInTime', currentDate)
                localStorage.setItem('authUser', JSON.stringify(res.user))
                localStorage.setItem('token', JSON.stringify(res.token))
                handleStateChange({ user: res.user, success: res.success, error: null })
                // navigate(`/verify`, { state: { userId: res.user._id, email:user.email } });
            } else {
                handleStateChange({ user: null, success: null, error: res.message })
            }
        },


    })

    return (
        <div className="px-[20px] py-[40px] min-h-screen relative flex justify-center items-center">

            <div className='absolute inset-0'>
                <img src={bg} alt="" className='h-full w-full object-cover' />
            </div>

            <div className='absolute inset-0 z-10'>
                <div className='bg-[rgba(0,0,0,0.4)] h-full w-full' />
            </div>

            <div className='bg-[rgba(0,51,102,1)] w-[450px] rounded-[20px] py-[40px] relative z-10'>

                <div className='flex justify-center'>
                    <img src={logo} alt="" className='h-[65px] sm:h-[100px] object-contain' />
                </div>

                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        mutation.mutate({ email, password })
                        // if(options === 'Yes'){
                        //     navigate('/master/companies')
                        // }else{
                        //     navigate('/shipments')
                        // }
                    }}
                    className="px-[20px] sm:w-[80%] mx-auto mt-[40px] space-y-[20px]">

                    <InputFeild
                        placeholder={'Enter Email'}
                        type={'email'}
                        value={email}
                        onChange={setemail}
                        required={true}
                    />


                    <div>

                        <InputFeild
                            placeholder={'Enter Password'}
                            password={true}
                            value={password}
                            onChange={setpassword}
                            required={true}
                        />

                    </div>
                    <h3 className="text-white mt-[30px] text-[13px] text-center font-semibold">
                        Forgot password ? <span
                            onClick={() => navigate('/forgotpassword')}
                            className="text-[#FFA500] underline underline-offset-4 cursor-pointer">Click here</span>
                    </h3>

                    <div className="py-[10px] pb-[30px]">
                        <button
                            className="w-full bg-[#FFA500] text-[18px] font-semibold text-white rounded-[12px] h-[40px]"
                            disabled={mutation.isPending}
                            type="submit"
                        >
                            {mutation.isPending ? <CircularProgress sx={{ color: 'white' }} size={18} /> : 'Login'}

                        </button>

                        <h2 className="text-white mt-[30px] text-[13px] text-center font-semibold">
                            Not a registered member? <span
                                onClick={() => navigate('/register')}
                                className="text-[#FFA500] underline underline-offset-4 cursor-pointer">Sign Up</span>
                        </h2>

                    </div>

                </form>

            </div>
        </div>
    )
}

export default Login
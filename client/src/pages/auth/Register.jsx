import { useNavigate } from "react-router-dom"
import bg from '../../assets/bg.webp'
import logo from '../../assets/fulllogo.png'
import InputFeild from "../../components/InputFeild"

import { CircularProgress } from "@mui/material"
import { useMutation } from "@tanstack/react-query"
import { useContext, useState } from "react"
import { BACKEND_URL } from "../../constant"
import StatesContext from "../../context/StatesContext"
import { errors } from "ethers"


const data = ['Yes', 'No']


const Register = () => {

    const [firstName, setfirstName] = useState('')
    const [lastName, setlastName] = useState('')
    const [email, setemail] = useState('')
    const [role, setRole] = useState('');
    const [password, setpassword] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')


    const [options, setoptions] = useState('Is Master Account?')
    const [openDropDown, setopenDropDown] = useState(false)


    const context = useContext(StatesContext)
    const { handleStateChange } = context

    const navigate = useNavigate()

    const mutation = useMutation({
        mutationFn: (newData) => {
            return fetch(`${BACKEND_URL}/api/v1/users/singup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(newData)
            });
        },
        async onSuccess(data) {
            let res = await data.json()
            console.log(res)
            if (res.success) {
                navigate(`/`);
                handleStateChange({success: res.success})
                // navigate(`/verify`, { state: { userId: res.data.userId, email } });

            } else {
                handleStateChange({  error: res.message })
            }
        },
        onError(error) {
            console.log(error)
        }


    })



    return (
        <div className="px-[20px] py-[60px] min-h-screen relative flex justify-center items-center">

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

                        if (password !== confirmPassword) {
                            handleStateChange({ error: 'Password does not match' })
                            return
                        }
                                
                        const roleValue = options === 'Yes' ? 'admin' : 'company';
                        setRole(roleValue);

                        mutation.mutate({
                            firstName,
                            lastName,
                            role:roleValue,
                            email,
                            password
                        })
                    }}
                    className="px-[20px] sm:w-[80%] mx-auto mt-[40px] space-y-[20px]">

                    <InputFeild
                        placeholder={'First Name'}
                        required={true}
                        value={firstName}
                        type={'text'}
                        onChange={setfirstName}
                    />
                    <InputFeild
                        placeholder={'Last Name'}
                        required={true}
                        value={lastName}
                        type={'text'}
                        onChange={setlastName}
                    />
                    <InputFeild
                        placeholder={'Enter Email'}
                        type={'email'}
                        required={true}
                        value={email}
                        onChange={setemail}

                    />

                    <div className='relative'>

                        <div className='w-full bg-transparent   border border-gray-400 rounded-[12px]'
                            style={{
                                backgroundColor: 'rgba(255,255,255,0.1)',
                            }}
                        >
                            <div className='flex items-center gap-[7px] py-[12px] cursor-pointer relative select-none  px-[20px]'
                                onClick={() => setopenDropDown(!openDropDown)}
                            >
                                <h2 className='text-gray-300 font-normal  w-full text-[13px] '>
                                    {options}
                                </h2>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-[13px] text-white">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                </svg>

                                {openDropDown && (
                                    <div className="absolute top-[47px]  left-0 right-0 z-20 bg-white border border-gray-200"
                                        style={{
                                            borderBottomLeftRadius: openDropDown && '10px',
                                            borderBottomRightRadius: openDropDown && '10px',
                                            borderTopColor: 'transparent',

                                        }}
                                    >
                                        {data.map((item, i) => (

                                            <p
                                                key={i}
                                                className='text-[10px] sm:text-[12px]  font-normal px-[16px] py-[8px] duration-500 '
                                                onClick={() => setoptions(item)}
                                            >
                                                {item}
                                            </p>
                                        ))}

                                    </div>
                                )}

                            </div>
                        </div>
                    </div>

                    <InputFeild
                        placeholder={'Enter Password'}
                        password={true}
                        required={true}
                        value={password}
                        onChange={setpassword}
                    />
                    <InputFeild
                        placeholder={'Enter confirm Password'}
                        password={true}
                        required={true}
                        value={confirmPassword}
                        onChange={setconfirmPassword}
                    />
                    <div className="py-[10px] pb-[30px]">
                        <button
                            className="w-full bg-[#FFA500] text-[18px] font-semibold text-white rounded-[12px] h-[40px]"
                            disabled={mutation.isPending}
                            type="submit"
                        >
                            {mutation.isPending ? <CircularProgress sx={{ color: 'white' }} size={18} /> : 'Register'}
                        </button>

                        <h2 className="text-white mt-[30px] text-[13px] text-center font-semibold">
                            Already a registered member? <span
                                onClick={() => navigate('/')}
                                className="text-[#FFA500] underline underline-offset-4 cursor-pointer">Sign In</span>
                        </h2>



                    </div>

                </form>

            </div >


        </div >
    )
}

export default Register
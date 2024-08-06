
import { useContext, useState } from 'react';
import NavBar from '../components/NavBar';
import Sidebar from '../components/Sidebar';

import { PencilIcon } from '@heroicons/react/24/solid';
import { CircularProgress } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { BACKEND_URL } from '../constant';
import StatesContext from '../context/StatesContext';
import { handleAwsUpload, handleCloudnaryUpload } from '../utils/HandleAwsUpload';


const investmentType = ['Profile', 'Security']

const Profile = () => {

    const context = useContext(StatesContext)
    const { state, handleStateChange } = context
  
    const token = JSON.parse(localStorage.getItem("token"));
    const [activeType, setactiveType] = useState(investmentType[0])
    const [presentImage, setpresentImage] = useState(state.user && state.user?.image?.url)
    const [firstName, setfirstName] = useState(state.user && state.user.firstName)
    const [lastName, setlastName] = useState(state.user && state.user.lastName)
    const [email, setemail] = useState(state.user && state.user.email)
    const [avatar, setavatar] = useState('');

    const [currentPassword, setcurrentPassword] = useState('')
    const [password, setpassword] = useState('')
    const [confrimPassword, setconfrimPassword] = useState('')
    const [loading, setloading] = useState(false)

    const handleImageChnage = (e) => {

        setavatar(e.target.files[0])

        const reader = new FileReader()
        reader.onload = () => {
            if (reader.readyState === 2) {
                setpresentImage(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0])
    }

    const mutation = useMutation({
        mutationFn: (newData) => {
            console.log(newData)
            return fetch(`${BACKEND_URL}/api/v1/users/singal/${state.user._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                  },
                credentials: 'include',
                body: JSON.stringify(newData)
            });
        },

        async onSuccess(data) {
            let res = await data.json()
            if (res.success) {
                handleStateChange({user: res.user , success: 'Profile updated successfully!' })
                localStorage.setItem('authUser', JSON.stringify(res.user));
            } else {
                handleStateChange({ error: res.message })
            }
        },
    })

    const passwordMutation = useMutation({
        mutationFn: (newData) => {
            return fetch(`${BACKEND_URL}/api/v1/users/updatingpassword`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                  },
                credentials: 'include',
                body: JSON.stringify(newData)
            });
        },

        async onSuccess(data) {
            let res = await data.json()
            if (res.success) {
                handleStateChange({ user: res.user, success: 'Password updated successfully!' })
                setcurrentPassword('')
                setpassword('')
                setconfrimPassword('')
            } else {
                handleStateChange({ error: res.message })
            }
        },
    })


    return (
          <div>
            <div className='relative z-40'>
                <Sidebar />
                <NavBar />
            </div>
            <div className='md:ml-[230px]'>
                <div className='mt-[80px] w-full p-[20px]'>
                    <div className='max-w-[400px] mx-auto'>

                        <div className='relative z-10 flex justify-center'
                        >
                            <div className='flex items-center h-[45px] sm:h-[56px] p-[1px] sm:p-[3px] rounded-[1000px]'
                                style={{
                                    border: '2px solid rgba(0, 51, 102, 0.50)'
                                }}
                            >
                                {investmentType.map((item, i) => (
                                    <div key={i} className='h-full' >
                                        <div className={`h-full`} onClick={() => setactiveType(item)}>
                                            <button className={`rounded-[32px] w-[100px] sm:w-[128px] text-[12px] sm:text-[16px]  font-semibold h-full ${activeType === item ? 'text-white' : ' text-[#003366]'} `}
                                                style={{
                                                    background: activeType === item && '#003366'

                                                }}
                                            >
                                                {item}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className='mt-[50px]'>
                            {activeType === 'Profile' && (
                                <div>
                                    <div className='relative   w-[140px] h-[140px] mx-auto'>
                                        <img src={presentImage} alt="" className=' h-full w-full object-cover rounded-full'
                                        />
                                        <div className='absolute bottom-[15px] right-0'>
                                            <label htmlFor="imageSelect" className='bg-white rounded-full h-[30px] cursor-pointer w-[30px] border border-gray-300 flex justify-center items-center'>
                                                <PencilIcon className='h-[16px]' />
                                            </label>
                                            <input
                                                onChange={(e) => handleImageChnage(e)}
                                                id='imageSelect' type="file" accept=".jpg, .jpeg, .png, .gif" className='hidden'
                                            />
                                        </div>
                                    </div>

                                    <form
                                        onSubmit={async (e) => {
                                            e.preventDefault()

                                            setloading(true)

                                            if (avatar) {
                                                const { imageUrl } = await handleCloudnaryUpload(avatar ,state.user._id)
                                            }


                                            mutation.mutate({
                                                email,
                                                firstName,
                                                lastName,
                                            })

                                            setloading(false)

                                        }}
                                        className='mt-[30px] space-y-[15px]'>
                                        <div className='flex flex-col sm:flex-row gap-[15px] items-center'>
                                            <input
                                                placeholder={'First Name'}
                                                className="outline-none w-full text-[13px]  bg-transparent border border-gray-400 rounded-[10px] font-normal px-[20px] py-[10px]"
                                                required
                                                value={firstName}
                                                onChange={(e) => setfirstName(e.target.value)}
                                            />
                                            <input
                                                placeholder={'Last Name'}
                                                className="outline-none w-full text-[13px]  bg-transparent border border-gray-400 rounded-[10px] font-normal px-[20px] py-[10px]"
                                                required
                                                value={lastName}
                                                onChange={(e) => setlastName(e.target.value)}
                                            />
                                        </div>
                                        <input
                                            placeholder={'Email'}
                                            className="outline-none w-full text-[13px]  bg-transparent border border-gray-400 rounded-[10px] font-normal px-[20px] py-[10px]"
                                            required
                                            value={email}
                                            onChange={(e) => setemail(e.target.value)}
                                            type='email'
                                        />

                                        <div className='pt-[10px]'>
                                            <button className="w-full bg-[#FFA500] text-[15px] font-semibold text-white rounded-[12px] h-[40px]"
                                                disabled={mutation.isPending || loading}
                                                type="submit"
                                            >
                                                {(mutation.isPending || loading) ? <CircularProgress sx={{ color: 'white' }} size={18} /> : ' Save Changes'}
                                            </button>
                                        </div>
                                    </form>

                                </div>
                            )}
                            {activeType === 'Security' && (
                                <div>

                                    <form
                                        onSubmit={(e) => {
                                            e.preventDefault()

                                            if (password !== confrimPassword) {
                                                handleStateChange({ error: 'New Password does not match' })
                                                return
                                            }

                                            passwordMutation.mutate({
                                                currentPassword,
                                                password,
                                                confrimPassword
                                            })
                                        }}
                                        className='mt-[50px] space-y-[15px]'>

                                        <input
                                            placeholder={'Old Password'}
                                            className="outline-none w-full text-[13px]  bg-transparent border border-gray-400 rounded-[10px] font-normal px-[20px] py-[10px]"
                                            required
                                            value={currentPassword}
                                            onChange={(e) => setcurrentPassword(e.target.value)}
                                            type='password'
                                        />
                                        <input
                                            placeholder={'New Password'}
                                            className="outline-none w-full text-[13px]  bg-transparent border border-gray-400 rounded-[10px] font-normal px-[20px] py-[10px]"
                                            required
                                            value={password}
                                            onChange={(e) => setpassword(e.target.value)}
                                            type='password'
                                        />
                                        <input
                                            placeholder={'Confirm Password'}
                                            className="outline-none w-full text-[13px]  bg-transparent border border-gray-400 rounded-[10px] font-normal px-[20px] py-[10px]"
                                            required
                                            value={confrimPassword}
                                            onChange={(e) => setconfrimPassword(e.target.value)}
                                            type='password'
                                        />

                                        <div className='pt-[10px]'>
                                            <button className="w-full bg-[#FFA500] text-[15px] font-semibold text-white rounded-[12px] h-[40px]"
                                                disabled={passwordMutation.isPending}
                                                type="submit"
                                            >
                                                {passwordMutation.isPending ? <CircularProgress sx={{ color: 'white' }} size={18} /> : ' Save Changes'}
                                            </button>
                                        </div>
                                    </form>

                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile

import bg from '../../assets/bg.webp'
import logo from '../../assets/fulllogo.png'


import { useContext, useState } from 'react'
import { useNavigate , useParams} from "react-router-dom"
import InputFeild from "../../components/InputFeild"
import StatesContext from "../../context/StatesContext"
import { BACKEND_URL } from '../../constant'
import { useMutation } from '@tanstack/react-query'
import { CircularProgress } from '@mui/material'


const data = ['Yes', 'No']


const Resetpassword = () => {

    const context = useContext(StatesContext)
    const { handleStateChange } = context;
    const { resetToken } = useParams();
      console.log(resetToken);

    const [password, setpassword] = useState('')
    const [confrimPassword, setconfrimPassword] = useState('');
 

    const navigate = useNavigate()

    const mutation = useMutation({
        mutationFn: (newData) => {
            return fetch(`${BACKEND_URL}/api/v1/users/resetpassword/${resetToken}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(newData)
            });
        },

        async onSuccess(data) {
            let res = await data.json();
                handleStateChange({  success: res.success , error:null});
                navigate("/");
                // navigate(`/verify`, { state: { userId: res.user._id, email:user.email } });
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
                        mutation.mutate({password  , confrimPassword})
                   
                    }}
                    className="px-[20px] sm:w-[80%] mx-auto mt-[40px] space-y-[20px]">

                    


                    <div>

                        <InputFeild
                            placeholder={'Enter Password'}
                            password={true}
                            value={password}
                            onChange={setpassword}
                            required={true}
                        />

                    </div>
                    <div>

                        <InputFeild
                            placeholder={'Enter Confrim Password'}
                            password={true}
                            value={confrimPassword}
                            onChange={setconfrimPassword}
                            required={true}
                        />

                    </div>
                     

                    <div className="py-[10px] pb-[30px]">
                        <button
                            className="w-full bg-[#FFA500] text-[18px] font-semibold text-white rounded-[12px] h-[40px]"
                            disabled={mutation.isPending}
                            type="submit"
                        >
                            {mutation.isPending ? <CircularProgress sx={{ color: 'white' }} size={18} /> : 'Set password'}

                        </button>

  

                    </div>

                </form>

            </div>
        </div>
    )
}

export default Resetpassword;
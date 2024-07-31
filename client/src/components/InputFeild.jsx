import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';

const InputFeild = ({ placeholder, password, type, value, onChange, required }) => {


    const [isPasswordVisible, setIsPasswordVisible] = useState(false);


    const togglePasswordVisibility = () => {
        setIsPasswordVisible((prev) => !prev);
    };

    const inputType = password ? (isPasswordVisible ? 'text' : 'password') : type;


    return (
        <div className={`${password && 'flex justify-center items-center'} overflow-hidden  border border-gray-400 rounded-[12px] w-full`}
            style={{
                backgroundColor: 'rgba(255,255,255,0.1)',
            }}
        >

            <input
                placeholder={placeholder}
                type={inputType ? inputType : 'text'}
                value={value}
                onChange={(e) => {
                    onChange(e.target.value);
                }}
                required={required}
                className="outline-none w-full text-[13px]  bg-transparent text-white font-normal px-[20px] py-[12px]"
            />

            {password && (
                <div className="pr-[15px] cursor-pointer h-full mb-[5px]">
                    <div className='cursor-pointer'
                        onClick={() => togglePasswordVisibility()}
                    >
                        {isPasswordVisible ? (
                            <VisibilityOffIcon sx={{ fontSize: '22px', color: 'white' }} />
                        ) : (
                            <VisibilityIcon sx={{ fontSize: '22px', color: 'white' }} />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default InputFeild;

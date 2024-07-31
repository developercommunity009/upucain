import { CircularProgress } from "@mui/material"
import { useDisconnect, useWeb3Modal, useWeb3ModalAccount, useWeb3ModalState } from "@web3modal/ethers5/react"

const ConnectBtn = () => {

    const { open } = useWeb3Modal()
    const { disconnect } = useDisconnect()
    const { address } = useWeb3ModalAccount()
    const { open: modalOpen } = useWeb3ModalState()



    const handleConnect = async () => {

        if (address) {
            await disconnect()
        } else {
            open()
        }
    }

    function formatWalletAddress(address, isLarge) {
        const addressLength = address.length;

        let value = isLarge ? 5 : 3

        const truncatedAddress = address.slice(0, value) + "..." + address.slice(addressLength - value);

        return truncatedAddress;
    }

    return (
        <div>
            <button className="w-[150px] hidden md:block bg-[#FFA500] text-[15px] font-semibold hover:scale-105 duration-500 text-white rounded-[20px] h-[40px]"
                onClick={() => handleConnect()}
            >
                {modalOpen ? <CircularProgress sx={{ color: 'white' }} size={20} /> : (
                    <>
                        {address ? formatWalletAddress(address, true) : 'Connect Wallet'}
                    </>
                )}
            </button>
        </div>
    )
}

export default ConnectBtn
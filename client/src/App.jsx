import { useContext, useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import StatesContext from "./context/StatesContext"
import Profile from "./pages/Profile"
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import CreateCompany from "./pages/master/CreateCompany"
import AuthRoute from "./routes/AuthRoutes"
import ProtectedRoute from "./routes/ProtectedRoute"
import Companies from "./pages/master/Companies"
import MasterInvoice from "./pages/master/MasterInvoice"
import Shipments from "./pages/user/Shipments"
import CreateShipments from "./pages/user/CreateShipments"
import Forgotpassword from "./pages/auth/Forgotpassword"
import Resetpassword from "./pages/auth/Resetpassword"
import Trackings from "./pages/master/Trackings"
import MyTrackings from "./pages/user/MyTrackings"

const App = () => {

  const context = useContext(StatesContext)
  const { state, handleStateChange } = context;

  useEffect(() => {

    if (state.error) {
      toast.error(state.error, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        toastClassName: "rounded-lg",
        className: 'text-[16px] mt-[75px] mx-auto md:mt-0 w-[320px] h-full rounded-md relative z-50',
        style: { borderRadius: '15px' },
      });
      handleStateChange({ error: '' })
    }

    if (state.success) {
      toast.success(state.success, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        toastClassName: "rounded-lg",
        className: 'text-[16px] mt-[75px] mx-auto md:mt-0 w-[320px] h-full rounded-md relative z-50',
        style: { borderRadius: '15px' },
      });
      handleStateChange({ success: '' })
    }

  }, [state.error, state.success])

  useEffect(() => {

    window.scrollTo(0, 0)

  }, [location])


  // useEffect(() => {
  //   mutation.mutate()
  // }, [])


  return (
    <div className="max-w-[100vw] overflow-hidden">

      <ToastContainer />

      <Routes>


        <Route element={<AuthRoute />} >
        </Route>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/master/company/create" element={<CreateCompany />} />
        <Route path="/master/companies" element={<Companies />} />
        <Route path="/master/invoice" element={<MasterInvoice />} />
        <Route path="/master/tracking" element={<Trackings />} />

        <Route path="/shipments" element={<Shipments />} />
        <Route path="/shipment/create" element={<CreateShipments />} />
        <Route path="/tracking" element={<MyTrackings />} />

        <Route path="/profile" element={<Profile />} />
        <Route path="/forgotpassword" element={<Forgotpassword />} />
        <Route path="/resetpassword/:resetToken" element={<Resetpassword />} />

        <Route element={<ProtectedRoute />} >
        </Route>

      </Routes>
    </div>
  )
}

export default App

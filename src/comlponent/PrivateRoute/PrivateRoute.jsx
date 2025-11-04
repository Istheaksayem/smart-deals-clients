import { use } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../../Context/AuthContext';

const PrivateRouter = ({children}) => {
    const {user,loading}=use(AuthContext)
    // console.log(user)

    const location =useLocation()
    console.log(location)

    if(loading){
       return <span className="loading loading-spinner text-primary"></span>
    }

    if(user && user?.email){

        return children;
    }
    return <Navigate state={location.pathname} to="/login"></Navigate>
};

export default PrivateRouter;
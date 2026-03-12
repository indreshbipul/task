import {Routes, Route} from 'react-router-dom';
import List from '../pages/List';
import Login from '../pages/Login';
import Details from '../pages/Details';
import Analytics from '../pages/Analytics';
import ProtectedRoutes from './ProtectedRoutes';
import PublicOnlyRoutes from './publicOniyRoutes';


function Router(){
    return(
        <Routes>
            <Route path='/list' element={<ProtectedRoutes><List /></ProtectedRoutes>} />
            <Route path='/login' element={<PublicOnlyRoutes><Login /></PublicOnlyRoutes>} />
            <Route path='/details/:id' element={<ProtectedRoutes><Details /></ProtectedRoutes>} />
            <Route path="/analytics" element={<ProtectedRoutes><Analytics /></ProtectedRoutes>} />
            {/* <Route path='*' element={<NotFound />} />  THIS THE bUG  I LEFT OVER FOR YOU TO FIX */}
        </Routes>
    )
}

export default Router;
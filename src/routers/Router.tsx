import {Routes, Route} from 'react-router-dom';
import List from '../pages/List';
import Login from '../pages/login';

function Router(){
    return(
        <Routes>
            <Route path='/list' element={<List />} />
            <Route path='/login' element={<Login />} />
            {/* <Route path='/details/:id' element={<Register />} /> */}
            {/* <Route path='*' element={<NotFound />} />  THIS THE bUG  I LEFT OVER FOR YOU TO FIX */}
        </Routes>
    )
}

export default Router;
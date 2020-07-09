import React from 'react';
import Index from './Pages/Index'
import Login from './Pages/Login'
import Pwd from './Pages/Permissions/Password'
import Power from './Pages/Permissions/Power'
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    HashRouter,
    Switch
} from 'react-router-dom'
import navRouter from "./Router/Router";
import ClassModel from "./Pages/TeachingManagement/ClassModel"
 //   <Pwd/>
        // <ClassModel/>
function App() {
  return (
      // <Router>
      //     <div>
      //         <HashRouter>
      //             <Switch>
      //                 <Route path="/" exact render={()=><Redirect to="/Login"/>}/>
      //                 <Route path="/Login" component={Login}/>
      //                 <Route path="/Index" render={()=>
      //                     <Index>
      //                         <navRouter/>
      //                     </Index>
      //                 }/>
      //             </Switch>
      //         </HashRouter>
      //     </div>
      // </Router>
    <ClassModel/>
  )
}

export default App;

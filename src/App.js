import React from 'react';
import Index from './Pages/Index'
import Login from './Pages/Login'
import Re from './Pages/Permissions/Role'
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    HashRouter,
    Switch
} from 'react-router-dom'
import navRouter from "./Router/Router";
function App() {
  return (
      <Router>
          {/*<Re/>*/}
          <div>
              <HashRouter>
                  <Switch>
                      <Route path="/" exact render={()=><Redirect to="/Login"/>}/>
                      <Route path="/Login" component={Login}/>
                      <Route path="/Index" render={()=>
                          <Index>
                              <navRouter/>
                          </Index>
                      }/>
                  </Switch>
              </HashRouter>
          </div>
    </Router>
  )
}

export default App;

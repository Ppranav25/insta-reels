
import './App.css';
import React ,{useContext} from 'react';
import {BrowserRouter, Switch , Route , Redirect} from 'react-router-dom';
import Login from './component/Login';
import Feed from './component/Feed';
import SignUp from './component/SignUp';
import auth from './firebase' ;
import AuthProvider, { AuthContext } from './AuthProvider'
let isSigned= true;
function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
    <Switch>
      
      <Route path = "/login"  component= {Login}></Route>
      <Route path = "/signup" component= {SignUp}></Route>
      <PrivateRoute path = "/" exact comp= {Feed}></PrivateRoute>
     

    
    
    </Switch>
    </AuthProvider>
    </BrowserRouter>
  );
}
function PrivateRoute(parentProps){
  let Component= parentProps.comp;
  let{currUser}= useContext(AuthContext);
  return(
    <Route   {...parentProps} render ={
       (props) => {
       // <Login></Login>
       return  currUser!=null?<Component {...props}></Component>:<Redirect to ="/login"></Redirect>

      }

    } ></Route>
    
    
    
   
  )

       
}
export default App;

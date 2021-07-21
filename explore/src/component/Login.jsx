import React, {useState, useEffect, useContext} from 'react'
import { AuthContext } from '../AuthProvider';
import auth from '../firebase';
import { Container, Grid , Paper , TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import SignUp from './SignUp';


export default function Login(props) {
   
    let {login}= useContext(AuthContext)
     const[email,setEmail]= useState("");
     const[password,setPass]= useState("");
    
     const onSubmit = async(e)=>{
        e.preventDefault();
         try{
         await login(email,password)
         props.history.push("/"); 
         }catch(err){
             console.log(err)
         }


     }

     const onSignup= ()=>{
        props.history.push("/signup")
     }
     

    return (
        <div>
            {/* <Container>
               <Grid container>
                 <Grid item  xs={6} sm={6} md ={6} lg={6}>
                   <Paper> hello  </Paper>


                 </Grid>
                 <Grid item xs={6} sm={6} md ={6} lg={6}>
                 <form className={classes.root} noValidate autoComplete="off">
              
                <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                </form>

                     
                 </Grid>





               </Grid>





            </Container> */}
            <h1>LOGIN</h1>
            <input type= "email" onChange={(e)=>{setEmail(e.target.value)}} ></input>
            <input type= "password" onChange={(e)=>{setPass(e.target.value)}}></input>
            <button type= "submit" onClick={onSubmit}>Submit</button>

            <button type="submit" onClick={onSignup}>Signup</button>
        </div>
    )
}

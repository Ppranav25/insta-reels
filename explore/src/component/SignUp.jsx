import { PhotoSizeSelectLargeRounded } from '@material-ui/icons';
import React, {useState, useContext} from 'react'
import { AuthContext } from '../AuthProvider';
import { storage , firestore , database} from "../firebase"

export default function SignUp(props) {
const[email , setEmail]= useState("");
const[password, setPassword]= useState("");
const[username, setUsername]= useState("");
const[file, setFile]= useState(null);
let {signup}= useContext(AuthContext);
function handleImg(e){
    let file= e?.target?.files[0];
    if(file!=null){
        console.log(file);
        setFile(e.target.files[0]);
    }

}
 async function handleSubmit(e){
     e.preventDefault()
     try{
     let res= await signup(email, password);  
     console.log(res);
     let uid = res.user.uid;
     const uploadTaskListener= storage.ref(`/users/${uid}`).put(file);
     uploadTaskListener.on('state_changed',fn1, fn2, fn3)
     function fn1(snapshot){
       var progress= (snapshot.bytesTransferred/snapshot.totalBytes)*100;
     }
      function fn2(){
      
     }
     async function fn3(){
      let downloadUrl= await uploadTaskListener.snapshot.ref.getDownloadURL();
      database.users.doc(uid).set({
        email: email,
        userId: uid,
        username,
        createdAt: database.getUserTimeStamp(),
        profileUrl: downloadUrl,
        postsArr: []

      })
     }

     props.history.push("/");

     }catch(err){
       console.log(err);
     }
}

    return (
        
<form  onSubmit= {handleSubmit}>
<div>
<div>
  <label>
    Enter your Username:
    </label>
    <input type="text" value={username} onChange = {(e)=>{setUsername(e.target.value)}} />
    </div>
    <div>
  <label>
    Enter your Email:
    </label>
    <input type="email" value={email} onChange = {(e)=>{setEmail(e.target.value)}} />
    </div>
    <div>
  <label>
    Enter your Password:
    </label>
    <input type="password" value={password} onChange = {(e)=>{setPassword(e.target.value)}}/>
    </div>
    <div>
  <label>
    Upload profile pic:
  </label>
    <input type="file" accept= "image/*" onChange= {handleImg} />
    </div>
  <button type ="submit">Submit</button>
  </div>
  </form>
        
    )
}

// import React ,{useState,useContext, useEffect}from 'react'
// import { AuthContext } from '../AuthProvider'
// import { Button} from '@material-ui/core';
// import BackupIcon from '@material-ui/icons/Backup';
// import auth from '../firebase';
// import { storage , firestore , database} from "../firebase"
// import { SettingsInputSvideoRounded } from '@material-ui/icons';
// export default function Feed() {
//     const [videos, setVideos]= useState([]);
//     const [user, setUser]= useState(null);
//     const [disp, setDisp]= useState([]);
//     const[ id1, setId1]= useState(0);
//     let {logout , currUser}= useContext(AuthContext);
// useEffect(async () => {

//     let x= await database.users.doc(currUser.uid).get()
//     setUser(x.data());
//      console.log(currUser)
// },[videos])


//     const videoUpload=(e)=>{
//         let file = e.target.files[0];
//         console.log(file);

//         setVideos(file);
        
//     }
//     const renderVideos =(e)=>{
//         e.preventDefault();
//         let uid = currUser.uid;

//         const listener= storage.ref(`/posts/${uid}`).put(videos)
//          listener.on('state_changed',fn1,fn2,fn3);

//          function fn1(snapshot){
//             var progress= (snapshot.bytesTransferred/snapshot.totalBytes)*100;
//             console.log(progress)
//          }
//          function fn2(){

//          }

//         async function fn3(){
//             let downloadUrl= await listener.snapshot.ref.getDownloadURL();
//             let postObj= {
//                 likes:[],
//                 comments:[],
//                 postUrl: downloadUrl,
//                 auid: uid,
//                 createdAt: database.getUserTimeStamp()
//                 }

//                 let pid= await database.posts.add(postObj);
                
//                  let vid=[]; let finalvid=[];
//                 let x= await database.users.doc(currUser.uid).get().then(function(docs){
//                     let y= docs.data();
                     


//                     database.users.doc(uid).update({
//                         postsArr: [...y.postsArr, pid.id]
//                    })

//                   for(let i=0; i<y.postsArr.length;i++){
//                       vid.push(y.postsArr[i]);
//                   }
                    
//                 })
//                for(let i=0;i<vid.length;i++){
//                    console.log(vid[i])
//                 let a=  await database.posts.doc(vid[i]).get().data()
                
//                      finalvid[i]= a.postUrl
//                         console.log(finalvid[i]);

                    
                
//                }
// setDisp(finalvid);
// // console.log(disp);
// // console.log(finalvid);
//          }
         

//     }



//     return (
//         <div>
//             <h1>Feed</h1>
//             <input type="file"accept="video/*" onChange={videoUpload}></input>
//             <Button variant= "contained" color="primary" style ={{
//                 marginLeft:"8px",
//                 backgroundColor:"blue"
//             }} onClick={renderVideos}>Upload<BackupIcon></BackupIcon>    </Button>
//             <button type="submit" onChange={logout}>Logout</button>
            
//             {
                
//                  disp.map((vidio) => {
//                      console.log(vidio)
                     
//                      return(
                         
//                     <>
//                     <div>
                    
//                     <video controls muted = "true" id = {Math.random()}  style= {{
//                        height:"80vh",marginBottom:"3rem",marginTop:"2rem",border:"1px solid", width: "25rem"
//                     }}>
//                     <source src={
//                         vidio
//                     } type="video/mp4"
    
//                     ></source>
//                 </video >
//                 </div>
//                 </>
//                      )
//                   })
    
             

//             }



//         </div>
//     )
// }



import React, { useContext, useEffect, useState } from 'react'

import { Avatar } from '@material-ui/core'
import auth, { firestore} from '../firebase'
import { database } from '../firebase'
import { Box } from '@material-ui/core'
import { Button } from '@material-ui/core'
import { storage } from '../firebase'
//import uuid from 'react-uuid'
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import Card from '@material-ui/core/Card';
import { AuthContext } from '../AuthProvider'
function Feed() {
    const {currUser} = useContext(AuthContext)
    const [users , setUser] = useState([]);
    const [file , setFile] = useState();
    const[myvideos , setVideos] = useState([]);
    const[isLoading,setLoading] = useState(true);
    function handleFile(e){
        let myFile = e?.target?.files[0]
        if(myFile!=null){
            setFile(myFile)
        }
    }
    function handlePostStore(e){
        e.preventDefault()
        try {
            let listener = storage.ref(`/posts/${currUser.uid}`).put(file)
            listener.on('stage_changed' , fn1,fn2,fn3)
            function fn1(snapshot){
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                console.log(progress)
            }
            function fn2(error){
                console.log(error)
            }
            async function fn3(){
                let uploadedImageurl = await listener.snapshot.ref.getDownloadURL()
                const postID = Math.random()
                database.posts.doc(postID).set({
                    postLink:uploadedImageurl,
                    timeOfUpload:database.time,
                    likes:[],
                    comments:[]
                })
                // let previous = database.user.myPosts
                database.user.doc(users.userid).update({
                    myPosts: [...users.myPosts,uploadedImageurl]
                });
                let x = [...myvideos,uploadedImageurl]
                setVideos(x)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        async function fetch(){
            setLoading(true);
            var userID = currUser.uid;
            let dataobj = await database.user.doc(userID).get();
            let x = dataobj.data();
            console.log(x);
            setUser(x);
            setLoading(false);
            console.log(users);
        }
        fetch();
    },[])
    useEffect(()=>{
        async function fetch2(){
        var userID = currUser.uid;
            let dataobj = await database.user.doc(userID).get();
            let x = dataobj.data().myPosts;
            setVideos(x)
        }
        fetch2(); 

    },[])
    return (
        <>
        {isLoading==true?<div>LOADING...</div>:
        <Box component='div'>
            {/* {console.log(users)} */}
            <Avatar src={users.profilepicURL}/>
            
        </Box>
        }
        <div>
        <input type="file" accept="image/*"
                onChange={handleFile}></input> 
        <Button variant="contained" color="secondary" onClick = {handlePostStore}>
            Upload
        </Button>
        <div className = "video-container">
            {/* {console.log(myvideos)} */}
        {myvideos.map((url)=>{
            return(
                <Card>
            <Video url = {url} users = {users} currUser = {currUser}>
                
            </Video>
            </Card>
            )
            
        })}
        </div>
        </div>
        </>
    )
}
function Video(props) {
    // const {currUser} = useContext(AuthContext)
    const[Username,setName] = useState("")
    const[CommentsArr,setComment] = useState([])
    const[load,setLoad] = useState(true)
    const[mycomment,setmyComment] = useState('')
    useEffect(() => {
        setName(props.users.name)
        setComment(props.users.comment)
        
    },[])
    function handleInput(e){
        setmyComment(e.target.value)
    }
    function addcomment(){
        let k = [...CommentsArr]
        k.push(mycomment)
        database.user.doc(props.currUser.uid).update({
            comment:k
        })
        setComment(k)


    }
    function active(){
        setLoad(false)
    }
    return (
        <div>
            <video controls muted = "true" style = {{height:"80vh",marginBottom:"3rem",marginTop:"2rem",border:"1px solid"}}>
                <source src = {props.url} type = "video/mp4" />
            </video>
            <ChatBubbleIcon onClick={active}>
            </ChatBubbleIcon>
                {load==true?<div>click to expend</div>:
                <div>
                    {console.log(CommentsArr.length)}
                {CommentsArr.map((comm)=>{ 
                    return(<>
                        <h1>{Username}</h1>
                        <div>{comm}</div>
                        {console.log(comm)}
                        </>)
                    
                })}
                <input type="text" onChange = {handleInput}></input>
                <button onClick = {addcomment}>add</button>
            </div>}
            
        </div>
    )
}    


export default Feed
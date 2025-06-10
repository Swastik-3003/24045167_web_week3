import { useState } from "react";
import Menu from "./MainMenu";
import Create from "./Create"
import Forgot from "./Forgot"
const LandingPage = (props) => {
    const[userName,setUserName] = useState('');
    const[pass,setPass] = useState('');
    const[landShow,setLandShow] = useState(true);
    const[snippets,changeSnippets]=useState([]);
    const[signUp,setSignUp]=useState(false);
    const[loading,setloading]=useState(false);
    const[showModal,setShowModal]=useState(false);
    const[forgotPass,setForgotPass]=useState(false);
    const [createTitle,setCreateTitle] = useState('');
    const [createGroup,setCreateGroup] = useState('');
    const [createLang,setCreateLang] = useState('');
    const[tempState,setTempState]=useState(false);
    const fetchSnips = async(userName) =>{
        setloading(true);
        


        fetch(`http://localhost:8000/api/${userName}/home`,{
          method: 'GET'
        }).then(res => res.json())
          .then(data => {
            
            const s = data.length;
            const newSnip = [];
            const gp = new Set();
            for(let i = 0; i < s; i++){
                if(gp.has(data[i].groupName)){
                    for(let j = 0; j < newSnip.length; j++){
                        if(newSnip[j].groupName === data[i].groupName){
                            const temp = {title: data[i].title,
                                          language: data[i].language,
                                          code:data[i].code,
                                          id:data[i]._id
                            };
                            newSnip[j].snips.push(temp);
                            break;
                        }
                    }
                }
                else{
                    gp.add(data[i].groupName);
                    const temp = {groupName:data[i].groupName,
                        snips:[{
                            title:data[i].title,
                            language:data[i].language,
                            code:data[i].code,
                            id:data[i]._id
                        }]
                    };
                    newSnip.push(temp);
                }
            } 
      
            changeSnippets(newSnip);

          })
          .catch(err => window.alert('Error updating snippets',err))
          setloading(false);
      }
    const p = (e) => {

        setloading(true);
    try{
        e.preventDefault();
        fetch(`http://localhost:8000/api/users/${userName}/${pass}`,{
            method:'GET',
          
            headers:{
                'Content-type':'application/json'
            }
        })
        .then((res)=>{
            if(!res.ok){
                return window.alert('Either credentials or wrong or user does not exist');
            }

            setLandShow(false);
           
            fetchSnips(userName);
        })}
        catch(err){window.alert(err);}  
        finally{
        setloading(false);
        }
    };
    const handleDelete = async (id) => {
        setloading(true);
        const u = userName;
      
        try {
          const res = await fetch(`http://localhost:8000/api/${id}`, {
            method: 'DELETE'
          });
      
          if (!res.ok) {
            window.alert('Operation Failed');
          } else {
            await fetchSnips(userName); 
          }
        } catch (err) {
          window.alert(err);
        } finally {
          setloading(false);
        }
      };
      

      const handleGroupDelete = async (e) => {
        setloading(true);
      
        try {
          const u = userName;
          const g = e.target.closest('.group').innerText;
      
          const res = await fetch(`http://localhost:8000/api/${u}/${g}`, {
            method: 'DELETE'
          });
      
          if (!res.ok) {
            return window.alert('Operation Failed');
          }
      
          await fetchSnips(u); 
        } catch (err) {
          window.alert(err);
        } finally {
          setloading(false);
        }
      };
      

    const changeCode = (code,id) => {
        changeSnippets(prev => {
            for(let i = 0; i < prev.length; i++){
                for(let j = 0; j < prev[i].snips.length; j++){
                    if(prev[i].snips[j].id === id){
                        prev[i].snips[j].code = code;
                        break;
                    }
                }
                
            }
        
        return prev;
    })};
    const changeTitle = (title,id) => {
        changeSnippets(prev => {
            for(let i = 0; i < prev.length; i++){
                for(let j = 0; j < prev[i].snips.length; j++){
                    if(prev[i].snips[j].id === id){
                        prev[i].snips[j].title = title;
                        break;
                    }
                }
                
            }
        console.log(prev);
        return prev;
    })};
    const changeLang = (lang,id) => {
        changeSnippets(prev => {
            for(let i = 0; i < prev.length; i++){
                for(let j = 0; j < prev[i].snips.length; j++){
                    if(prev[i].snips[j].id === id){
                        prev[i].snips[j].language = lang;
                        break;
                    }
                    
                }

            }
        console.log(prev);
        return prev;
    })};

    const applySave = (id,e) => {
        
        setloading(true);
        const u = userName;
        const x = document.querySelector('.bl');
        const t = x.innerText;
        const g = x.parentNode.parentNode.childNodes[0].innerText;
        let c = '';
        let l ='';
        for(let i = 0; i < snippets.length; i++){
            if(snippets[i].groupName === g){
                for(let j = 0; j < snippets[i].snips.length; j++){
                    if(snippets[i].snips[j].title === t){
                        c = snippets[i].snips[j].code;
                        l = snippets[i].snips[j].language;
                        break;
                    }
                }
                break;
            }
        }
        try{
        fetch(`http://localhost:8000/api/${id}`,
            {method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({ code: c,title:t,language:l})
            }
        )
            .then(res => {
                if(!res.ok){
                    return window.alert('Operation Failed');
                }
                window.alert('Saved');
            })}
            catch(err) {window.alert(err);}
        finally{
        setloading(false);
        }
    }
    const downSnips = async(id,fileName) => {
        const response = await fetch(`http://localhost:8000/api/download/${id}`);

        if(!response.ok){
            return window.alert('Failed to download'); 
        }
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName + '.txt';
        a.click();
        URL.revokeObjectURL(url);
            
    }
    const [newUser,setNewUser] = useState('');
    const [newPass,setNewPass] = useState('');
    const [newEmail,setNewEmail] = useState('');
    const newUserCreate = async (newUser,newPass,newEmail) => {
        try {
            const response = await fetch('http://localhost:8000/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user: newUser,
                    pass: newPass,
                    email: newEmail
                })
            }).then(response =>{ 
                if (response.status === 409) {
                    setNewUser('');
                    document.querySelector('.f').focus();
                    return window.alert('User already exists');
                }
                if (!response.ok) {
                    return window.alert('Internal Server Error\nTry again');
                }    
                
                else{
                    window.alert('pass');
                    console.log("Response received:", response); 
                    window.alert('SignUp successful\nPlease login with your credentials');
                    setNewUser('');
                    setNewPass('');
                    setNewEmail('');
                    setSignUp(false);
                }
            })
    
    
        } catch (error) {
            window.alert(error);
            console.error(' error');
        }
    }
    //create New Snippet
    const snipCreate = async (title, group, language) => {
        setloading(true);
        try {
          const rep = await fetch(`http://localhost:8000/api/new/${userName}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              gp: group,
              t: title,
              l: language
            })
          });
      
          if (!rep.ok) {
            window.alert('Internal Server Error');
          } else {
            window.alert('Created');
          }
      

          await fetchSnips(userName);
        } catch (err) {
          window.alert(err);
        } finally {
          setloading(false);
          setShowModal(false);
          setTempState(prev => !prev);
        }
      };
    
    return (
        <>
        {loading && (
            <div className='loadingPage'>
                <div className='spinner'></div>
                
            </div>
        )}
        {forgotPass && <Forgot setForgotPass={setForgotPass} />}
        {showModal ? (<Create snipCreate={snipCreate} createTitle={createTitle} createGroup={createGroup} setCreateTitle={setCreateTitle} setCreateGroup={setCreateGroup} createLang={createLang} setCreateLang={setCreateLang}/>): (<></>)}
        {landShow ?
        signUp ? 
        (<div className='signUp'>
            
            <div className='suImg'>
                <h2>Sign Up ...</h2>
                <div className='image'></div>
                <button className='signuphome' onClick={(e)=>{setSignUp(false);}}>Go back</button>
            </div>
            <div className='suf'>
                <form>
                    <h2>Please fill the following form</h2>
                    <label>Username</label>
                    <input required value={newUser} onChange={(e)=>setNewUser(e.target.value)}  className='f'></input>
                    <label>Password</label>
                    <input required value={newPass} onChange={(e)=>setNewPass(e.target.value)}></input>
                    <label>Email (for recovery, optional)</label>
                    <input value={newEmail} onChange={(e)=>setNewEmail(e.target.value)} type='email'></input>
                    <button className='submitbtn' onClick={(e)=>{e.preventDefault();newUserCreate(newUser,newPass,newEmail);}}>Submit</button>
                </form>
            </div>
        </div>)
        :
        (<div className='landing'>
            <div className='landTitle'>
                <h2>Snippet - Hub</h2>
            </div>
            <div className='credentials'>
                <div className='login-img'></div>
                    
                <form>
                    <label >Username</label>
                    <input className='user' value={userName} placeholder="John Doe.." onChange={(e)=>setUserName(e.target.value)}></input>
                    <label >Password</label>
                    <input className='pass' value={pass} placeholder='1234...' onChange={(e)=>setPass(e.target.value)}></input>
                    <button className='submitbtn' onClick={p}>Submit</button>
                    
                </form>
                <div className='sign-up-box'>
                    <label className='land'>New User?...</label>
                    <button  className='sinn'onClick={(e)=>{setSignUp(true)}}>Sign Up</button><br/>
                    <label className='fgpas'>Forgot Password?...</label>
                    <button className='fgbtn' onClick={(e)=>{setForgotPass(true)}}>Forgot Password</button>
                </div>
            </div>
            
        </div>)
        : <Menu createTitle={createTitle} createGroup={createGroup} snippets={snippets} del={handleDelete} gpdlt={handleGroupDelete} changeCode={changeCode} changeTitle={changeTitle} changeLang={changeLang} apsv={applySave} down={downSnips} setShowModal={setShowModal} setls={setLandShow}/>
        }
        </>
    )
};

export default LandingPage;
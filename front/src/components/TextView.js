import { useEffect,useState } from 'react';

const TextView = (props) => {
    
    
   

    useEffect(() => {
        for(let i = 0; i < props.snippets.length ; i++){
            for(let j =0 ; j < props.snippets[i].snips.length ; j++){
                if(props.snippets[i].snips[j].title === props.toShow){
                    props.changeCodeState(props.snippets[i].snips[j].code);
                    break;
                }
            }
        }    
    }, [props.toShow, props.snippets]);

    const saveCode = (e) => {
        props.changeCode(props.codeState,props.code[0]);
    };
    const saveTitle = (e) => {
        props.changeTitle(props.titleState,props.code[0]);
        console.log(document.querySelector('.titleChange').value);
        props.setOpenFile(document.querySelector('.titleChange').value);
    };
    const saveLang = (e) => {
        props.changeLang(props.langState,props.code[0]);
    };
    const tb = (e) => { 
        if(e.key === 'Tab'){
            e.preventDefault();
            
        }
    };
    
    

    return (
        <div className='workspace'>
            <div className='ws-title'>
                <div>
                    {props.titleChange ? (<h2>Title : {props.code[1]}</h2> ):(<> <label className='changeLabel'>Title : </label><input className='titleChange' onChange={(e)=>{props.changeTitleState(e.target.value);props.code[1]=props.titleState}}></input></>)}
                    {props.titleChange ? (<div className='edit title' onClick={(e)=>props.setTitleChange(!props.titleChange)}></div>) : ( <button onClick={ (e)=>{saveTitle();props.setTitleChange(!props.titleChange);props.code[1]=document.querySelector('.titleChange').value;}}>Save</button>)}
                </div>
                <span className='miscButtons'>
                    <button className='changeview' onClick={(e)=>{props.setms(true)}}>
                        List View
                    </button>
                    <button className='logout' onClick={(e)=>props.setls(true)}>
                        Logout
                    </button>
                </span>
            </div>

            <div className='ws-title second'>
                <div className='gh'>
                    {props.langChange ? (<h2>Language : {props.code[2]}</h2>):(<><label className='changeLabel'>Language : </label><input className='langChange' onChange={(e)=>{props.changeLangState(e.target.value);props.code[2]=props.langState}}></input></>)}
                    {props.langChange ? (<div className='edit title' onClick={(e)=>props.setLangChange(!props.langChange)}></div>):(<button onClick={(e)=>{saveLang();props.setLangChange(!props.langChange);props.code[2]=document.querySelector('.langChange').value;}}>Save</button>)}
                </div>
                <span className='textButtons'>
                    <button className='createText' onClick={(e)=>{props.createNew()}}>
                        Create New
                    </button>
                    <button className='save' style={{backgroundColor:'green'}} onClick={(e)=>props.apsv(props.code[0],e)}>
                        Save
                    </button>
                </span>
            </div>
            <textarea onKeyDown={tb} value={props.codeState} onChange={(e)=>{props.changeCodeState(e.target.value);saveCode();}}></textarea>
        </div>
    )
}

export default TextView;
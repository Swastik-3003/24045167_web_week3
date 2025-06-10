import SnippetsMenu from './SnippetsMenu'
import { useState } from 'react';
import SideView from './SideView'
const Menu = (props) => {

    const[menuShow,changeMenuShow]=useState(true);
    const[openFile,changeOpenFile]=useState([null,null]);
    const changeView = (e) => {

        changeMenuShow((prev)=>{
            prev = !prev;
            return prev;
        });
        
        const title = e.target.closest('.snippet').childNodes[0].data;
        const group = e.target.closest('.section').childNodes[0].innerText;
         
        changeOpenFile(prev => {
            prev[0] = title;
            prev[1] = group;
            return prev;
        });
    }


    return(
        <>  { menuShow ?
            <div className='heading'>
                <h1>Welcome</h1>
                
                    <h3>Create and save your own snippets</h3>
                
                    <button className='plus' onClick={(e)=>{props.setShowModal(true)}}></button>
                
                <SnippetsMenu snippets={props.snippets} changeView={changeView} del={props.del} gpdlt={props.gpdlt} down={props.down}/> 
                
            </div> 
            : <SideView  setms={changeMenuShow} setls={props.setls} createTitle={props.createTitle} createGroup={props.createGroup} snipCreate={props.snipCreate} snippets={props.snippets} openFile={openFile} changeCode={props.changeCode} changeTitle={props.changeTitle} changeLang={props.changeLang} del={props.del} apsv={props.apsv} cms={changeMenuShow} down={props.down} setShowModal={props.setShowModal}/>}
            
        </>
    )
};

export default Menu
import { useState } from 'react';

const Create = (props) => {

    
    return (
        <>
            <div className='ModalBox'>
                <h2>Create New ...</h2>
                <div className='ModalSubBox'>
                    <div className='modalimage'></div>
                    <div className='CreateForm'>
                        <form>
                            <label>Title </label>
                            <input required onChange={(e)=>props.setCreateTitle(e.target.value)} value={props.createTitle}></input>
                            <label>Language</label>
                            <input required onChange={(e)=>props.setCreateLang(e.target.value)} value={props.createLang}></input>
                            <label>Group</label>
                            <input required onChange={(e)=>props.setCreateGroup(e.target.value)} value={props.createGroup}></input>
                            <button className='create' onClick={(e)=>{e.preventDefault();props.snipCreate(props.createTitle,props.createGroup,props.createLang);}}>Create</button>        
                
                        </form>
                            
                    </div>
                    
                </div>
            </div>
        </>
    )
}
export default Create;
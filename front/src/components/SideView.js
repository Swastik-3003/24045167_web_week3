import { useState,useEffect,useRef  } from 'react';
import  TextView  from './TextView';

const SideView = (props) => {
    const[openGroup,setOpenGroup] = useState(new Set());
    const[openFile,setOpenFile] = useState(props.openFile[0]);
    
    const [titleChange,setTitleChange] = useState(true);
    const [langChange,setLangChange] = useState(true);
    const [tempState,setTempState] = useState(false);
    useEffect(()=>{
        setOpenGroup(prev => {
            const next = new Set(prev);
            next.add(props.openFile[1]);
            return next;
        });
    }, [props.openFile]);

    const toggleGroup = (groupName) => {
        setOpenGroup(prev => {
            const next = new Set (prev);
            if(next.has(groupName)){
                next.delete(groupName)
            }
            else{
                next.add(groupName)
            }
            return next;
        });
    };

    const TextAreaRef = useRef(null);
  
    const changeText = (e) =>{
        
        const newTitle = e.target.closest('.snip-item').innerText;
        setOpenFile(newTitle); 
        
    }
    const delSnip = (e,id)=>{
        const x = e.target;
        const no_snips = e.target.closest('.snip-list').childNodes.length;
        const no_group = e.target.closest('.group-list').childNodes.length;
        console.log(no_snips,no_group);
            if(no_snips === 1){
                if(no_group === 1){
                    props.cms(true);
                    props.del(id);
                }
                else{
                    let topGroup = props.snippets[0].groupName;
                    let secTop = props.snippets[1].groupName;
                    if(topGroup === x.closest('.snip-list').parentNode.childNodes[0].innerText){//topGroup === activeGroup
                        if(!openGroup.has(secTop)){
                            setOpenGroup(prev => {
                                const next = new Set(prev);
                                next.add(secTop);
                                return next;
                            })
                        }
                        setOpenFile(props.snippets[1].snips[0].title);
                        props.del(id);
                    }
                    else{
                        if(!openGroup.has(topGroup)){
                            setOpenGroup(prev => {
                                const next = new Set(prev);
                                next.add(secTop);
                                return next;
                            })
                        }
                        setOpenFile(props.snippets[0].snips[0].title);
                        props.del(id);
                    }
                }
             
            }
        
        else{
            const topTitle = x.closest('.snip-list').childNodes[0].innerText;
            if(topTitle === openFile){
                setOpenFile(x.closest('.snip-list').childNodes[1].innerText);
                props.del(id);
            }
            else{
                setOpenFile(topTitle);
                props.del(id);
            }
        }

    }

    let data = props.snippets;
    let code = '';
    
    for(let i = 0; i < data.length; i++){
        for(let j = 0; j < data[i].snips.length ; j++){
            // console.log('OutSide Effect');
            if(data[i].snips[j].title === openFile){
                code = [data[i].snips[j].id,
                        data[i].snips[j].title,
                        data[i].snips[j].language,
                        data[i].snips[j].code];
            }

        }
    }

    const [codeState,changeCodeState] = useState(code[3]);
    const [titleState,changeTitleState] = useState(code[1]);
    const [langState,changeLangState] = useState(code[2]);
    const createNew = () => {
        props.setShowModal(true);
        setOpenFile(props.createTitle);
        setOpenGroup(prev => {
            const next = new Set(prev);
            if(!next.has(props.createGroup)){
                next.add(props.createGroup)
            }
            return next;
        }) 
        
    }
    return (
        <div className='sv'>
        <aside >
            <div className="sidebar">
            <h2> Snippet - Hub </h2>
            <ul className='group-list'>
                {props.snippets.map((group) => (
                    <li key={group.groupName}>
                        <div className={'group-header'}
                        onClick={()=> toggleGroup(group.groupName)}>
                            <div className={openGroup.has(group.groupName) ? "downArrow rotate" : "downArrow"}>
                               
                            </div>
                            {group.groupName}
                        </div>
                        
                        {openGroup.has(group.groupName) && (
                            <ul className="snip-list">
                                {group.snips.map((snip) => (
                                    <li key ={snip.title} className = {`snip-item ${openFile === snip.title ? 'bl' : '' }`}>
                                        {snip.title}
                                    <div className="buttons">
                                        <div className='edit' onClick={(e)=>{changeText(e);setTitleChange(true)}}></div>
                                        <div className='download' onClick={()=>props.down(snip.id,snip.title)}></div>
                                        <div className='delete' onClick={(e)=>delSnip(e,snip.id)}></div>
                                    </div>    
                                    </li> 
                                ))}
                            </ul>
                        )}
                    </li>
                )) }
            </ul>
            </div>
        </aside>
        <TextView  setms={props.setms} setls={props.setls} toShow={openFile}setOpenFile={setOpenFile} snippets={props.snippets} changeCode={props.changeCode} changeTitle={props.changeTitle} changeLang={props.changeLang} apsv={props.apsv} setTitleChange={setTitleChange} titleChange={titleChange} code={code} codeState={codeState} changeCodeState={changeCodeState}
        titleState={titleState} changeTitleState={changeTitleState} langState={langState} changeLangState={changeLangState} langChange={langChange} setLangChange={setLangChange} createNew={createNew}/>
        </div>
    )
}

export default SideView;
import { useState } from 'react';
import Snips from './Snips';

const SnippetsMenu = (props) => {
    // const s = props.snippets.length
    const [showSnips,setShowSnips] = useState(props.snippets.map((element) => (false)));
    
    const s = props.snippets.length;
    console.log(s);
    // console.log();
    const rot = (e) => {

        const k = e.target.classList;
        k.toggle('rotate');
        
        const parent = e.target.closest('.group');
        const key = parent.getAttribute("data-key"); 
        // console.log(key);   
        setShowSnips((showSnips)=>{
            const newSSnips = {...showSnips};
            newSSnips[key-"0"]   = !(newSSnips[key-"0"]);
            // console.log(newSSnips);
            return newSSnips;   
        })  

    }
    
    return (
        
        <>
            {s === 0 ?
            (
            <div className='mainmenuh2'>
            <h2 >
                Looks like you dont have any Snippets now, click on the + sign to create one...
            </h2>
            </div>)
            :
            props.snippets.map((snippet,i) => (
                <div className='section'>
                    <div className='group' data-key={(i).toString()}>
                        {snippet.groupName}
                        <div className='groupbtns'>
                            <div className='delgroup' onClick={props.gpdlt}></div>
                            <div className='downArrow' onClick={rot}></div>
                        </div>
                    </div>
                    <Snips snippets={props.snippets} showSnips={showSnips[i]} index={i} changeView={props.changeView} del={props.del} down={props.down}/>
                </div>
            ))}  
        </>
    
)
}

export default SnippetsMenu;
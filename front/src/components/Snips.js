    const Snips = (props) => {

        if(props.showSnips === true){
            const snips = props.snippets[props.index].snips;
            // console.log(props.snippets[props.index].snips);
            
            return(
                <>
                    {snips.map((elem)=>(
                        <div className='snippet'>
                            {elem.title}
                            <div className='buttons'>
                                <div className='download' onClick={()=>props.downSnips(elem.id,elem.title)}></div>
                                <div className='edit' onClick={props.changeView}></div>
                                <div className='delete' onClick={(e)=>{props.del(elem.id);console.log('pass');}}></div>
                            </div>
                        </div>
                    ))}  
                </>
            )
        }
        else{
            return(
                <>
                </>
            )
        }
    }

    export default Snips;
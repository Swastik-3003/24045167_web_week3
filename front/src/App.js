  import Menu from './components/MainMenu'
import { useState } from 'react';


function App() {
  
  const[snippets,changeSnippets]=useState([
  { groupName:"Sortings",
    snips:  
    [{
      id:"300520251700",
      title:"bubble_sort",
      language:"C++",
      code:`int arr[7] ={23,867,6784,234,564,423,654};
for(int i = 0; i < 7 ; i++){
  for(int j = i; j < 6; j++){
    if(arr[j+1] > arr[j]){
      int temp = arr[j+1];
      arr[j+1] = arr[j];
      arr[j] = temp;
    }
  }
}`
    },
    {
      id:"310520251430",
      title:"merge_sort",
      language:"C++",
      code:"<code to add> "
    }]
  },
  {
    groupName:"Searching",
    snips:
    [{
    id:"010620251130",
    title:"binary_search",
    language:"C++",
    code:"<code to add> "
    }]
  }
])
  
  const changeCode = (code,fileName) => {
    changeSnippets(prev => {
      for(let i = 0; i < prev.length; i++){
        for(let j = 0; j < prev[i].snips.length; j++){
          if(prev[i].snips[j].title === fileName){
            prev[i].snips[j].code = code;
          }
        }
      }
      window.alert('Saved');
      return prev;
    });
    
  }
  return (
    <Menu snippets={snippets} changeCode={changeCode}/>
  ) 
}

export default App;

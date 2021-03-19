import React, {useEffect, useState} from 'react';
import NoteTile from './components/NoteTile';
import notes from './notes.json';
import plusSign from './images/plus.png';
import sortIcon from './images/sort.png';
import './styles/app-styles.css';
import './styles/global-styles.css';

function App() {
  const [displayCount, setDisplayCount] = useState<number>(5);
  const [reverseSort, setReverseSort] = useState<boolean>(false);
  const [selectedTilesArr, setSelectedTilesArr] = useState<number[]>([]);
  const [animation, setAnimation] = useState(0);

  useEffect(() => {
    if (displayCount >= notes.length) (document.getElementById("add-btn") as HTMLButtonElement).disabled = true;
  }, [displayCount]);

  useEffect(() => {
    if (reverseSort) (document.getElementById("sort-img") as HTMLImageElement).classList.add("reverse");
    else (document.getElementById("sort-img") as HTMLImageElement).classList.remove("reverse");
  }, [reverseSort]);

  function handleSelect(e:any, i:number) {
    e.preventDefault();
    if (e.cmdKey||e.metaKey) { // metakey to account for cmd on Mac OS
      setAnimation(1);
      if (selectedTilesArr.includes(i)) {
        setSelectedTilesArr(selectedTilesArr.filter((x) => x !== i));
      } else {
        var tempArr = [...selectedTilesArr];
        tempArr.push(i);
        setSelectedTilesArr(tempArr);
      }
    } else {
      setAnimation(0);
      setSelectedTilesArr([]);
    }
  }

  return (
    <div id="app-container">

        <div className="app-header main">
          {selectedTilesArr.length>0&&<h5 className={animation ? "tooltip-text open-tooltip" : "tooltip-text"}>{selectedTilesArr.length} item{selectedTilesArr.length>1 ? 's' : ''} selected</h5>}
          {selectedTilesArr.length===0&&<h1>Notes</h1>}
          {selectedTilesArr.length===0&&<div className="btn-container">
            <button id="sort-btn" onClick={()=>setReverseSort(!reverseSort)}>
              <img src={sortIcon} id="sort-img" alt="sort" />
            </button>
            <button id="add-btn" onClick={()=>setDisplayCount(displayCount+1)}>
              <img src={plusSign} id="add-img" alt="add" />
            </button>
          </div>}
        </div>

      <div id="app-body">
        <div className="divider-line"/>
        {notes&&notes.slice(0, displayCount)[reverseSort ? 'reverse' : 'slice']().map((note, i) => {
            return <div onClick={(e)=>handleSelect(e, i)} key={i}>{NoteTile(note, selectedTilesArr.includes(i))}</div>;
          }
        )}
      </div>
    </div>
  );
}

export default App;

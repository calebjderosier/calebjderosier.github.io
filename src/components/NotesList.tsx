import React, {useEffect, useState} from 'react';
import NoteTile from './NoteTile';
import notes from '../notes.json';
import plusSign from '../images/plus.png';
import sortIcon from '../images/sort.png';
import '../styles/app-styles.css';
import '../styles/global-styles.css';

function NotesList() {
  const [displayCount, setDisplayCount] = useState<number>(5);
  const [reverseSort, setReverseSort] = useState<boolean>(false);
  const [selectedTilesArr, setSelectedTilesArr] = useState<number[]>([]);
  const [animation, setAnimation] = useState(0);

  /*
  * Runs on update of displayCount value 
  * Disables "add" button when number of displayed tiles is >= to the # of notes available to add
  */
  useEffect(() => {
    if (displayCount >= notes.length) (document.getElementById("add-btn") as HTMLButtonElement).disabled = true;
  }, [displayCount]);

  /*
  * Runs on updates of reverseSort value — adds or removes "reverse" class to CSS accordingly
  */
  useEffect(() => {
    if (reverseSort) (document.getElementById("sort-img") as HTMLImageElement).classList.add("reverse");
    else (document.getElementById("sort-img") as HTMLImageElement).classList.remove("reverse");
  }, [reverseSort]);

  /* 
  * Handles user selecting a note item (including whether or not it's multi-select)
  * 
  * @param e: event handler
  * @param tileNum: number of the tile to select
  */ 
  function handleSelect(e: any, tileNum: number) {
    e.preventDefault();
    if (e.ctrlKey||e.metaKey) { // metakey to account for cmd on Mac OS
      setAnimation(1);
      if (selectedTilesArr.includes(tileNum)) {
        setSelectedTilesArr(selectedTilesArr.filter((x) => x !== tileNum));
      } else {
        var tempArr = [...selectedTilesArr];
        tempArr.push(tileNum);
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
          {selectedTilesArr.length>0 && <h5 className={animation ? "tooltip-text open-tooltip" : "tooltip-text"}>{selectedTilesArr.length} item{selectedTilesArr.length>1 ? 's' : ''} selected</h5>}
          {selectedTilesArr.length===0 && <h1>Notes</h1>}
          {selectedTilesArr.length===0 && <div className="btn-container">
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

export default NotesList;

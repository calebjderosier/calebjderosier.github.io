import React, {useState} from 'react';
import NoteTile from './components/NoteTile';
import notes from './notes.json';
import plusSign from './images/plus.png';
import sortIcon from './images/sort.png';
import './styles/app-styles.css';
import './styles/global-styles.css';

function App() {
  const [reverseSort, setReverseSort] = useState<boolean>(false);
  const [displayCount, setDisplayCount] = useState<number>(5);
  const [selectedTilesArr, setSelectedTilesArr] = useState<number[]>([]);

  function handleClick(e:any, i:number) {
    e.preventDefault();
    if (e.cmdKey||e.metaKey) {
      if (selectedTilesArr.includes(i)) {
        setSelectedTilesArr(selectedTilesArr.filter((x) => x !== i));
      } else {
        var tempArr = [...selectedTilesArr];
        tempArr.push(i);
        setSelectedTilesArr(tempArr);
      }
    } else {
      setSelectedTilesArr([]);
    }
  }

  return (
    <div className="app-container">

      {selectedTilesArr.length>0 ?
      <div className="app-header">
        <h5 className="tooltip-text">{selectedTilesArr.length} item{selectedTilesArr.length>1 ? 's' : ''} selected</h5>
      </div>  
      : 
      <div className="app-header">
        <h1>Notes</h1>
        <div className="btn-container">
          <button className="sort-btn" onClick={()=>setReverseSort(!reverseSort)}>
            <img src={sortIcon} className={reverseSort ? "sort-img reverse" : "sort-img"} alt="sort" />
          </button>
          <button className="add-btn" onClick={()=>setDisplayCount(displayCount+1)}>
            <img src={plusSign} className="add-img" alt="add" />
          </button>
        </div>
      </div>}

      <div className="app-body">
        <div className="divider-line"/>
        {notes&&!reverseSort&&notes.map((note, i) => {
            if (i<displayCount) return <div onClick={(e)=>handleClick(e, i)} key={i}>{NoteTile(note, selectedTilesArr.includes(i))}</div>;
            else return null;
          }
        )}
        {notes&&reverseSort&&notes.slice().reverse().map((note, i) => {
            if (i<displayCount) return <div onClick={(e)=>handleClick(e, i)} key={i}>{NoteTile(note, selectedTilesArr.includes(i))}</div>;
            else return null;
          }
        )}
      </div>
    </div>
  );
}

export default App;

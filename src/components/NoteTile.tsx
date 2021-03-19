import React from 'react';
import '../styles/note-tile-styles.css';
import '../styles/global-styles.css';
import calendar from '../images/calendar.png';
import clock from '../images/clock.png';
import code from '../images/code.png';
import imageList from '../images/imageList.png';
import list from '../images/list.png';
import lock from '../images/lock.png';
import pound from '../images/pound.png';

interface Note {
    title: string;
    body: string;
    date: string;
    imgType: string;
    tags: string[];
    isLocked: boolean;
}

function NoteTile(note:Note, isSelected:boolean) {
    // get the imported image corresponding to the appropriate type
    function getNoteIcon(imgType:string) {
        switch (imgType) {
            case 'calendar': return <img src={calendar} className="square-note-icon" alt="note-icon"/>;
            case 'clock': return <img src={clock} className="square-note-icon" alt="note-icon"/>;
            case 'code': return <img src={code} className="rct-note-icon" alt="note-icon"/>;
            case 'list': return <img src={list} className="rct-note-icon" alt="note-icon"/>;
            default: return <img src={imageList} className="rct-note-icon" alt="note-icon"/>;
        }
    }

    // check if date string corresponds to today's date
    // not implemented yet because parsing dates is the absolute worst 
    function getDate(date:string) {
        if (date) return <p id="date-text">{note.date}</p>;
        else return null;
    }

    return (
        <div className={"note-tile"+(isSelected?" selected":"")}>
            <div id="note-icon-container">
                {getNoteIcon(note.imgType)}
            </div>

            <div id="note-container">
                <div id="content-container">
                    <div id="title-container">
                        <h3 id="note-title">{note.title}</h3>
                        {note.isLocked&&<img src={lock} className="lock-img" alt="locked-icon"/>}
                    </div>
                    {note.body&&<h6 id="note-body">{note.body}</h6>}
                    {getDate(note.date)}
                    <div id="tags-container">
                        {note.tags&&note.tags.map((tag, i) => {
                            return <div className="tag-item" key={i}>
                                <img src={pound} className="pound-img" alt="pound-sign"/>
                                <p className="tag-text">{tag}</p>
                            </div>
                        })}
                    </div>
                </div>
                
                <div className="divider-line"/>
            </div>
        </div>
    );
}

export default NoteTile;

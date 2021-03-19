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
    function getImgSrc(imgType:string) {
        switch (imgType) {
            case 'calendar': return calendar;
            case 'clock': return clock;
            case 'code': return code;
            case 'list': return list;
            default: return imageList;
        }
    }

    // check if date string corresponds to today's date
    // not implemented yet because parsing dates is the absolute worst 
    function getDate(date:string) {
        if (date) return <p className="date-text">{note.date}</p>;
        else return null;
    }

    return (
        <div className={isSelected ? "note-tile selected" : "note-tile"}>
            <div className="note-icon-container">
                <img src={getImgSrc(note.imgType)} className="note-img" alt="note-icon"/>
            </div>

            <div className="note-container">
                <div className="content-container">
                    <div className="title-container">
                        <h3 className="note-title">{note.title}</h3>
                        {note.isLocked&&<img src={lock} className="lock-img" alt="locked-icon"/>}
                    </div>
                    {note.body&&<h6 className="note-body">{note.body}</h6>}
                    {getDate(note.date)}
                    <div className="tags-container">
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

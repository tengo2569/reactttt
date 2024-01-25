import React, { useState } from 'react';
import './card.css';

interface Task {
  id: number;
  text: string;
}


const time = (): string => {
  const curr: Date = new Date();
  const hrs: number = curr.getHours();
  const mnts: number = curr.getMinutes();
  const currhrs: string = hrs < 10 ? `0${hrs}` : `${hrs}`;
  const currmnts: string = mnts < 10 ? `0${mnts}` : `${mnts}`;
  return `${currhrs}:${currmnts}`;
};

const date = (): string => {
  const curr1: Date = new Date();
  const change: Intl.DateTimeFormatOptions = { day: 'numeric', weekday: 'short' as const }; 
  return curr1.toLocaleDateString('en-US', change);
};


const Card = () => {
  const [notes, donote] = useState<Task[]>([]);
  const [inputValue, newvalue] = useState<string>('');

  const change1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    newvalue(event.target.value);
  };

  const result = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputValue.trim() !== '') {
      const newTask: Task = {
        id: Date.now(),
        text: inputValue.trim()
      };
      donote([...notes, newTask]);
      newvalue('');
    }
  };

  const handledelete = (id: number) => {
    donote(notes.filter(note => note.id !== id));
  };

  return (
    <>
      <div className='bigbox'>
        <h1>Todo</h1>
        <div className='box1'>
          <h2>{date()}</h2>
          <h3>{time()} AM</h3>
          <form onSubmit={result}>
            <div className='input'>
              <input
                maxLength={30}
                placeholder='Note'
                value={inputValue}
                onChange={change1}
              />
              <button type='submit' className='btn1'>
                <img src="./cross.svg" alt='Add Task' />
              </button>
            </div>
          </form>
          <div className='notes'>
            {notes.map(task => (
              <div key={task.id} className='task'>
                <img className='taskimg' src="./circempty.svg" alt="Task Icon" />
                <img className='bin' src="./bin.svg" alt="Delete Task" onClick={() => handledelete(task.id)} />
                <span className='maintxt'>{task.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;

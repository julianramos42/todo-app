import './App.css';
import { useRef } from 'react';
import { useState, useEffect } from 'react';

function App() {
  let task = useRef()
  let [active,setActive] = useState([])
  let [completed, setCompleted] = useState([])

  function createTask(){
    active.push(task.current.value)
    localStorage.setItem('active', JSON.stringify(active))
    task.current.value = ''
    getData()
  }

  function getData() {
    setActive(JSON.parse(localStorage.getItem('active')) || [])
    setCompleted(JSON.parse(localStorage.getItem('completed')) || [])
  }

  function removeTask(e){
    if(e.target.checked){
      let filter = active.filter(task => task !== e.target.parentElement.textContent)
      completed.push(e.target.parentElement.textContent)
      localStorage.setItem('active', JSON.stringify(filter))
      localStorage.setItem('completed', JSON.stringify(completed))
      setTimeout( () => {
        getData()
      },100)
    }else{
      let filter = completed.filter(task => task !== e.target.parentElement.textContent)
      active.push(e.target.parentElement.textContent)
      localStorage.setItem('completed', JSON.stringify(filter))
      localStorage.setItem('active', JSON.stringify(active))
      setTimeout( () => {
        getData()
      },100)
    }
  }

  useEffect( () => {
    getData()
  },[])

  return (
    <main>
      <h1>#todo</h1>
      <nav>
        <div className='status'>
          <div>
            <h3>All</h3>
            <div className='active-page'></div>
          </div>
          <div>
            <h3>Active</h3>
            <div></div>
          </div>
          <div>
            <h3>Completed</h3>
            <div></div>
          </div>
        </div>
        <div className='status-bar'></div>
      </nav>
      <div className='add-container'>
        <input type='text' name='todo' placeholder='add details' ref={task}/>
        <button type='button' className='add-btn' onClick={createTask}>Add</button>
      </div>
      <div className='todo-container'>
        {
          active.length ? active.map((task,i) => {
            let card = <label key={i}><input type='checkbox' onClick={removeTask} name='task' checked={false}/>{task}</label>
            return card
          }) : <></>
        }
        {
          completed.length ? completed.map((task,i) => {
            let card = <label key={i} className='completed'><input type='checkbox' onClick={removeTask} name='task' checked={true}/>{task}</label>
            return card
          }) : <></>
        }
      </div>
    </main>
  );
}

export default App;

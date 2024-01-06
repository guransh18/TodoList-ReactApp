import React, {useState, useEffect} from "react";
import './App.css';
import Form from "./components/Form";
import TodoList from "./components/TodoList"; 

function App() {
  //state stuff
  const [inputText, setInputText] = useState("");
  const[todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const[filteredTodos, setFilteredTodos] = useState([]);
  
  //Run once when the app starts
  useEffect(()=> {
    getLocalTodos();
  },[]);
  
  //UseEffect
  useEffect(()=>{
    filterHandler();
    saveLocalTodos();
  },[todos,status]);

  //functions
  const filterHandler=()=>{
    switch(status){
      case 'completed':
        setFilteredTodos(todos.filter(todo=>todo.completed===true));
        break;
      case 'uncompleted':
        setFilteredTodos(todos.filter(todo=>todo.completed===false));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  }
  //save to locall
  const saveLocalTodos = () => {
      localStorage.setItem("todos",JSON.stringify(todos));
  }
  const getLocalTodos = () => {
    if(localStorage.getItem("todos")===null){
      localStorage.setItem("todos",JSON.stringify([]));
    } else {
      let todoLocal = JSON.parse(localStorage.getItem("todos"));
      setTodos(todoLocal);
    }
  }

  return (
    <div className="App">
    <header>
      <h1>Guransh's Todo List</h1>
    </header>
    <Form 
      todos={todos} 
      inputText={inputText} 
      setTodos={setTodos} 
      setInputText={setInputText}
      setStatus={setStatus}
    />
    <TodoList filteredTodos = {filteredTodos} todos={todos} setTodos={setTodos} />
    </div>

  );
}

export default App;

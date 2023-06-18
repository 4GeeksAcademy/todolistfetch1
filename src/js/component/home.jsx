import React, {useState, useEffect} from "react";


//create your first component
const Home = () => {
	const [todos, setTodos] = useState(["laundry", "gym", "work"])
	const [task, setTask] = useState({})

	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/stewartbenson")
		.then((res) => {
			return res.json()
		})
		.then((data) =>{
			setTodos(data)
		})
	},[])
	
	useEffect(()=>{
			fetch("https://assets.breatheco.de/apis/fake/todos/user/stewartbenson", {
			  method: "PUT",
			  body: JSON.stringify(todos),
			  headers: { "Content-type": "application/json" },
			})
			  .then((res) => {
				return res.json();
			  })
			  .then((res) => console.log(res))
			  .catch((err) => {
				console.log(err);
			  });
		  },[todos]);


	const addTodo=() =>{
		setTodos([...todos,task])
	}
	const removeTodo=(index) =>{
		setTodos((todos) => {
			todos.filter((item, i) => i !==index)
		})
	}
	const inputChange=(e) =>{
		setTask({label: e.target.value,done:false})
	}

	return (
		<div className="text-center">
			<input type="text" onChange={inputChange} />
			<button onClick={addTodo}>Add Todo</button>
			<h1>Todos</h1>
			<ul>
			{todos.length ? todos.map((item, index) => {
				return(
					<li key={index}>{item.label}
					<button onClick={removeTodo(index)}>x</button></li>
				)
			}):null}
			</ul>
		</div>
	);
};

export default Home;

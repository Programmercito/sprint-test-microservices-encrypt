import React, { useState } from 'react'
import './App.css';

function App() {

	const [msg, setMsg] = useState("")
	const handleInputChange = event => {
		setMsg(event.target.value)
	}
	return (
		<div className="App">
			<header className="App-header">
				<form
					onSubmit={event => {
						console.log(msg);
						const requestOptions = {
							method: 'POST',
							headers: { 'Content-Type': 'application/json' },
							body: JSON.stringify({ message: msg })
						};

						fetch('/api/send', requestOptions)
							.then(response => response.json())
							.then((data) => {
								alert(data.resultado);
							}, (error) => {
								alert("Erorr al insertar");
							});



					}}
				>
					<label>secret message</label>
					<input type="text" name="message" value={msg} onChange={handleInputChange} />

					<button>Send to channel secure</button>
				</form>
			</header>
		</div>
	);
}

export default App;

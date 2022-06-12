import React, { useState } from 'react'
import './App.css';

function App() {
  
	const [message, setMessage] = useState("");
  return (
    <div className="App">
      <header className="App-header">
      <form
			onSubmit={event => {
			
			}}
		>
			<label>secret message</label>
			<input type="text" name="message" value={message} />

			<button>Send to channel secure</button>
		</form>
      </header>
    </div>
  );
}

export default App;

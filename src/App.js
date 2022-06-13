import React, { useState } from 'react'
import './App.css';
import { JSEncrypt } from "jsencrypt";

function App() {

	const [msg, setMsg] = useState("")
	const handleInputChange = event => {
		setMsg(event.target.value)
	}
	var encrypt = new JSEncrypt();
	var publicKey = `
	-----BEGIN PUBLIC KEY-----
	MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCgFGVfrY4jQSoZQWWygZ83roKXWD4YeT2x2p41dGkPixe73rT2IW04glagN2vgoZoHuOPqa5and6kAmK2ujmCHu6D1auJhE2tXP+yLkpSiYMQucDKmCsWMnW9XlC5K7OSL77TXXcfvTvyZcjObEz6LIBRzs6+FqpFbUO9SJEfh6wIDAQAB
	-----END PUBLIC KEY-----`;
	encrypt.setPublicKey(publicKey);
 
	return (
		<div className="App">
			<header className="App-header">
				<form 
					onSubmit={event => {
						event.preventDefault();
						console.log(msg);
						var encrypted = encrypt.encrypt(msg);
						const requestOptions = {
							method: 'POST',
							headers: { 'Content-Type': 'application/json','Accept': 'application/json' },
							body: JSON.stringify({ message: encrypted })
						};

						fetch('/api/send', requestOptions)
							.then(response => response.json())
							.then((data) => {
								console.log("exitoso");
								alert(data.resultado);
							})
							.catch((error) => {
								alert("Erorr al enviar "+error.message);
							});


					}}
				>
					<label>secret message</label>
					<input type="text" maxlength="117" value={msg} onChange={handleInputChange} />

					<button>Send to channel secure</button>
				</form>
			</header>
		</div>
	);
}

export default App;

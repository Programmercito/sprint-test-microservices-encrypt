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
    ------BEGIN PUBLIC KEY-----
	MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAu+PDFyKhY1JyJ0X7L1wr
	p6MNrCcXbP0RtCk/UV+wscIiafHFbK9inwCC7KXd2y+bAKuxmS3Jqsv/QtbHUhPg
	vi/iWFjBURLW0y1c0JI+O4Vr0OAeT0q/Xtl3MU5QLH1IiZ4CpfMLa7nhcBntJftC
	mZQ6fK0SIzJuAB75YGFknO6yFcEnHZnTrUGYg3D7vnIWTw0q/CkoejPg3RmI8Hix
	u/MkbEuRrcc3MKcBcp07ad2KnSNUBT5rVd3ipySrej4zr7kGBMgkNnVJ3cOqeuaU
	1SDYADUL7RWY3d9XeS8nzgAoM6OP6vzU14zT2Hh0EnFzag2GExdbzXa44fjTveEX
	0KBNFaRdv9tWbG8Ws0iyUhNea3N4U/bXpYCbl+svTT5LYXRX6c7vb8NTqgpiGDd4
	7URDhwuVHaSWNshRVS08Tfx40LQdyFV7lEYolgyu0ElF/peVC3XETVZIBCReme21
	MJ062GE9AAVaN27KdrKtZ8OS7myZuf+kp/z+4K9ZgM6yYHz24VYVuJOlZ+WLzo3o
	Apf4xhQRwedU+b9i/pbc7ETf5cHLy5x7t7kehlN7hrhwXVuGqeSIQwYe0RBK+lxH
	b5nMFLrEkH521Xi/UFyF4GZPz0L7qDVNoGYr0Ac0ho+HW62y07B2WsKOvX1z10gS
	fWAkHMmTPOMTeriWt+wD/IkCAwEAAQ==
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
					<input type="text"  value={msg} onChange={handleInputChange} />

					<button>Send to channel secure</button>
				</form>
			</header>
		</div>
	);
}

export default App;

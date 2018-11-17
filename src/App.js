import React, { Component } from 'react';
import axios from 'axios';

const SERVER_URL = 'http://localhost:9000';

class App extends Component {
	state = {
		name: '',
		email: '',
		userList: []
	};

	componentDidMount() {
		this.fetchUsers();
	}

	fetchUsers = async () => {
		try {
			const response = await axios.get(`${SERVER_URL}/users`);
			const userList = await response.data;

			this.setState({ userList });
		} catch (error) {
			console.error(error);
		}
	};

	handleUserInput = event => {
		this.setState({ name: event.target.value });
	};

	handleEmailInput = event => {
		this.setState({ email: event.target.value });
	};

	handleDeleteUser = async id => {
		try {
			const response = await axios.delete(`${SERVER_URL}/users/${id}`);
			console.log(response.data);
		} catch (error) {
			console.error(error);
		}
	};

	sendForm = async () => {
		const { name, email, userList } = this.state;
		try {
			const response = await axios.post(`${SERVER_URL}/newUser`, {
				name,
				email
			});

			const newUser = await response.data;
			this.setState({ userList: [ ...userList, newUser ], name: '', email: '' });
			this.fetchUsers();
		} catch (error) {
			console.error(error);
		}
	};

	render() {
		const { name, email, userList } = this.state;
		return (
			<div>
				<input onChange={this.handleUserInput} value={name} type="text" name="user" />
				<input onChange={this.handleEmailInput} value={email} type="email" name="email" />
				<button onClick={this.sendForm}>Submit data</button>
				<div>
					<h1>All current Users</h1>
					{userList.map(item => (
						<div key={item._id}>
							<h3> {item.name}</h3>
							<h5> {item.email}</h5>
							<button onClick={() => this.handleDeleteUser(item._id)}>Delete User</button>
							<hr />
						</div>
					))}
				</div>
			</div>
		);
	}
}

export default App;

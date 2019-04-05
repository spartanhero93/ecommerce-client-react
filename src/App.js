import React, { useEffect, useState } from "react";
import axios from "axios";
// https://randomuser.me/api/
function App() {
  const [users, setUsers] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(
          `https://jsonplaceholder.typicode.com/users`
        );
        setUsers(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, {});

  return (
    <div>
      {users[1] ? (
        users.map(i => (
          <div id={i.id}>
            Hello my name is {i.name},
            <br />
            My Email is {i.email}
            <hr />
          </div>
        ))
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
}
export default App;

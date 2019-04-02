import React from 'react'
import { StateProvider } from './hooks'
import ThemeButton from './ThemeButton'

const App = () => {
  const initialState = {
    theme: {
      primary: 'green',
    },
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case 'changeTheme':
        return { ...state, theme: action.newTheme }
      default:
        return state
    }
  }

  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <h1>Hello Waifus</h1>
      <ThemeButton />
    </StateProvider>
  )
}
export default App
// https://randomuser.me/api/
// function App() {
//   const [users, setUsers] = useState({})

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const { data } = await axios.get(`https://jsonplaceholder.typicode.com/users`)
//         setUsers(data)
//         console.log(data)
//       } catch (error) {
//         console.error(error)
//       }
//     }
//     fetchData()
//   }, {})

//   return (
//     <div>
//       {users[1] ? (
//         users.map(i => (
//           <div id={i.id}>
//             Hello my name is {i.name},
//             <br />
//             My Email is {i.email}
//             <hr />
//           </div>
//         ))
//       ) : (
//         <h1>Loading...</h1>
//       )}
//     </div>
//   )
// }

import React from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'

import { TreeProvider, TreeConsumer } from './contexts/TreeContext'
import Tree from './components/Tree'
import './App.css'

// function Person() {
//   let { url } = useRouteMatch();
//   let { id } = useParams();
//   let person = find(parseInt(id));

//   return (
//     <div>
//       <h3>{person.name}’s Friends</h3>

//       <ul>
//         {person.friends.map(id => (
//           <li key={id}>
//             <Link to={`${url}/${id}`}>{find(id).name}</Link>
//           </li>
//         ))}
//       </ul>

//       <Switch>
//         <Route path={`${url}/:id`}>
//           <Person />
//         </Route>
//       </Switch>
//     </div>
//   );
// }

// const PEEPS = [
//   { id: 0, name: "Michelle", friends: [1, 2, 3] },
//   { id: 1, name: "Sean", friends: [0, 3] },
//   { id: 2, name: "Kim", friends: [0, 1, 3] },
//   { id: 3, name: "David", friends: [1, 2] }
// ];

// function find(id) {
//   return PEEPS.find(p => p.id === id);
// }

function App() {
  class TreeNode {
    constructor(value) {
      console.log('new treenode value: '+ value)
      this.childNodes = []
      this.value = value
      this.id = newId()
    }
  }

  let idCounter = 1
  function newId() {
    return ++idCounter 
  }

  let tree = []

  const add = value => tree.push(new TreeNode(value))
  
  const remove = id => {
    const newTree = tree.map(_id => {
      return _id !== id
    })
    tree = newTree
  }
  
  const edit = (id, value) => {
    const newTree = tree.map(_id => _id === id ? _id.value = value : _id) // TODO fix this I'm tired
    tree = newTree
  }

  const context = { 
    tree: tree,
    add: add,
    edit: edit,
    remove: remove
  }

  return (
    <TreeProvider value={context}>
      <div className="App">
        <header className="App-header">
          <h1>Nodepad</h1>        
        </header>

        <section>
          <Router>
            <TreeConsumer>
            {({ tree, add, edit, remove }) => 
              <Switch>
                <Route path="/:id">
                  <Tree tree={tree} add={add} edit={edit} remove={remove} />
                </Route>
                <Route>
                  <Redirect to="/0" />
                </Route>
              </Switch>
              }
            </TreeConsumer>
          </Router>
        </section>

      </div>
    </TreeProvider>
  )
}

export default App

import React from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'

import Tree from './components/Tree'
import './App.css'

class TreeNode {
  constructor(id, value) {
    // console.log('new treenode id['+id+']. val['+ value+']')
    this.childNodes = []
    this.value = value
    this.id = id
  }
} 

class App extends React.Component {
  state = {
    tree: [],
    idCounter: 1
  }

  remove(id) {
    const newTree = this.tree.map(_id => {
      return _id !== id
    })
    this.setState({tree: newTree})
  }
  
  edit(id, value) {
    const newTree = this.tree.map(_id => _id === id ? _id.value = value : _id) // TODO fix this I'm tired
    this.setState({tree: newTree})
  }

  addNode(event) {    
    event.preventDefault()
    if (event.target[0] === undefined) { // onBlur event fired
      if (event.target.value.trim() === "") return event.target.value = ""
      const newTree = new TreeNode(this.state.idCounter, event.target.value.trim())
      this.setState(prevState => ({
        tree: [...prevState.tree, newTree],
        idCounter: prevState.idCounter + 1
      }))
      event.target.value = ""
    } else { // the form was submitted, the 0th element is the nodeValue named input
      if (event.target[0].value.trim() === "") return event.target[0].value = ""
      const newTree = new TreeNode(this.state.idCounter, event.target[0].value.trim())
      this.setState(prevState => ({
        tree: [...prevState.tree, newTree],
        idCounter: prevState.idCounter + 1
      }))
      event.target[0].value = ""
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Nodepad</h1>        
        </header>

        <section>
          <Router>
            <Switch>
              <Route path="/:id">
                {({ history }) => 
                  <Tree 
                    route={history.location.pathname} 
                    tree={this.state.tree} 
                    edit={this.edit} 
                    remove={this.remove} 
                    addNode={e => this.addNode(e)}
                  /> 
                }
              </Route>
              <Route>
                <Redirect to="/0" />
              </Route>
            </Switch>
          </Router>
        </section>

      </div>
    )
  }
}

export default App

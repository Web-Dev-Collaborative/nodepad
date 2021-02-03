import React from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'

import Tree from './components/Tree'
import Welcome from './components/Welcome'
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
  constructor() {
    super()
    this.state = {
      tree: [],
      idCounter: 0,
      currentVal: "",
      valsById: []
    }
  }

  remove(id) {
    const newTree = this.state.tree.map(_id => {
      return _id !== id
    })
    const newValsById = [...this.state.valsById]
    newValsById[id] = null
    this.setState(prevState => ({
      ...prevState, 
      tree: newTree, 
      valsById: newValsById
    }))
  }
  
  edit(value) {
    this.setState({currentVal: value })
  }

  update(id) {
    const newTree = this.state.tree.map(_id => _id.id === id ? {id: _id.id, childNodes: [..._id.childNodes], value: this.state.currentVal} : _id) 
    const newValsById = [...this.state.valsById]
    newValsById[id] = this.state.currentVal
    this.setState(prevState => ({ ...prevState, tree: newTree, valsById: newValsById, currentVal: null }))
  }

  addNode(event) {    
    event.preventDefault()
    if (event.target[0] === undefined) { // onBlur event fired
      const val = event.target.value.trim()
      if (val === "") return event.target.value = ""
      const newTree = new TreeNode(this.state.idCounter, val)
      this.setState(prevState => ({
        tree: [...prevState.tree, newTree],
        idCounter: prevState.idCounter + 1,
        valsById: [...prevState.valsById, val]
      }))
      event.target.value = ""
    } else { // the form was submitted, the 0th element is the nodeValue named input
      const val = event.target[0].value.trim()
      if (val === "") return event.target[0].value = ""
      const newTree = new TreeNode(this.state.idCounter, val)
      this.setState(prevState => ({
        tree: [...prevState.tree, newTree],
        idCounter: prevState.idCounter + 1,
        valsById: [...prevState.valsById, val]
      }))
      event.target[0].value = ""
    }
  }

  getValue(e) {
    console.log('GET VALUE')
    console.log(e.target.placeholder,e.target.value)
    return e.target.value = e.target.placeholder || e.target.value
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
              <Route path="/welcome">
                <Welcome createRoot={this.addNode.bind(this)} />
              </Route>
              <Route path="/:id">
                {({ history }) => 
                  <Tree 
                    route={history.location.pathname} 
                    tree={this.state.tree} 
                    edit={this.edit.bind(this)} 
                    remove={this.remove.bind(this)} 
                    addNode={this.addNode.bind(this)}
                    update={this.update.bind(this)}
                    valsById={this.state.valsById}
                    getValue={this.getValue}
                  /> 
                }
              </Route>
            </Switch>
          </Router>
        </section>

      </div>
    )
  }
}

export default App

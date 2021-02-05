import React from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'

import Tree from './components/Tree'
import Welcome from './components/Welcome'
import './App.css'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      idCounter: 0,
      nodeChildren: [],
      nodeValues: [],
      childrenShowing: [],
      currentVal: ""
    }
  }

  remove(id) {
    const newTree = this.state.nodeValues.map(_id => {
      return _id !== id
    })
    const newnodeValues = [...this.state.nodeValues]
    newnodeValues[id] = null
    this.setState(prevState => ({
      ...prevState, 
      tree: newTree, 
      nodeValues: newnodeValues
    }))
  }
  
  edit(value) {
    this.setState({currentVal: value })
  }

  update(id) {
    const newTree = this.state.nodeValues.map(node => node.id === id ? {id: node.id, childNodes: [...node.childNodes], value: this.state.currentVal} : node) 
    const newnodeValues = [...this.state.nodeValues]
    newnodeValues[id] = this.state.currentVal
    this.setState(prevState => ({ ...prevState, tree: newTree, nodeValues: newnodeValues, currentVal: null }))
  }

  addNode(event) {    
    event.preventDefault()
    let val
    if (event.target[0] === undefined) { // onBlur event fired
      val = event.target.value.trim()
      if (val === "") return event.target.value = ""
    } else { // the form was submitted, the 0th element is the nodeValue named input
      val = event.target[0].value.trim()
      if (val === "") return event.target[0].value = ""
    }
    this.setState(prevState => ({
      nodeChildren: [...prevState.nodeChildren, []], // at the next index, append an empty array to hold any children of this new node
      nodeValues: [...prevState.nodeValues, val], 
      idCounter: prevState.idCounter + 1,
      childrenShowing: [...prevState.childrenShowing, false] // default to not showing any children
    }))
    event.target[0] === undefined ? event.target.value = "" : event.target[0].value = ""
  }

  getValue(e) {
    console.log('[GET VALUE] placeholder: '+e.target.placeholder+". val: "+e.target.value)
    return e.target.value = e.target.placeholder || e.target.value
  }

  rebase(id) {
    console.log("[REBASING] id: "+id)
    return true
  }

  createRoot(event, history) {
    event.preventDefault()
    if (!event.target || !event.target[0]) return new Error("Unable to create root node. Try again later.")    
    const val = event.target[0].value
    console.log("[CREATE ROOT] val[0]: "+val)

    this.setState(prevState => ({
      nodeChildren: [...prevState.nodeChildren, []],
      nodeValues: [val],
      idCounter: prevState.idCounter,
      childrenShowing: [...prevState.childrenShowing, true]
    }))
    event.target[0].value = ""
    return history.push(`/${val}`)
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
              {({ history }) => 
                <Welcome 
                  history={history}
                  createRoot={this.createRoot.bind(this)} 
                  edit={this.edit.bind(this)} 
                />
              }
              </Route>
              <Route path="/:id">
                {({ history }) => 
                  <Tree 
                    history={history} 
                    nodeChildren={this.state.nodeChildren}
                    nodeValues={this.state.nodeValues}
                    childrenShowing={this.state.childrenShowing}
                    edit={this.edit.bind(this)} 
                    remove={this.remove.bind(this)} 
                    addNode={this.addNode.bind(this)}
                    update={this.update.bind(this)}
                    getValue={this.getValue}
                    rebase={this.rebase.bind(this)}
                  /> 
                }
              </Route>
              <Route>
                <Redirect to="/welcome" />
              </Route>
            </Switch>
          </Router>
        </section>

      </div>
    )
  }
}

export default App

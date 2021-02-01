import React from 'react'
import './App.css'

class Node {
  constructor(value) {
    this.childNodes = []
    this.value = value
  }
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = new Node("root")
  }

  addNode(event) {
    event.preventDefault()
    if (event.target[0] === undefined) {
      // onBlur event fired
      if (event.target.value.trim() === "") return event.target.value = ""
      const newNode = new Node(event.target.value.trim())
      this.setState(prevState => ({
        childNodes : [
          ...prevState.childNodes, 
          newNode 
        ]
      }))
      event.target.value = ""
    } else { 
      // the form was submitted, the 0th element is the nodeValue named input
      if (event.target[0].value.trim() === "") return event.target[0].value = ""
      const newNode = new Node(event.target[0].value.trim())
      this.setState(prevState => ({
        childNodes : [
          ...prevState.childNodes, 
          newNode 
        ]
      }))
      event.target[0].value = ""
    }
  }

  render() {
    return (
      <div className="App">
        <section>
          <div>
            <ul>
              {
                this.state.childNodes.length > 0 && 
                this.state.childNodes.map(child => <li key={child.value}>{child.value} - {child.childNodes.toString()}</li>)
              }
              <li>
                <form onBlur={e => this.addNode(e)} onSubmit={e => this.addNode(e)} >
                  <input type="text" name="nodeValue" placeholder="Enter new item..." />
                </form>
              </li>
            </ul>
          </div>
        </section>

        <header className="App-header">
          <h1>Nodepad</h1>        
        </header>
      </div>
    )
  }
}

export default App

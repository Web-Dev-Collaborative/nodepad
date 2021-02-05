import React from 'react'
// import { Link, Route, Redirect, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'

/*
* Tree class
*/
function Tree(props) { 
  console.log(props.history + " component")
  // TODO find base of current Tree using path
  let currentTree = "/0" //placeholder testing TODO remove
  let currentRoot = 0
  
  // no props and/or tree, redirect to welcome page to start a new tree root
  if (!props || !props.nodeValues || !props.nodeChildren || !props.childrenShowing ) return props.history.push("/welcome")

  return (
    <div key={currentRoot} className="Tree">
      <section className="main">
        <ul>
          <li className="btn-li">{props.nodeValues[currentRoot]}</li> 
          {/* {childrenShowing && */
            props.nodeChildren[currentRoot] &&
            props.nodeChildren[currentRoot].length > 0 && 
            props.nodeChildren[currentRoot].map(childIndex => (
              <li 
                key={childIndex} 
                className="flex flex-li"
              >
                <button className="btn-li" onClick={() => alert("Ok buddeh")} >{props.childrenShowing[childIndex] ? "-" : "+"}</button>
                <button className="btn-li" onClick={() => props.reBase(childIndex)} >&#9660;</button>
                <input
                  type="text"
                  className="btn-li"
                  onChange={e => props.edit(e.target.value)} 
                  onBlur={() => props.update(childIndex)}
                  placeholder={props.valsById[childIndex]}
                  onFocus={e => props.getValue(e)}
                />
              </li>
            ))
          }
        </ul>
        <form onBlur={props.addNode} onSubmit={props.addNode}>
          <input type="text" name="nodeValue" className="btn-li" placeholder="Enter new item..." />
        </form>
      </section>
    </div>
  )
}

Tree.propTypes = {
  addNode: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired, 
  value: PropTypes.string,
  history: PropTypes.object.isRequired,
  rebase: PropTypes.func.isRequired,
  nodeChildren: PropTypes.array.isRequired,
  nodeValues: PropTypes.array.isRequired,
  childrenShowing: PropTypes.array.isRequired
}

export default Tree

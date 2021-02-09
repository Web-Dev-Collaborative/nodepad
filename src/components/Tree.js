import React from 'react'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

/*
* Tree class
*/
function Tree(props) { 
  console.log('TREE')
  // console.log(props.history) 
  // no props and/or tree, redirect to welcome page to start a new tree root
  if (!props || !props.nodeValues || props.nodeValues.length < 1 || !props.nodeChildren || !props.childrenShowing ) return <Redirect to="/welcome" />

  return (
    <div key={`${props.currentIdx}${props.nodeChildren[props.currentIdx]}`} className="Tree">
      <section className="main">
        <ul>
          <li className="btn-li">{props.nodeValues[props.currentIdx]}</li> 
          {/* {childrenShowing && */
            props.nodeChildren[props.currentIdx] &&
            props.nodeChildren[props.currentIdx].length > 0 && 
            props.nodeChildren[props.currentIdx].map((val, idx) => (
              <li 
                key={`${idx}${val}`} 
                data-columns={`${idx}${val}`} 
                className="flex flex-li"
              >
                <button className="btn-li" onClick={() => alert("Ok buddeh")} >{props.childrenShowing[idx] ? "-" : "+"}</button>
                <button className="btn-li" onClick={() => props.rebase(idx, val)} >&#9660;</button>
                <input
                  type="text"
                  className="btn-li"
                  onChange={e => props.edit(e.target.value)} 
                  onBlur={() => props.update((idx, val))}
                  value={props.nodeChildren[props.currentIdx][idx]}
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
  currentIdx: PropTypes.number,
  history: PropTypes.object.isRequired,
  rebase: PropTypes.func.isRequired,
  nodeChildren: PropTypes.array.isRequired,
  nodeValues: PropTypes.array.isRequired,
  childrenShowing: PropTypes.array.isRequired
}

export default Tree

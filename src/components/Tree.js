import React from 'react'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

/*
* Tree class
*/
function Tree(props) { 
  console.log('TREE updated...')
  // console.log(props.history) 
  // no props and/or tree, redirect to welcome page to start a new tree root
  if (!props || !props.nodeValues || props.nodeValues.length < 1 || !props.nodeChildren || !props.childrenShowing ) return <Redirect to="/welcome" />

  return (
    <div key={`${props.currentIdx}${props.nodeChildren[props.currentIdx]}`} className="Tree">
      <section className="main">
        <ul>
          <li className="btn-li">{props.nodeValues[props.currentIdx]}</li>

          { props.nodeChildren && props.nodeChildren.length > 0 && 
            props.nodeChildren.map((childIdx, idx) => (
              <div key={childIdx} >
              { props.childrenShowing[idx] ? null : childIdx.length }
              { props.nodeChildren[idx] && props.nodeChildren[idx].length > 0 && props.childrenShowing[idx] &&
                props.nodeChildren[idx].map((location, idx) => (
                  <li 
                    key={`${idx}${props.nodeValues[location]}`} 
                    data-columns={`${idx}-${props.nodeValues[location]}`} 
                    className="flex flex-li"
                  >
                    <button className={props.childrenShowing[idx] ? "btn-li btn-li-active" : "btn-li"} onClick={() => props.toggleShowingChildAt(location)} >&#9660;</button>
                    <button className="btn-li" onClick={() => props.addNode("New Node...", location)} >+</button>
                    <input
                      type="text"
                      className="btn-li"
                      placeholder={props.nodeValues[location]}
                      onChange={e => props.edit(e.target.value)} 
                      onBlur={() => props.update(location)}
                      onFocus={e => props.setValue(e)}
                    />
                  </li> 
                ))
              }
              </div>
            ))
          }
        </ul>
        <form onBlur={e => props.addNode(e.target.value.trim(), props.currentIdx)} onSubmit={e => props.addNode(e.target[0].value.trim(), props.currentIdx, e)}>
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
  setValue: PropTypes.func.isRequired,
  value: PropTypes.string,
  currentIdx: PropTypes.number,
  history: PropTypes.object.isRequired,
  rebase: PropTypes.func.isRequired,
  nodeChildren: PropTypes.array.isRequired,
  nodeValues: PropTypes.array.isRequired,
  childrenShowing: PropTypes.array.isRequired,
  toggleShowingChildAt: PropTypes.func.isRequired
}

export default Tree

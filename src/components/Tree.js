import React, { useState } from 'react'
import { Link, Route, Redirect, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'

/*
* Tree class
*/
function Tree(props) { 
  console.dir(props.tree)
  console.log(props.route + " component")
  const [childrenShowing, toggleChildren] = useState(true)

  return (
    <div key={(props.tree[0] && props.tree[0].id) || "0"} className="Tree">
      <section className="main">
        <div>
          <ul>
            {/* {childrenShowing && props.tree && props.tree.length > 0 && */
              props.tree.map(child => (
                <li key={child.id} className="flex flex-li">
                  <input
                    type="text"
                    className="btn-li"
                    onChange={e => props.edit(e.target.value)} 
                    onBlur={() => props.update(child.id)}
                    placeholder={props.valsById[child.id]}
                    onFocus={e => props.getValue(e)}
                  />
                  <button className="btn-li" onClick={() => toggleChildren(!childrenShowing)} >{childrenShowing ? "-" : "+"}</button>
                  {/* {child.childrenShowing &&
                    <Tree tree={props.tree} value={`${props.route}/${child.id}`} />
                  } */}
                </li>
              ))
            }
          </ul>
          <form onBlur={props.addNode} onSubmit={props.addNode}>
            <input type="text" name="nodeValue" placeholder={props.route || "Enter new item..."} />
          </form>
        </div>
      </section>
    </div>
  )
}

Tree.propTypes = {
  addNode: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired, 
  value: PropTypes.string,
  tree: PropTypes.array.isRequired,
  route: PropTypes.string.isRequired,
  valsById: PropTypes.array
}

export default Tree

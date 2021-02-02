import React, { useState } from 'react'
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom'
import PropTypes from 'prop-types'

/*
* Tree class
*/
function Tree(props) {
  console.dir(props)
  
  let { url } = useRouteMatch()
  let urlString = url.split("/").join(" ").trim()
  console.log(urlString + " component")
  if (urlString === "0") urlString = "Enter new item..."

  const [childrenShowing, toggleChildren] = useState(true)

  const addNode = event => {    
    event.preventDefault()
    if (event.target[0] === undefined) {
      // onBlur event fired
      if (event.target.value.trim() === "")
        return event.target.value = ""
      props.add(event.target.value.trim())
      event.target.value = ""
    } else {
      // the form was submitted, the 0th element is the nodeValue named input
      if (event.target[0].value.trim() === "")
        return event.target[0].value = ""
      props.add(event.target[0].value.trim())
      event.target[0].value = ""
    }
  }

  return (
    <div key={(props.tree[0] && props.tree[0].id) || "0"} className="Tree">
      <section>
        <div>
          <ul>
            {props.tree && props.tree.length > 0 &&
              props.tree.map(child => (
                <li key={child.id} className="flex flex-li">
                  <Link to={`${url}/${child.id}`.toString()}>{child.value}</Link>
                  {/* {childrenShowing &&
                  <Switch>
                    <Route path={`${url}/:id`}>
                      <Tree tree={props.tree} value={`${url}/${child.id}`} />
                    </Route>
                  </Switch>
                  } */}
                </li>
              ))
            }
            <li className="flex flex-li">
              <button onClick={() => toggleChildren(!childrenShowing)} >{childrenShowing ? "-" : "+"}</button>
              <form onBlur={e => addNode(e)} onSubmit={e => addNode(e)}>
                <input type="text" name="nodeValue" placeholder={urlString || "Enter new item..."} />
              </form>
            </li>
          </ul>
        </div>
      </section>
    </div>
  )
}

Tree.propTypes = {
  add: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired, 
  value: PropTypes.string,
  tree: PropTypes.array.isRequired,
}

export default Tree

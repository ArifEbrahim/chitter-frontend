import React from 'react'
import { Link } from 'react-router-dom'

import classes from './NoPostFound.module.css'

export default function NoPostFound() {
  return (
    <div className={classes.noposts}>
    <p>No posts found!</p>
    <Link className='btn' to='/new-post'>
      Add a Post
    </Link>
  </div>
  )
}

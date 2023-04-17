import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Content } from './Content'

export const Router: React.FC = () => {
  return (
    <Switch>
      <Route path='*' component={Content} />
    </Switch>
  )
}

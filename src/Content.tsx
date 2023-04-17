import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { createHistoryPortal } from './createHistoryPortal'

const Container = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: 30px;
  align-items: center;
  justify-content: center;
  width: 100%;
`

const RouteLink = styled(NavLink)`
  all: unset;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 100px;
  border: solid 1px black;
  border-radius: 6px;
  cursor: pointer;
  &.active {
    background-color: azure;
  }
`

const LINKS = Array.from(Array(5)).map((_, index) => `${index + 1}`)

const { useHistoryPortalEntrance, useHistoryPortalExit } = createHistoryPortal('links')

const Entrance: React.FC = () => {
  useHistoryPortalEntrance()

  return null
}

const Exit: React.FC = () => {
  useHistoryPortalExit()

  return null
}

export const Content: React.FC = () => {
  const pathname = useLocation().pathname

  return (
    <Container>
      <RouteLink to='/before'>BEFORE</RouteLink>
      {pathname === '/exit' && <Exit />}
      {pathname === '/entrance' && <Entrance />}
      <RouteLink to='/entrance'>PORTAL ENTRANCE</RouteLink>

      {LINKS.map((to) => (
        <RouteLink key={to} to={to}>
          {to}
        </RouteLink>
      ))}

      <RouteLink to='/exit'>PORTAL EXIT</RouteLink>
      <RouteLink to='/after'>After</RouteLink>
    </Container>
  )
}

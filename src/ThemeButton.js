import React from 'react'
import styled from 'styled-components'
import { useStateValue } from './hooks'

const ThemeButton = () => {
  const [{ theme }, dispatch] = useStateValue()

  return (
    <Button
      primaryColor={theme.primary}
      onClick={() =>
        dispatch({
          type: 'changeTheme',
          newTheme: { primary: 'blue' },
        })
      }
    >
      Click ME!
    </Button>
  )
}

const Button = styled.button`
  color: ${props => props.primaryColor};
`

export default ThemeButton

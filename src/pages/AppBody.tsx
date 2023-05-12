import React from 'react'
import styled from 'styled-components'

export const BodyWrapper = styled.div`
  position: relative;
  max-width: 32rem;
  display: grid;
  width: 100%;
  background-color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? 'white' : '#1f202e')};
  border-radius: 1rem;
`

/**
 * The styled container element that wraps the content of most pages and the tabs.
 */
export default function AppBody({ children }: { children: React.ReactNode }) {
  return <BodyWrapper>{children}</BodyWrapper>
}

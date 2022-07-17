import * as React from 'react';
import styled from 'styled-components/macro';
import { Logo } from './Logo';
import { Nav } from './Nav';
import { PageWrapper } from '../PageWrapper';
import { StyleConstants } from '../../../styles/StyleConstants';

export function NavBar() {
  return (
    <Wrapper>
      <PageWrapper>
        <Logo />
        <Nav />
      </PageWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.header`
  box-shadow: 0 1px 0 0 rgba(58, 52, 51, 0.05);
  height: ${StyleConstants.NAV_BAR_HEIGHT};
  display: flex;
  position: fixed;
  top: 0;
  width: 100%;
  background-color: rgba(255, 255, 255, 1);
  z-index: 2;

  @supports (backdrop-filter: blur(10px)) {
    backdrop-filter: blur(10px);
    background-color: rgba(255, 255, 255, 1);
  }

  ${PageWrapper} {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

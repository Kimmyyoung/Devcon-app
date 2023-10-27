import React from 'react'

import {
  StyledContainer,
  InnerContainer,
  PageLogo,
  PageTitle 
} from './../styles/login';

import { StatusBar } from 'expo-status-bar';

const Login = () => {
  return (
    <StyledContainer>
      <StatusBar style="dark" />
      <InnerContainer>
        {/* <PageLogo resizemode="cover" source={('./../assets/splach.png')} /> */}
        <PageTitle>
          Login
        </PageTitle>
      </InnerContainer>
    </StyledContainer>
  )
}

export default Login
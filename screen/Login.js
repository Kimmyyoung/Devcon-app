import React, { useState } from 'react'

import {
  StyledContainer,
  InnerContainer,
  PageLogo,
  PageTitle,
  SubTitle,
  StyledFormArea,
  LeftIcon,
  RightIcon,
  StyledInputLabel,
  StyledTextInput,
  StyledButton,
  ButtonText,
  Colors,
  MsgBox,
  Line,
  ExtraView,
  ExtraText,
  TextLink,
  TextLinkContent
} from './../styles/login';

//icon
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';

import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import { View } from 'react-native';

import axios from 'axios';

const { brand, darkLight, primary } = Colors;

const Login = ({ navigation }) => {
  const [hidePassword, sethidePassword] = useState(true);
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();


  const handleLogin = (credentials)=>{
    const url = 'http://localhost:3000/api/login';

    axios
    .post(url, credentials)
    .them((res) => {
      const response = res.data;
      
      console.log(response);


    })
    .catch((err) => {
      console.error(err.JSON)
    })
  };

  const handleMessage = (message, type = 'FAILED') => {
    setMessage(message);
    setMessageType(type);
  }

  return (
    <StyledContainer>
      <StatusBar style="dark" />
      <InnerContainer>
        <PageTitle>
          Login
        </PageTitle>

        <SubTitle>Account Login</SubTitle>

        <Formik
          initialValues={{ email:'', password: '' }}
          onSubmit={(values) => (
            navigation.navigate("Home")
          )}
        >

          {({handleChange, handleBlur, handleSubmit, values})=>(
            <StyledFormArea>
              <MyTextInput 
              label="Email" 
              icon="mail" 
              placeholder="Email" 
              placeholderTextColor={darkLight}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              keyboardType="email-address"
              />

              <MyTextInput
                label="Password"
                icon="lock"
                placeholder="*****"
                placeholderTextColor={darkLight}
                onChangeText={handleChange('password`')}
                onBlur={handleBlur('password')}
                value={values.password}
                secureTextEntry={hidePassword}
                isPassword={true}
                hidePassword={hidePassword}
                sethidePassword={sethidePassword}
              />

              <MsgBox type={messageType}>{message}</MsgBox>

                <StyledButton onPress={handleSubmit}>
                  <ButtonText>Login</ButtonText>
                </StyledButton>

                <Line />

                <StyledButton google={true} onPress={handleSubmit}>
                  <Fontisto name="google" color={primary} size={25} />
                  <ButtonText google={true}>SignIn with Google</ButtonText>
                </StyledButton>

              <ExtraView>
                <ExtraText>
                Don't have an account already? 
                </ExtraText>
                <TextLink onPress={()=> navigation.navigate("Register")}>
                  <TextLinkContent>
                    Sign Up
                  </TextLinkContent>
                </TextLink>
              </ExtraView>
            </StyledFormArea>
          )}

        </Formik>
      </InnerContainer>
    </StyledContainer>
  )
}

const MyTextInput = ({label, icon, isPassword, hidePassword, sethidePassword, ...props}) => {
  return (
    <View>
      <LeftIcon>
        <Octicons name={icon} size={30} color={brand} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>

      <StyledTextInput {...props} /> 

      {isPassword && (
        <RightIcon onPress={()=> sethidePassword(!hidePassword)}>
          <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={darkLight} />
        </RightIcon>
      )}
    </View>
  )
}

export default Login;

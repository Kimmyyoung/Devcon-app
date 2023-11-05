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

// To do : icon error 
import { Octicons, Ionicons } from '@expo/vector-icons';


import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import { View } from 'react-native';

import axios from 'axios';

const { brand, darkLight, primary } = Colors;

const Login = ({ navigation }) => {
  const [hidePassword, sethidePassword] = useState(true);
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();


  const handleLogin = async (values)=>{
    const { email, password } = values;
    const url = 'http://localhost:3000/api/login';
    try {
      const res = await axios.post(url, { email, password});
      const user = res.data;
      const jwtToken = user.token;

      if(user) {
        navigation.navigate('Home')
      }
      
    }catch (err) {
      setMessage('Invalid Login Information!');
      console.log(err);
    }
  };

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
          onSubmit={handleLogin}
        >

          {({handleChange, handleBlur, handleSubmit, handleLogin, values})=>(
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
              autoCapitalize="none"
              />

              <MyTextInput
                label="Password"
                icon="lock"
                placeholder="*****"
                placeholderTextColor={darkLight}
                onChangeText={handleChange('password')}
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
                  {/* <Fontisto name="google" color={primary} size={25} /> */}
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
  console.log(icon)
  return (
    <View>
      <LeftIcon>
        <Octicons name={icon} size={24} color={brand} />
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

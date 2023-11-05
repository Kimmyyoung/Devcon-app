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
//import { Octicons, Ionicons } from '@expo/vector-icons';

import Ionicons from '@expo/vector-icons/Ionicons';
import Octicons from '@expo/vector-icons/Octicons';

import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import { View, TouchableOpacity, Alert } from 'react-native';

//DateTimePicker
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';


const { brand, darkLight, primary } = Colors;

const Register = ({ navigation }) => {
  const [hidePassword, sethidePassword] = useState(true);
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date(2000, 0, 1));
  
  const [dob, setDob] = useState();

  const [ message, setMessage ] = useState();
  

  const onChange = (event, selectedDate)=>{
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    setDob(currentDate);
  }

  const showDatePicker = ()=>(
    setShow(true)
  );
  
  const handleSignup = (credentials) => {
    const url = 'http://localhost:3000/api/signup';
    const {name, email, password, confirmPassword} = credentials;
    const data = {name, email, password, confirmPassword};

    if(!name || !email || !password || !confirmPassword) return setMessage('Missing Information!');

    if(password !== confirmPassword) return setMessage('Password does not match!');
   
    axios.post(url, data)
    .then((res)=>{
      const result = res.data;
      
      if (!result) {
        setMessage('Failed to Signup');
      } else {
        setMessage('Signup Success');

      }
    })
    .catch((err)=>{
      if(err.response.status === 400) setMessage('Email already registered');
      else setMessage('Failed to Signup');
    
      console.log(err);
    })
  }

  return (
    <StyledContainer>
      <StatusBar style="dark" />
      <InnerContainer>
        {/* <PageLogo resizemode="cover" source={('./../assets/splach.png')} /> */}
        <PageTitle>
          Sign Up
        </PageTitle>

        <SubTitle>Account Signup</SubTitle>

        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode='date'
            is24Hour={true}
            onChange={onChange}
          />
        )}

        <Formik
          initialValues={{ fullName: '', email:'', password: '', confirmPassword: '' }}
          onSubmit={handleSignup}
        >

          {({handleChange, handleBlur, handleSubmit, values})=>(
            <StyledFormArea>
              <MyTextInput 
              label="Full Name" 
              icon="person" 
              placeholder="First Name Last Name" 
              placeholderTextColor={darkLight}
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
              autoCapitalize="none"
              />

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

                <MyTextInput
                label="Confirm Password"
                icon="lock"
                placeholder="*****"
                placeholderTextColor={darkLight}
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                value={values.confirmPassword}
                secureTextEntry={hidePassword}
                isPassword={true}
                hidePassword={hidePassword}
                sethidePassword={sethidePassword}
              />
              <MsgBox>{message}</MsgBox>

                <StyledButton onPress={handleSubmit}>
                  <ButtonText>Signup</ButtonText>
                </StyledButton>

                <Line />

              <ExtraView>
                <ExtraText>
                Already have an account? 
                </ExtraText>
                <TextLink onPress={()=> navigation.navigate("Login")}>
                  <TextLinkContent>
                    Login
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

const MyTextInput = ({label, icon, isPassword, hidePassword, sethidePassword, isDate, showDatePicker, ...props}) => {
  return (
    <View>
      <LeftIcon>
        <Octicons name={icon} size={30} color={brand} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>

      {isDate === true ? (
        <TouchableOpacity onPress={showDatePicker}>
          <StyledTextInput {...props} />
        </TouchableOpacity>
      ) : (
        <StyledTextInput {...props} />
      )}

      {isPassword && (
        <RightIcon onPress={()=> sethidePassword(!hidePassword)}>
          <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={darkLight} />
        </RightIcon>
      )}
    </View>
  )
}

export default Register;

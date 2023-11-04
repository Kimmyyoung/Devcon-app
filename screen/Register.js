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
import { Octicons, Ionicons } from '@expo/vector-icons';

import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import { View, TouchableOpacity } from 'react-native';

//DateTimePicker
import DateTimePicker from '@react-native-community/datetimepicker';


const { brand, darkLight, primary } = Colors;

const Register = ({ navigation }) => {
  const [hidePassword, sethidePassword] = useState(true);
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date(2000, 0, 1));
  
  const [dob, setDob] = useState();

  const onChange = (event, selectedDate)=>{
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    setDob(currentDate);
  }

  const showDatePicker = ()=>(
    setShow(true)
  );
  
  const handleSignup = async (values) => {
    const { name , email, password } = values;
    const url = 'http://localhost:3000/api/signup';

    try {
      const res = await axios.post(url, {name, email, password});


    }

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
              onChangeText={handleChange('fullName')}
              onBlur={handleBlur('fullName')}
              value={values.fullName}
              />

              {/* <MyTextInput 
              label="Date of Birth" 
              icon="calendar" 
              placeholder="YYYY-MM-DD" 
              placeholderTextColor={darkLight}
              onChangeText={handleChange('dateOfBirth')}
              onBlur={handleBlur('dateOfBirth')}
              value={dob ? dob.toDateString() : ''}
              isDate={true}
              editable={false}
              showDatePicker={showDatePicker}
              /> */}

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
              <MsgBox>...</MsgBox>

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

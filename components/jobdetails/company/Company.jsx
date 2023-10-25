import React from 'react'
import { View, Text } from 'react-native'
import { icons } from '../../../constants'
import { checkImageURL } from '../../../utils'

import styles from './company.style'

const Company = ({ companyLogo, jobTitle, companyName, location}) => {
  
  return (
    <View style={styles.container}>
      <View style={styles.logoBox}>
        <Image source={{
          url: checkImageURL(companyLogo)
          ? companyLogo : 'https://i.ibb.co/7tz1Yq1/joblogo.jpg'
        }} style={styles.logoImage} />
      </View>

      {/* jobTitle */}
      <View style={styles.jobTitleBox}>
        <Text style={styles.jobTitle}>{jobTitle}</Text>
      </View>

      {/* company Info */}
      <View style={styles.companyInfoBox}>
        <Text style={styles.companyName}>
          {companyName} /
        </Text>

        <View style={styles.locationBox}>
          <Image source={icons.location}
          resizeMode="contain"
          style={styles.locationImage} />
          <Text style={styles.locationName}>{location}</Text>
        </View>
      </View>






    </View>
  )
}

export default Company
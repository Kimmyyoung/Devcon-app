import { useState } from 'react';

import { View, ScrollView, SafeAreaView, TouchableOpacity, Text} from 'react-native';
import { Stack, useRouter } from 'expo-router';

import icons from '../constants/icons';
import images from '../constants/images';
import { COLORS, SIZES } from '../constants/theme';
import { Nearbyjobs, Popularjobs, ScreenHeaderBtn, Welcome} from '../components';

// To do : logout button
const Home = ()=>{

  const router = useRouter();
  const [search, setSearch] = useState("");


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            padding: SIZES.medium
          }}
        >
          <Welcome 
            searchTerm={search}
            setSearchTerm={setSearch}
            handleClick={()=>{
              if(search) {
                router.push(`/search/${search}`)
              }
            }}
          />
          <Popularjobs />
          <Nearbyjobs />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
};

export default Home;

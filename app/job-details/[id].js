import { Text, View, SafeAreaView, 
  ScrollView, ActivityIndicator, RefreshControl
} from 'react-native';
import { Stack, useRouter, useSearchParams } from 'expo-router';
import { useCallback, useState } from 'react';
import { Company, JobAbout, JobFooter, JobTabs, ScreenHeaderBtn, Specifics } from '../../components';
import useFetch from '../../hook/useFetch';
import { COLORS, SIZES } from '../../constants/theme';
import icons from '../../constants/icons';


const tabs = ['About', 'Qualification', 'Resonsibilities'];


const JobDetails = () => {
  const params = useSearchParams();
  const router = useRouter();

  const { data, isLoading, error, refetch } = useFetch('job-details', {job_id : params.id });

  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const onRefresh = useCallback(()=>{
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  });
  

  const displayTabContent = () => {
    switch(activeTab){
      case "Qualifications" :
        return <Specifics 
        title="Qualifications" 
        points={data[0].job_highlights?.Qualifications ?? ['N/A']} />
      case "About" :
        return <JobAbout
          info={data[0].job_description}
        />
      case "Responsibilities" :
        return <Specifics 
        title="Responsibilities" 
        points={data[0].job_highlights?.Responsibilities ?? ['N/A']} />
      default: break;
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen options={{
        headerStyle: { backgroundColor : COLORS.lightWhite },
        headerShowVisible: true,
        headerBackVisible: true,
        headerBackTitle: "Back"
      }}
      />
      {/* App Header Menu */}
      <>
        <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
          {isLoading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : error ? ( 
            <Text>
              Something went wrong!
            </Text>
          ) : data.length === 0 ? (
            <Text>No data</Text>
          ) : (
            <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
              <Company 
                companyLogo={data[0].employer_logo}
                jobTitle={data[0].job_title}
                companyName={data[0].employer_name}
                location={data[0].job_city}
              />
              <JobTabs 
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
              {displayTabContent()}
            </View>
          )}
        </ScrollView>

        <JobFooter url={data[0]?.job_google_link ?? 'https://careers.google.com/jobs/results'}/>
      </>

    </SafeAreaView>
  )
}

export default JobDetails
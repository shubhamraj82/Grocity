import { View, Text, ScrollView } from 'react-native'
import SentryFeedbackButton from '@/components/insights/SentryFeedbackButton';
import InsightsPrioritySection from '@/components/insights/InsightsPrioritySection';
import ClearCompletedButton from '@/components/insights/ClearCompletedButton';
import UserProfile from '@/components/insights/UserProfile';
import InsightsCategorySection from '@/components/insights/InsightsCategorySection';
import InsightsStatsSection from '@/components/insights/InsightsStatsSection';
import TabScreenBackground from '@/components/TabScreenBackground';

const insightsScreen = () => {
  return (
    <>
      <ScrollView
        className="flex-1 bg-background py-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 20, gap: 14 }}
        contentInsetAdjustmentBehavior="automatic"
      >
        <TabScreenBackground />

        <UserProfile />
        <InsightsStatsSection />
        <InsightsCategorySection />
        <InsightsPrioritySection />
        <ClearCompletedButton />
      </ScrollView>

      <SentryFeedbackButton />
    </>
  );
};

export default insightsScreen;  
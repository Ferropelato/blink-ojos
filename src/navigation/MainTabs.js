import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from 'react-native';
import { useTranslation } from '../i18n';
import { useSettings } from '../context/SettingsContext';
import { getThemeColors } from '../utils/theme';
import HomeScreen from '../screens/HomeScreen';
import VideosScreen from '../screens/VideosScreen';
import ExercisesScreen from '../screens/ExercisesScreen';
import BlinkExerciseScreen from '../screens/BlinkExerciseScreen';
import BenefitsScreen from '../screens/BenefitsScreen';
import BlinkMonitorScreen from '../screens/BlinkMonitorScreen';

const Tab = createBottomTabNavigator();
const ExercisesStack = createNativeStackNavigator();

function ExercisesStackScreen() {
  return (
    <ExercisesStack.Navigator screenOptions={{ headerShown: false }}>
      <ExercisesStack.Screen name="ExercisesList" component={ExercisesScreen} />
      <ExercisesStack.Screen name="BlinkExercise" component={BlinkExerciseScreen} />
    </ExercisesStack.Navigator>
  );
}

export default function MainTabs() {
  const { t } = useTranslation();
  const { settings } = useSettings();
  const theme = settings?.theme || 'dark';
  const colors = getThemeColors(theme);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: colors.cardBg,
            borderTopColor: colors.optionBg,
          },
          tabBarActiveTintColor: colors.accent,
          tabBarInactiveTintColor: colors.textDim,
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: t.tabs.home,
            tabBarIcon: ({ color }) => <Text style={{ fontSize: 22 }}>👁️</Text>,
          }}
        />
        <Tab.Screen
          name="Videos"
          component={VideosScreen}
          options={{
            tabBarLabel: t.tabs.videos,
            tabBarIcon: ({ color }) => <Text style={{ fontSize: 22 }}>🎬</Text>,
          }}
        />
        <Tab.Screen
          name="Exercises"
          component={ExercisesStackScreen}
          options={{
            tabBarLabel: t.tabs.exercises,
            tabBarIcon: ({ color }) => <Text style={{ fontSize: 22 }}>🧘</Text>,
          }}
        />
        <Tab.Screen
          name="Benefits"
          component={BenefitsScreen}
          options={{
            tabBarLabel: t.tabs.benefits,
            tabBarIcon: ({ color }) => <Text style={{ fontSize: 22 }}>✨</Text>,
          }}
        />
        <Tab.Screen
          name="Monitor"
          component={BlinkMonitorScreen}
          options={{
            tabBarLabel: t.tabs.monitor,
            tabBarIcon: ({ color }) => <Text style={{ fontSize: 22 }}>📷</Text>,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

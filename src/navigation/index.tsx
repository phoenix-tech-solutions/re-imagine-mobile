import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';

import { useAuth } from '~/contexts/AuthContext';

import Dashboard from '~/app/index';
import LoginScreen from '~/app/login';
import SignupScreen from '~/app/signup';
import EventsScreen from '~/app/events';
import ProjectsScreen from '~/app/projects';
import ResourcesScreen from '~/app/resources';
import ProfileScreen from '~/app/profile';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = 'dashboard';
          } else if (route.name === 'Events') {
            iconName = 'event';
          } else if (route.name === 'Projects') {
            iconName = 'work';
          } else if (route.name === 'Resources') {
            iconName = 'book';
          } else if (route.name === 'Profile') {
            iconName = 'person';
          }

          return <MaterialIcons name={iconName as keyof typeof MaterialIcons.glyphMap} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Events" component={EventsScreen} />
      <Tab.Screen name="Projects" component={ProjectsScreen} />
      <Tab.Screen name="Resources" component={ResourcesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

function AppNavigator() {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <Stack.Screen name="Main" component={MainTabs} />
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}
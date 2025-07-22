import * as React from 'react';
import { View, ScrollView, RefreshControl, TouchableOpacity, Linking, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface Resource {
  id: string;
  title: string;
  description: string;
  resource_type: 'tutorial' | 'documentation' | 'video' | 'tool' | 'dataset' | 'book' | 'course';
  url: string;
  tags?: string[];
}

export default function ResourcesScreen() {
  const [refreshing, setRefreshing] = React.useState(false);
  const [resources, setResources] = React.useState<Resource[]>([
    {
      id: '1',
      title: 'Arduino Programming Basics',
      description: 'Complete guide to getting started with Arduino programming',
      resource_type: 'tutorial',
      url: 'https://docs.arduino.cc/learn/',
      tags: ['arduino', 'programming', 'electronics'],
    },
    {
      id: '2',
      title: 'Robot Operating System (ROS) Documentation',
      description: 'Official ROS documentation for advanced robotics development',
      resource_type: 'documentation',
      url: 'https://docs.ros.org/',
      tags: ['ros', 'robotics', 'advanced'],
    },
    {
      id: '3',
      title: 'Computer Vision with OpenCV',
      description: 'Video series on computer vision techniques for robotics',
      resource_type: 'video',
      url: 'https://opencv.org/courses/',
      tags: ['computer-vision', 'opencv', 'python'],
    },
    {
      id: '4',
      title: 'Fusion 360 CAD Software',
      description: 'Professional 3D CAD software for designing robot parts',
      resource_type: 'tool',
      url: 'https://www.autodesk.com/products/fusion-360',
      tags: ['cad', 'design', '3d-modeling'],
    },
    {
      id: '5',
      title: 'Introduction to Machine Learning',
      description: 'Beginner-friendly course on ML applications in robotics',
      resource_type: 'course',
      url: 'https://ml-course.example.com/',
      tags: ['machine-learning', 'ai', 'robotics'],
    },
  ]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simulate data refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'tutorial':
        return 'school';
      case 'documentation':
        return 'description';
      case 'video':
        return 'video-library';
      case 'tool':
        return 'build';
      case 'dataset':
        return 'storage';
      case 'book':
        return 'book';
      case 'course':
        return 'class';
      default:
        return 'help';
    }
  };

  return (
    <ScrollView 
      className="flex-1 bg-gray-50"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View className="p-6">
        {/* Header */}
        <View className="mb-6">
          <Text className="text-3xl font-bold text-gray-900 mb-2">
            Resources
          </Text>
          <Text className="text-gray-500">
            Tutorials, documentation, videos, and more
          </Text>
        </View>

        {/* Resources List */}
        <View className="gap-y-4">
          {resources.map((resource) => (
            <TouchableOpacity 
              key={resource.id}
              onPress={() => Linking.openURL(resource.url)}
              className="bg-white p-4 rounded-lg"
            >
              <View className="flex-row items-center justify-between mb-2">
                <MaterialIcons 
                  name={getResourceIcon(resource.resource_type)} 
                  size={20} 
                  color="#3B82F6"
                />
                <Text className="ml-2 text-sm font-medium capitalize text-blue-600">
                  {resource.resource_type}
                </Text>
              </View>
              <Text className="text-lg font-bold mb-2">{resource.title}</Text>
              <Text className="text-gray-500 mb-4">{resource.description}</Text>
              
              <View className="flex-row flex-wrap">
                {resource.tags?.map((tag, index) => (
                  <View key={index} className="bg-gray-200 px-2 py-1 rounded-md mr-2 mb-1">
                    <Text className="text-xs text-gray-500">#{tag}</Text>
                  </View>
                ))}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View className="h-8" />
      </View>
    </ScrollView>
  );
}
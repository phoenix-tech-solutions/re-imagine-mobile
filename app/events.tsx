import * as React from 'react';
import { View, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { Button } from '~/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { Text } from '~/components/ui/text';
import { useAuth } from '~/contexts/AuthContext';

interface Event {
  id: string;
  title: string;
  description: string;
  event_type: 'workshop' | 'assignment' | 'meeting' | 'presentation' | 'competition';
  start_time: string;
  end_time: string;
  location?: string;
  max_participants?: number;
  is_required: boolean;
  registered?: boolean;
}

export default function EventsScreen() {
  const { user } = useAuth();
  const [refreshing, setRefreshing] = React.useState(false);
  const [events, setEvents] = React.useState<Event[]>([
    {
      id: '1',
      title: 'Robot Assembly Workshop',
      description: 'Learn the basics of robot assembly using Arduino and sensors',
      event_type: 'workshop',
      start_time: '2025-01-02T14:00:00Z',
      end_time: '2025-01-02T17:00:00Z',
      location: 'Lab Room A',
      max_participants: 20,
      is_required: true,
      registered: false,
    },
    {
      id: '2',
      title: 'Programming Challenge: Line Following Robot',
      description: 'Code a robot to follow a line using computer vision',
      event_type: 'assignment',
      start_time: '2025-01-03T09:00:00Z',
      end_time: '2025-01-10T23:59:00Z',
      location: 'Online',
      is_required: false,
      registered: true,
    },
    {
      id: '3',
      title: 'Advanced Sensor Integration',
      description: 'Workshop on integrating multiple sensors in robotics projects',
      event_type: 'workshop',
      start_time: '2025-01-08T10:00:00Z',
      end_time: '2025-01-08T13:00:00Z',
      location: 'Lab Room B',
      max_participants: 15,
      is_required: false,
      registered: false,
    },
    {
      id: '4',
      title: 'Team Project Presentation',
      description: 'Present your team robotics project to peers and mentors',
      event_type: 'presentation',
      start_time: '2025-01-15T13:00:00Z',
      end_time: '2025-01-15T17:00:00Z',
      location: 'Main Auditorium',
      max_participants: 100,
      is_required: true,
      registered: false,
    },
    {
      id: '5',
      title: 'Robotics Competition Kickoff',
      description: 'Launch event for the annual robotics competition',
      event_type: 'competition',
      start_time: '2025-02-01T09:00:00Z',
      end_time: '2025-02-01T18:00:00Z',
      location: 'Competition Arena',
      max_participants: 50,
      is_required: false,
      registered: false,
    },
  ]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simulate data refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'workshop':
        return '#3B82F6';
      case 'assignment':
        return '#F59E0B';
      case 'meeting':
        return '#10B981';
      case 'presentation':
        return '#8B5CF6';
      case 'competition':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'workshop':
        return 'build';
      case 'assignment':
        return 'assignment';
      case 'meeting':
        return 'people';
      case 'presentation':
        return 'presentation';
      case 'competition':
        return 'emoji-events';
      default:
        return 'event';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  const formatTime = (startTime: string, endTime: string) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    return `${start.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit' 
    })} - ${end.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit' 
    })}`;
  };

  const handleRegister = (eventId: string) => {
    setEvents(prev => prev.map(event => 
      event.id === eventId 
        ? { ...event, registered: !event.registered }
        : event
    ));
  };

  return (
    <ScrollView 
      className="flex-1 bg-background"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View className="p-6">
        {/* Header */}
        <View className="mb-6">
          <Text className="text-3xl font-bold text-foreground mb-2">
            Events
          </Text>
          <Text className="text-muted-foreground">
            Workshops, assignments, and competitions
          </Text>
        </View>

        {/* Filter Tabs */}
        <View className="flex-row mb-6 bg-secondary/50 rounded-lg p-1">
          <Button variant="default" size="sm" className="flex-1 mr-1">
            <Text className="text-white">All</Text>
          </Button>
          <Button variant="ghost" size="sm" className="flex-1 mx-1">
            <Text>Workshops</Text>
          </Button>
          <Button variant="ghost" size="sm" className="flex-1 mx-1">
            <Text>My Events</Text>
          </Button>
          <Button variant="ghost" size="sm" className="flex-1 ml-1">
            <Text>Required</Text>
          </Button>
        </View>

        {/* Events List */}
        <View className="space-y-4">
          {events.map((event) => (
            <TouchableOpacity 
              key={event.id}
              onPress={() => router.push(`/events/${event.id}`)}
            >
              <Card className="shadow-sm">
                <CardHeader className="pb-3">
                  <View className="flex-row items-center justify-between mb-2">
                    <View className="flex-row items-center">
                      <MaterialIcons 
                        name={getEventTypeIcon(event.event_type)} 
                        size={20} 
                        color={getEventTypeColor(event.event_type)} 
                      />
                      <Text className="ml-2 text-sm font-medium capitalize" 
                            style={{ color: getEventTypeColor(event.event_type) }}>
                        {event.event_type}
                      </Text>
                    </View>
                    {event.is_required && (
                      <View className="bg-red-100 px-2 py-1 rounded-md">
                        <Text className="text-xs text-red-600 font-medium">Required</Text>
                      </View>
                    )}
                  </View>
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {event.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pt-0">
                  {/* Date and Time */}
                  <View className="flex-row items-center mb-3">
                    <MaterialIcons name="schedule" size={16} color="#6B7280" />
                    <Text className="ml-2 text-sm text-muted-foreground">
                      {formatDate(event.start_time)}
                    </Text>
                  </View>
                  
                  <View className="flex-row items-center mb-3">
                    <MaterialIcons name="access-time" size={16} color="#6B7280" />
                    <Text className="ml-2 text-sm text-muted-foreground">
                      {formatTime(event.start_time, event.end_time)}
                    </Text>
                  </View>

                  {/* Location */}
                  {event.location && (
                    <View className="flex-row items-center mb-3">
                      <MaterialIcons name="location-on" size={16} color="#6B7280" />
                      <Text className="ml-2 text-sm text-muted-foreground">
                        {event.location}
                      </Text>
                    </View>
                  )}

                  {/* Participants */}
                  {event.max_participants && (
                    <View className="flex-row items-center">
                      <MaterialIcons name="group" size={16} color="#6B7280" />
                      <Text className="ml-2 text-sm text-muted-foreground">
                        Max {event.max_participants} participants
                      </Text>
                    </View>
                  )}
                </CardContent>

                <CardFooter className="pt-0">
                  <View className="flex-row items-center justify-between w-full">
                    {event.registered && (
                      <View className="flex-row items-center">
                        <MaterialIcons name="check-circle" size={16} color="#10B981" />
                        <Text className="ml-1 text-sm text-green-600">Registered</Text>
                      </View>
                    )}
                    <Button 
                      size="sm" 
                      variant={event.registered ? "outline" : "default"}
                      onPress={() => handleRegister(event.id)}
                      className={event.registered ? "" : ""}
                    >
                      <Text className={event.registered ? "text-foreground" : "text-white"}>
                        {event.registered ? 'Unregister' : 'Register'}
                      </Text>
                    </Button>
                  </View>
                </CardFooter>
              </Card>
            </TouchableOpacity>
          ))}
        </View>

        <View className="h-8" />
      </View>
    </ScrollView>
  );
}

import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { observer } from "@legendapp/state/react";
import { addTask, tasks$ as _tasks$, toggleDone } from "./lib/utils";
import { Tables } from "./lib/supabase.types";

// Emojis to decorate each task.
const NOT_DONE_ICON = String.fromCodePoint(0x1f7e0);
const DONE_ICON = String.fromCodePoint(0x2705);

// The text input component to add a new task.
const Newtask = () => {
  const [text, setText] = useState("");
  const handleSubmitEditing = (
    { nativeEvent: { text } }: { nativeEvent: { text: string } },
  ) => {
    setText("");
    addTask(text);
  };
  return (
    <TextInput
      value={text}
      onChangeText={(text) => setText(text)}
      onSubmitEditing={handleSubmitEditing}
      placeholder="What do you want to do today?"
      style={styles.input}
    />
  );
};

// A single task component, either 'not done' or 'done': press to toggle.
const Task = ({ task }: { task: Tables<"tasks"> }) => {
  const handlePress = () => {
    toggleDone(task.id);
  };
  return (
    <TouchableOpacity
      key={task.id}
      onPress={handlePress}
      style={[styles.task, task.is_done ? styles.done : null]}
    >
      <Text style={styles.taskText}>
        {task.is_done ? DONE_ICON : NOT_DONE_ICON} {task.description}
      </Text>
    </TouchableOpacity>
  );
};

// A list component to show all the tasks.
const Tasks = observer(({ tasks$ }: { tasks$: typeof _tasks$ }) => {
  // Get the tasks from the state and subscribe to updates
  const tasks = tasks$.get();
  const renderItem = ({ item: task }: { item: Tables<"tasks"> }) => (
    <Task task={task} />
  );
  if (tasks) {
    return (
      <FlatList
        data={Object.values(tasks)}
        renderItem={renderItem}
        style={styles.tasks}
      />
    );
  }

  return <></>;
});

// A button component to delete all the tasks, only shows when there are some.
const Cleartasks = () => {
  const handlePress = () => {
    console.log("delete");
  };
  return [].length
    ? (
      <TouchableOpacity onPress={handlePress}>
        <Text style={styles.cleartasks}>Clear all</Text>
      </TouchableOpacity>
    )
    : null;
};

// The main app.
const App = observer(() => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.heading}>Legend-State Example</Text>
        <Newtask />
        <Tasks tasks$={_tasks$} />
        <Cleartasks />
      </SafeAreaView>
    </SafeAreaProvider>
  );
});

// Styles for the app.
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    margin: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    borderColor: "#999",
    borderRadius: 8,
    borderWidth: 2,
    flex: 0,
    height: 64,
    marginTop: 16,
    padding: 16,
    fontSize: 20,
  },
  tasks: {
    flex: 1,
    marginTop: 16,
  },
  task: {
    borderRadius: 8,
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#ffd",
  },
  done: {
    backgroundColor: "#dfd",
  },
  taskText: {
    fontSize: 20,
  },
  cleartasks: {
    margin: 16,
    flex: 0,
    textAlign: "center",
    fontSize: 16,
  },
});

export default App;

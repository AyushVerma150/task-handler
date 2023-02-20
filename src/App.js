import React, { useEffect, useState, useCallback } from "react";

import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";
import useFetchHook from "./components/hooks/use-fetch-hook";

function App() {
  const [tasks, setTasks] = useState([]);

  const transformData = useCallback((tasksData) => {
    for (const key in tasksData) {
      setTasks((prev) => {
        return [
          ...prev,
          {
            text: tasksData[key].text,
            id: key,
          },
        ];
      });
    }
  }, []);

  const {
    isLoading,
    errorState,
    sendRequest: fetchTasks,
  } = useFetchHook({}, transformData);

  useEffect(() => {
    fetchTasks({}, transformData);
  }, [fetchTasks, transformData]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        error={errorState}
        loading={isLoading}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;

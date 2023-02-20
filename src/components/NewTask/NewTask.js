import useFetchHook from "../hooks/use-fetch-hook";

import Section from "../UI/Section";
import TaskForm from "./TaskForm";

const NewTask = (props) => {
  const { isLoading, errorState, sendRequest: addNewTask } = useFetchHook();

  const appendNewTask = (data, payload) => {
    const { text } = JSON.parse(payload);
    const { name: id } = data;
    const createdTask = { id, text };
    props.onAddTask(createdTask);
  };
  const onEnterTaskHandler = (taskText) => {
    addNewTask(
      {
        method: "POST",
        body: JSON.stringify({ text: taskText }),
        headers: {
          "Content-Type": "application/json",
        },
      },
      appendNewTask
    );
  };

  return (
    <Section>
      <TaskForm onEnterTask={onEnterTaskHandler} loading={isLoading} />
      {errorState && <p>{errorState}</p>}
    </Section>
  );
};

export default NewTask;

import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import Tasks from './src/features/Tasks';
import AddTask from './src/features/AddTask';
import {ALL_FILTER, ACTIVE_FILTER, DONE_FILTER} from './src/helpers/consts';

export default function App() {
  const [selectedFilter, setFilter] = useState(ALL_FILTER);
  const [tasks, setTasks] = useState([]);
  const [filtredTasks, setFiltredTasks] = useState([]);
  const [value, setValue] = useState('');

  useEffect(() => {
    if (selectedFilter === ALL_FILTER) setFiltredTasks(tasks);
    if (selectedFilter === ACTIVE_FILTER)
      setFiltredTasks(tasks.filter(task => !task.checked));
    if (selectedFilter === DONE_FILTER)
      setFiltredTasks(tasks.filter(task => task.checked));
  }, [selectedFilter, tasks]);

  const handleStatus = id => {
    const newTasks = tasks.map(item =>
      item.id === id ? {...item, checked: true} : item,
    );
    setTasks(newTasks);
  };

  return (
    <StyledSafeAreaView>
      <AddTask
        value={value}
        tasks={tasks}
        setValue={setValue}
        setTasks={setTasks}
      />
      <Tasks
        tasks={filtredTasks}
        handleStatus={handleStatus}
        selectedFilter={selectedFilter}
        setFilter={setFilter}
        setTasks={setTasks}
      />
    </StyledSafeAreaView>
  );
}

const StyledSafeAreaView = styled.SafeAreaView`
  flex: 1;
  background-color: hsl(0, 0%, 96%);
`;

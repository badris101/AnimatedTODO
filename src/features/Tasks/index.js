import React, {useRef} from 'react';
import {TouchableOpacity} from 'react-native';
import TaskItem from './TaskItem';
import styled, {css} from 'styled-components/native';
import {FILTER_LIST} from '../../helpers/consts';
import {ScrollView} from 'react-native-gesture-handler';

const Tasks = ({tasks, handleStatus, selectedFilter, setFilter, setTasks}) => {
  const scrollRef = useRef(null);

  const removeTask = id => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <Container>
      <View
        style={{
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.23,
          shadowRadius: 2.62,

          elevation: 4,
        }}>
        <ScrollView ref={scrollRef} style={{flex: 1}}>
          {tasks.map(item => (
            <TaskItem
              simultaneousHandlers={scrollRef}
              key={item.id}
              id={item.id}
              title={item.title}
              checked={item.checked}
              handleStatus={handleStatus}
              removeTask={removeTask}
            />
          ))}
        </ScrollView>
        {/* <FlatList
          ref={scrollRef}
          style={{flex: 1}}
          data={tasks}
          renderItem={({item}) => (
            <TaskItem
              simultaneousHandlers={scrollRef}
              title={item.title}
              checked={item.checked}
              handleStatus={handleStatus}
              removeTask={removeTask}
            />
          )}
          keyExtractor={item => item.title}
        /> */}
      </View>
      <Filters
        style={{
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.23,
          shadowRadius: 2.62,

          elevation: 4,
        }}>
        {FILTER_LIST.map((filter, index) => (
          <TouchableOpacity
            key={filter.value}
            onPress={() => setFilter(filter.value)}>
            <Filter
              last={++index === FILTER_LIST.length}
              active={selectedFilter === filter.value}>
              {filter.label}
            </Filter>
          </TouchableOpacity>
        ))}
      </Filters>
    </Container>
  );
};

const Container = styled.View`
  flex: 2;
  padding: 0 20px;
  position: relative;
  background-color: hsl(0, 0%, 96%);
`;

const Filters = styled.View`
  flex-direction: row;
  justify-content: center;
  padding: 15px 0;
  margin-top: -30px;
  margin-bottom: 30px;
  background-color: white;
`;

const Filter = styled.Text`
  font-family: 'JosefinSans-Bold';
  margin-right: 15px;
  color: hsl(236, 33%, 92%);
  font-size: 18px;

  ${props =>
    props.active &&
    css`
      color: hsl(280, 87%, 65%);
    `}

  ${props =>
    props.last &&
    css`
      margin-right: 0;
    `}
`;

const View = styled.View`
  flex: 1;
  background-color: white;
  transform: translateY(-50px);
  border-radius: 5px;
`;

export default Tasks;

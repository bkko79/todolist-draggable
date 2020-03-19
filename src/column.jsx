import React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import Task from './task';

const Container = styled.div`
  margin: 4px;
  border-radius: 2px;
`;
const TaskList =styled.div`
  background: ${props => (props.isDraggingOver ? 'white':'white')}
`;

export default class Column extends React.Component {
  render() {
    const { onToggle, onRemove, onHandleTime, onDeleteTime } = this.props;
    return(
    <Container>
        <Droppable droppableId={this.props.column.id}>
          {(provided, snapshot) => (
          <TaskList
            {...provided.droppableProps}
            ref={provided.innerRef}
            isDraggingOver={snapshot.isDraggingOver}
          >
            <TransitionGroup className="todo-list">
            {this.props.tasks.map((task,index) => 
              <CSSTransition key={task.id} timeout={300} classNames="item">
                <Task 
                  key={task.id} 
                  task={task} 
                  index={index} 
                  onToggle={onToggle} 
                  onRemove={onRemove} 
                  onHandleTime={onHandleTime} 
                  onDeleteTime={onDeleteTime} />
              </CSSTransition>
            )}
            </TransitionGroup>
            {provided.placeholder}
          </TaskList>
          )}
        </Droppable>
    </Container>
    );
  }
}
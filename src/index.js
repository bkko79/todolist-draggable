import React from 'react'
import ReactDOM from 'react-dom'
import '@atlaskit/css-reset'
import {DragDropContext} from 'react-beautiful-dnd'
import initialDatas from './initial-data'
import Column from './column'
import Form from './form'
import styled from 'styled-components'
import './index.css'

const TodoWrapper = styled.div`
  border: 1px solid lightgrey;
  background: white;
  max-width: 512px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  margin: 0 auto;
  margin-bottom: 2rem;
`

class App extends React.Component {
  state = initialDatas;

  componentDidMount(){
      setInterval( () => {
        this.setState({
          date: new Date().toLocaleString('ja-jp')
        })
      }, 1000)
  }

  handleChange = (e) => {
    this.setState({
      input: e.target.value
    });
  }

  handleKeyPress = (e) => {
    if(e.key === 'Enter') {
      this.handleCreate();
    }
  }

  handleCreate = () => {
    if(!this.state.input){
      return;
    }
    const { tasks, column, index, input } = this.state;
    const newId = `task-${index}`;
    let newTasks = tasks;
    newTasks[newId] = {
        'id': newId,
        'content': input,
        'checked': false,
        'timer': '', 
    };
    const newTaskIds = Array.from(column.taskIds).concat(newId);

    const newColumn = {
      ...column,
      taskIds: newTaskIds
    }
    
    const newState = {
      ...this.state,
      input: '',
      index: index + 1,
      tasks: newTasks,
      column: newColumn,
    }

    this.setState(newState);
  }

  handleToggle = (id) => {
    const { tasks } = this.state;
    const task = tasks[id];
    let newTasks = tasks;
    newTasks[id] = {
      ...task,
      'checked': !tasks[id].checked,
    }
    const newState = {
      ...this.state,
      tasks: newTasks,
    }
    this.setState(newState);
  }

  handleRemove = (id) => {
    const { tasks, column } = this.state;
    let newTasks = tasks;
    delete newTasks[id];
    const newTaskIds = Array.from(column.taskIds).filter(task => task !== id);
    const newState = {
      ...this.state,
      tasks: newTasks,
      column: {
        ...column,
        taskIds: newTaskIds,
      }
    }
    this.setState(newState);
  }

  handleTime = (id, date) => {
    const { tasks } = this.state;
    const task = tasks[id];
    let newTasks = tasks;
    newTasks[id] = {
      ...task,
      'timer': date.toLocaleString('ja-jp'),
    }
    const newState = {
      ...this.state,
      tasks: newTasks,
    }
    this.setState(newState);
  }

  onDragEnd = result => {
    const {destination, source, draggableId } = result;

    if(!destination){
      return;
    }

    if(
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ){
      return;
    }
    const { column } = this.state;
    const newTaskIds = Array.from(column.taskIds);
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);

    const newColumn = {
      ...column,
      taskIds: newTaskIds,
    };

    const newState = {
      ...this.state,
      input: '',
      column: newColumn,
    }
    console.log(newState);
    this.setState(newState);
  }

  render() {
    const { handleToggle, handleRemove, handleTime } = this;
    const { column } = this.state;
    const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);
    return (
      <TodoWrapper>
        <div className="titleAnimation">
          My Todo
          <p className="currentTime">{this.state.date}</p>
        </div>
        <DragDropContext onDragEnd ={this.onDragEnd}>
          <div className="form-wrapper">
          <Form 
            value={this.state.input}
            onKeyPress={this.handleKeyPress}
            onChange={this.handleChange}
            onCreate={this.handleCreate} />
          </div>
          <Column 
            key={column.id} 
            column={column} 
            tasks={tasks} 
            onToggle={handleToggle} 
            onRemove={handleRemove} 
            onHandleTime={(id,date) => handleTime(id, date)} 
            onDeleteTime={(id) => handleTime(id, '')} 
          />
        </DragDropContext>
      </TodoWrapper>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
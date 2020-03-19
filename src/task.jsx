import React from 'react';
import styled from 'styled-components'
import Picker from './datepick'
import { Draggable } from 'react-beautiful-dnd'

const Container = styled.div`
  background-color: ${props => (props.isDragging) ? '#eee' : 'white'};
  border: 1px solid #ccc;
  border-radius: 4px;
  margin: 1rem;
`;

const Handle = styled.div`
  min-width: 20px;
  height: 20px;
  background-color: #22b8cf;
  border-radius: 10px;
  margin-right: 8px
  align-items: center;
  
`;

export default class Task extends React.Component {
  render(){
    const { onToggle, onRemove, onHandleTime, onDeleteTime } = this.props;
    return (
      <Draggable draggableId={this.props.task.id} index={this.props.index}>
        {(provided, snapshot) => (
          
          <Container
            {...provided.draggableProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            <div className="todoItem">
            <Handle className="itemDrag" {...provided.dragHandleProps}>
              {this.props.index + 1}
            </Handle>
            <div className={`todoText ${this.props.task.checked && 'checked'}`} onClick={() => onToggle(this.props.task.id)}>
            {this.props.task.content}
            </div>
            <div className="remove" onClick={(e) => {
              e.stopPropagation();
              onRemove(this.props.task.id);
            }}>
              &times;
            </div>
            {
              !this.props.task.checked && (<Picker id={this.props.task.id} onHandleTime={onHandleTime} />)
            }
            {
              this.props.task.checked && (<div className="checkMark">✓</div>)
            }
            </div>
            {
              this.props.task.timer && !this.props.task.checked && (
                <div className="acceptTime">
                  <div className="timeText">{this.props.task.timer}
                  <div className="removeTime" onClick={(e) => {
                    e.stopPropagation();
                    onDeleteTime(this.props.task.id);
                  }}>
                    &times;
                  </div>
                  </div>
                </div>
              )
            }
          </Container>
        )}
      </Draggable>
    );
  }
}
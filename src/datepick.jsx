import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { DateTimePicker,MuiPickersUtilsProvider } from '@material-ui/pickers';

export default class Picker extends React.Component {
  state = {isOpen: false};
  todayDate = new Date();
  toggleOn = () => {
    this.setState({
      "isOpen": true,
    })
    document.body.style.position = 'fixed';
    document.body.style.top = `-${window.scrollY}px`;
  }

  toggleOff = () => {
    this.setState({
      "isOpen": false,
    })
    const scrollY = document.body.style.top;
    document.body.style.position = '';
    document.body.style.top = '';
    window.scrollTo(0, parseInt(scrollY || '0') * -1);
  }

  render(){
      const { isOpen } = this.state;
      const { id, onHandleTime } = this.props;
      const { toggleOn, toggleOff, todayDate } = this;
      return(
        <div className="todo-calendar">
        <span role="img" aria-label="timer" onClick={toggleOn}>⏱️</span>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DateTimePicker 
            open={isOpen}
            onOpen={toggleOn}
            onClose={toggleOff}
            value={todayDate} 
            onChange={(date) => onHandleTime(id, date)}
            TextFieldComponent={() => null}
            minDate={new Date()}
            ampm={false}
            format="yyyy/MM/dd HH:mm"
          />
        </MuiPickersUtilsProvider>
        </div> 
      )
  }
}
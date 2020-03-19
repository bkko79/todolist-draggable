import React from 'react';

export default class Form extends React.Component {
    render(){
        const { value, onChange, onKeyPress, onCreate } =this.props;
        return(
            <div className="form">
                <input value={value} onChange={onChange} onKeyPress={onKeyPress}/>
                    <div className="create-button" onClick={onCreate}>
                    ADD
                </div>
            </div>
        );
    }
}

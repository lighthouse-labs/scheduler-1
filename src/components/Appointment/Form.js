/* 
The Form component should track the following state:

    name:String
    interviewer:Number

The Form component should have the following actions:

    setName:Function
    setInterviewer:Function

The Form component should take the following props:

    name:String
    interviewers:Array
    interviewer:Number
    onSave:Function
    onCancel:Function

*/

import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props){

  // two states defined in Form
  const [name, setName] = useState(props.name || '');
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const reset = () => {
    setName('');
    setInterviewer(null);
  } 
  const cancel = () => {
    reset();
    props.onCancel();
  }
  
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={name ? name : ''}
            onChange={e => setName(e.target.value)}
          />
        </form>
        <InterviewerList 
          interviewers={props.interviewers} 
          value={interviewer} 
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={() => props.onSave(name, interviewer)}>Save</Button>
        </section>
      </section>
    </main>
  );
}
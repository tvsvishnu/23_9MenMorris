import React from "react";
import axios from "axios";
import 'semantic-ui-css/semantic.min.css';
import { Grid, Image, Segment } from 'semantic-ui-react'
import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { Input, Dropdown } from "semantic-ui-react";
import { Button } from 'semantic-ui-react'
import Cookies from "universal-cookie";
import NAvbar from "./navbar";
import { useNavigate } from "react-router-dom";
function PendingTodos(props) {
  const [questions2, setQuestions2] = useState([]);
  var cookies = new Cookies();
    useEffect(() => {
    async function fetchData() {
      axios.post('http://localhost:3001/pendingtodoapi', {email : cookies.get("email_id")}).then((response) => {
        const questions = response.data.questions
        setQuestions2(questions)
      })
    }
    fetchData();
  }, []);

  var history = useNavigate();

  const handleDone = (e) => {
    axios.post('http://localhost:3001/changestatus', {_id : e}).then((response) => {
        // const questions = response.data.questions
        // setQuestions2(questions)
        axios.post('http://localhost:3001/pendingtodoapi', {email : cookies.get("email_id")}).then((response) => {
        const questions = response.data.questions
        setQuestions2(questions)
      })
      })
  }

  const handleDelete = (e) => {
    axios.post('http://localhost:3001/deletetodo', {_id : e}).then((response) => {
        // const questions = response.data.questions
        // setQuestions2(questions)
        axios.post('http://localhost:3001/pendingtodoapi', {email : cookies.get("email_id")}).then((response) => {
        const questions = response.data.questions
        setQuestions2(questions)
      })
      })
  }
  return (
    <div>
      <div>
        <div>
          <h1>SSD Project - 9 Men Morris Game</h1>
          <hr />      <NAvbar></NAvbar>

          <h1>Pending Todos</h1>
          <div>
            <center>
              <div
                id="displayanswers"
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Grid columns={3}>
                  {questions2.map((question, index) => (
                    <Grid.Row key={index}>
                      <Grid.Column width={5}>
                        <Segment>
                          <b>Title :  </b> {question.title}     &nbsp;&nbsp;&nbsp;
                          
                          <Button name={index} onClick={()=> handleDone(question._id)} icon='check' positive />
                          <Button name={index} onClick={()=> handleDelete(question._id)} icon='delete' negative />
                          <br /><br />
                          <b>Description:</b> {question.description}
                          <br /><br />
                          <b>Due Date:</b> {question.duedate ? question.duedate.slice(0, 10) : ''}
                        </Segment>
                      </Grid.Column>
                    </Grid.Row>
                  ))}
                </Grid>
              </div>
            </center>

          </div>
        </div>
      </div>
    </div>
  );
}


export default PendingTodos;
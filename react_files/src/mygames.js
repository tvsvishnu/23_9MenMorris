import React from "react";
import axios from "axios";
import 'semantic-ui-css/semantic.min.css';
import { Link } from "react-router-dom";
import { Grid, Image, Segment,  Icon } from 'semantic-ui-react'
import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { Input, Dropdown } from "semantic-ui-react";
import { Button } from 'semantic-ui-react'
import Cookies from "universal-cookie";
import NAvbar from "./navbar";
import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
// import {Link, Icon } from "semantic-ui-css"
function DisplayCreated(props) {
  const [questions2, setQuestions2] = useState([]);
  var cookies = new Cookies();
    useEffect(() => {
    async function fetchData() {
      axios.post('http://localhost:3001/createdgamesapi', {email : cookies.get("email_id")}).then((response) => {
        const questions = response.data.questions
        setQuestions2(questions)
      })
    }
    fetchData();
  }, []);

  var history = useNavigate();

  const handleEdit = (e) => {
    
    var qid2 = e;
    history('/editquestion/' + qid2)
  }
  return (
    <div>
      <div>
        <div>
          <h1>SSD Project - 9 Men Morris Game</h1>
          <hr />      <NAvbar></NAvbar>

          <h1>My Games</h1>
          <div>
            <center>
              <div
                id="displayanswers"
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <center>
                <Grid>
                <Grid.Row>
                  {questions2.map((question, index) => (
                      <Grid.Column width={5}>
                        <Segment>
                          <b>Game ID :</b> {question.game_id}   <Link to={`/game_page/${question.game_id}`}>
        <Icon name="location arrow" color="blue" link />
      </Link>
                          <br></br>
                          <b>Created Player :</b> {question.created_by}   
<br></br>
                          <b>Joined Player :</b> {question.joined_by}   
                             
                          
                          {/* <Button name={index} onClick={()=> handleEdit(index)} icon='edit' positive /> */}
                          
                        </Segment><br></br>
                      </Grid.Column>
                      
                  ))}
                    </Grid.Row>
                </Grid></center>
              </div>
            </center>

          </div>
        </div>
      </div>
    </div>
  );
}


export default DisplayCreated;
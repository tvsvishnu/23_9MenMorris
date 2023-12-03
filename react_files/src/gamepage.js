import React from "react";
import axios from "axios";
import moment from 'moment-timezone'
import 'semantic-ui-css/semantic.min.css';

import { Icon } from "semantic-ui-react";
import { useState } from "react";
import { Input } from "semantic-ui-react";
import {Button, Modal} from 'semantic-ui-react'
import NAvbar from "./navbar";
import { useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Cookies from "universal-cookie";
function GamePage(props) {
   
    var params = useParams();
    const [isClickable, setClickable] = useState(false);
    var game_id  = params.game_id;
    var cook = new Cookies();
    var email_id = cook.get("email_id")
    var navigate =  useNavigate();
    const [questions2, setQuestions2] = useState([]);
    const [moves, setMoves] = useState(0);
    const [colors, setColors] = useState(Array(24).fill("white"));
    const [curr_turn, setTurn] = useState(0);
    const [arr, setArr] = useState(Array(24).fill(2));    // 0 for first player, 1 for second player, 2 for empty
    const [online1, setonline1] = useState(false);
    const [online2, setonline2] = useState(false);
    var player_index = 0;
    useEffect(() => {
        async function fetchData() {
          axios.post('http://localhost:3001/gamedetailsapi', {"game_id" : params.game_id, "email_id" : email_id, "update" : false}).then((response) => {
            console.log(response)
            const questions = response.data.questions
            if(questions.length === 0){
                navigate("/created");
                
            }
            if(questions.length > 0){
                if(questions[0].created_by !== email_id && questions[0].joined_by !== email_id){
                    navigate("/created");
                }
            }
            
            setQuestions2(questions[0])
            setArr(questions[0].curr_saved)
            setColors(questions[0].colors)
            setTurn(questions[0].curr_turn)
            setMoves(questions[0].moves)
            if(questions[0].curr_turn === player_index){
                setClickable(true);
            }
            else{
                setClickable(false);
        
            }
            if(questions[0].created_by === email_id){
                        player_index = 0;
                    }
                    else{
                        player_index = 1;
                    }
          })
        }

        fetchData();
        }, []);
        // var firsttime = true;
        // var player_index = 0;
        // console.log(questions2)
        // if(firsttime){
        //     if(questions2.created_by === email_id){
        //         player_index = 0;
        //     }
        //     else{
        //         player_index = 1;
        //     }
        //     firsttime = false;
        // }   
        
    useEffect(() => {
    async function fetchData() {
      axios.post('http://localhost:3001/gamedetailsapi', {"game_id" : params.game_id, "update" : true, "player_index" : player_index, "email_id" : email_id}).then((response) => {
        console.log(response)
        const questions = response.data.questions
        if(questions.length === 0){
            navigate("/created");
            
        }
        if(questions.length > 0){
            if(questions[0].created_by !== email_id && questions[0].joined_by !== email_id){
                navigate("/created");
            }
        }
        setTurn(questions[0].curr_turn)
        if(questions[0].curr_turn === player_index){
            setClickable(true);
        }
        else{
            setClickable(false);
    
        }
        setQuestions2(questions[0])
        setArr(questions[0].curr_saved)
        setColors(questions[0].colors)
        setMoves(questions[0].moves)

        // alert(questions[0].lastaccessedtime)
        // alert(new Date() -  questions[0].lastaccessedtime[0])
        // alert(Date() - questions[0].lastaccessedtime[1])
            if(new Date() - questions[0].lastaccessedtime[0] > 2000){
                setonline1(false);
            }
            else{
                setonline1(true);
            }
            if(new Date() - questions[0].lastaccessedtime[1] > 2000){
                setonline2(false);
            }
            else{
                setonline2(true);
            }
        var eachtiles = find_no_of_each(questions[0].curr_saved)
        if(questions[0].moves > 18 && eachtiles[0] < 3){
            alert(questions[0].created_by + " Won the Game");
            navigate("/created");
        }
        if(questions[0].moves > 18 && eachtiles[1] < 3){
            alert(questions[0].joined_by + " Won the Game");
            navigate("/created");
        }
      })
    }
    const interval = setInterval(fetchData, 1000); // Call fetchGameDetails every 1 second

  return () => {
    clearInterval(interval); // Clear the interval when the component unmounts
  };
}, [game_id]);

  

      console.log(questions2);

      const find_no_of_each = (arrr) => {
        var count_a = 0;
        var count_b = 0;
        for(let i = 0; i < 24; i++){
            if(arrr[i] == 0){
                count_a++;
            }
            if(arrr[i] == 1){
                count_b++;
            }
        }
        
        return [count_a, count_b];
      }
    
      const already_exists = (arrr, index) => {
        if(arrr[index] == 2){
            return true;
        }
        return false;
      }
      const formed_bool = (arrr, indexx) => {
        console.log(arrr)

        if(arrr[0] == arrr[1] && arrr[1] == arrr[2]){
                if(arrr[0] == curr_turn && (indexx == 0 || indexx == 1 || indexx == 2)){
                    return [true, arrr[0]];

            

            }
        }
        if(arrr[0] == arrr[9] && arrr[9] == arrr[21]){
            if(arrr[0] == curr_turn && (indexx == 0 || indexx == 9 || indexx == 21)){
                return [true, arrr[0]];

            }
        }

        if(arrr[3] == arrr[4] && arrr[4] == arrr[5]){
            if(arrr[3]== curr_turn && (indexx == 3 || indexx == 4 || indexx == 5)){
                return [true, arrr[3]];

            }
        }
        if(arrr[3] == arrr[10] && arrr[10] == arrr[18]){
            if(arrr[3] == curr_turn && (indexx == 3 || indexx == 10 || indexx == 18)){
                return [true, arrr[3]];

            }
        }

        if(arrr[6] == arrr[7] && arrr[7] == arrr[8]){
            if(arrr[6] == curr_turn && (indexx == 6 || indexx == 7 || indexx == 8)){
                return [true, arrr[6]];

            }
        }
        if(arrr[6] == arrr[11] && arrr[11] == arrr[15]){
            if(arrr[6] == curr_turn && (indexx ==6 || indexx == 11 || indexx == 15)){
                return [true, arrr[6]];

            }
        }
        if(arrr[5] == arrr[13] && arrr[13] == arrr[20]){
            if(arrr[5] == curr_turn && (indexx == 5 || indexx == 13 || indexx == 20)){
                return [true, arrr[5]];

            }
        }

        if(arrr[21] == arrr[22] && arrr[22] == arrr[23]){
            if(arrr[21] == curr_turn && (indexx == 21 || indexx == 22 || indexx == 23)){
                return [true, arrr[21]];

            }
        }
        if(arrr[18] == arrr[19] && arrr[19] == arrr[20]){
            if(arrr[18] == curr_turn && (indexx == 18 || indexx == 19 || indexx == 20)){
                return [true, arrr[18]];

            }
        }
        if(arrr[15] == arrr[16] && arrr[16] == arrr[17]){
            if(arrr[15] == curr_turn && (indexx == 15 || indexx == 16 || indexx == 17)){
                return [true, arrr[15]];

            }
        }
        if(arrr[8] == arrr[12] && arrr[12] == arrr[17]){
            if(arrr[8] == curr_turn && (indexx == 8 || indexx == 12 || indexx == 17)){
                return [true, arrr[8]];

            }
        }

        if(arrr[12] == arrr[13] && arrr[13] == arrr[14]){
            if(arrr[12] == curr_turn && (indexx == 12 || indexx == 13 || indexx == 14)){
                return [true, arrr[12]];

            }
        }
        if(arrr[2] == arrr[14] && arrr[14] == arrr[23]){
            if(arrr[2] == curr_turn && (indexx == 2 || indexx == 14 || indexx == 23)){
                return [true, arrr[2]];

            }
        }
        return [false, 0];
      }

      const [selected, selectedStatus] = useState(0);
      const [prevmove, selectedPrevMove] = useState(0);

    //   var prevmove = null;
    //   var selected = 0;

      var colours_each = ["blue", "red"];
      const [second_click, setSecondClick] = useState(false);
      const handleClick = (index) => {
        if(already_exists(arr, index)){

        
        // alert(index)
        // alert(second_click)
        // console.log(`Circle ${index} was clicked.`);
        if(moves < 18){

        
        if(!second_click){
            const updatedArray = [...arr]; // Create a copy of the array
        updatedArray[index] = curr_turn; // Update the value at the specific index to 5
        setArr(updatedArray);
        const updatedColors = [...colors]; // Create a copy of the colors array
        updatedColors[index] = colours_each[curr_turn]; // Update color based on index
            setColors(updatedColors);


        setTurn(1 - curr_turn);
        axios.post('http://localhost:3001/updategame', {"game_id" : params.game_id, "curr_turn" : 1 - curr_turn, "moves" : moves + 1, "curr_saved" : updatedArray, "colors" : updatedColors}).then((response) => {
            console.log(response)
        });
    // console.log(arr)
    // console.log(colors)

        const a = find_no_of_each(updatedArray);
    // alert("ID : " + index     + ", 0s : " + a[0] + ", 1s : " +  a[1])
        var formed = formed_bool(updatedArray, index);
        console.log(formed)
        if(formed[0] == true && formed[1] == curr_turn){
            setTurn(1 - curr_turn);
            axios.post('http://localhost:3001/updategame', {"game_id" : params.game_id, "curr_turn" : curr_turn, "moves" : moves, "curr_saved" : updatedArray, "colors" : updatedColors}).then((response) => {
                console.log(response)
            });
        // setClickable(true);
            setSecondClick(true);
            // alert("Second Click")
        }


        }
        else{
            // alert("Clicked secondd")
            const updatedArray = [...arr]; // Create a copy of the array
            updatedArray[index] = 2; // Update the value at the specific index to 5
            setArr(updatedArray);
            const updatedColors = [...colors]; // Create a copy of the colors array
            updatedColors[index] = "white"; // Update color based on index
            setColors(updatedColors);
            console.log("After Removing a tile : ", arr);
            setSecondClick(false);
            // setTurn(1 - curr_turn);
            axios.post('http://localhost:3001/updategame', {"game_id" : params.game_id, "curr_turn" : 1 - curr_turn, "moves" : moves + 1,"curr_saved" : updatedArray, "colors" : updatedColors}).then((response) => {
                console.log(response)
            });
        }
    }


    else{
        // alert(selected)
        // alert(curr_turn)
        if(selected === 0){
            // alert("Its in Selected 0")
            // prevmove = index;
            selectedPrevMove(index);
            // selected = 1 - selected;
            selectedStatus(1);
        }
        else if(selected === 1){
            const updatedArray = [...arr]; // Create a copy of the array

            updatedArray[prevmove] = 2; // Update the value at the specific index to 5
            updatedArray[index] = curr_turn;
            setArr(updatedArray);
            const updatedColors = [...colors]; // Create a copy of the colors array
            updatedColors[prevmove] = "white"; // Update color based on index
            updatedColors[index] = colours_each[curr_turn]; // Update color based on index
            setColors(updatedColors);

            var formed = formed_bool(updatedArray, index);

            if(formed[0] == true && formed[1] == curr_turn){
                selectedStatus(2);
                // alert("Formed")
                setTurn(curr_turn);
                axios.post('http://localhost:3001/updategame', {"game_id" : params.game_id, "curr_turn" : curr_turn, "moves" : moves + 1,"curr_saved" : updatedArray, "colors" : updatedColors}).then((response) => {
                    console.log(response)
                });
            }
            else{
                selectedStatus(0);
                // alert("Entered Here")
                setTurn(1 - curr_turn);
                axios.post('http://localhost:3001/updategame', {"game_id" : params.game_id, "curr_turn" : 1 - curr_turn, "moves" : moves + 1,"curr_saved" : updatedArray, "colors" : updatedColors}).then((response) => {
                    console.log(response)
                });
            }                

            console.log("After Removing a tile : ", arr);
            // selected = 1 - selected;
            
            




            
            
        }
        else if(selected === 2){
            const updatedArray = [...arr]; // Create a copy of the array
            // alert("Entered into Selected 2")
            updatedArray[index] = 2;
            setArr(updatedArray);
            const updatedColors = [...colors]; // Create a copy of the colors array
            updatedColors[index] = "white"; // Update color based on index
            setColors(updatedColors);
            axios.post('http://localhost:3001/updategame', {"game_id" : params.game_id, "curr_turn" : 1 - curr_turn, "moves" : moves + 1,"curr_saved" : updatedArray, "colors" : updatedColors}).then((response) => {
                    console.log(response)
                });

                selectedStatus(0);
        }



    }

        }
    
      };
      
      const onlineStyle = {
        display: 'inline-block',
        backgroundColor: 'green',
        color: 'white',
        padding: '2px 20px',
        borderRadius: '25px',
        fontWeight: 'bold',
      };
      const offlineStyle = {
        display: 'inline-block',
        backgroundColor: 'red',
        color: 'white',
        padding: '2px 20px',
        borderRadius: '25px',
        fontWeight: 'bold',
      };

      const columnStyle = {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        // height: '100vh',
        // border: '1px solid #333', // Border on the left side
    };
    
      const sideColumnStyle = {
        flex: '1',
        textAlign: 'center',
        backgroundColor: '#f9f9f9',
        padding: '20px',
        border: '1px solid #333', // Border on the left side
        // borderBottom: '1px solid #333', // Border on the left side
      };
    
      const centerColumnStyle = {
        flex: '2',
        textAlign: 'center',
        // backgroundColor: '#e0e0e0',
        // padding: '20px',
        // border: '1px solid #333', // Border on the left side
         // Border on the right side
      };

      const [showModal, setShowModal] = useState(false);
  const history = useNavigate();

  const redirectToAnotherPage = () => {
    // Redirect to another page using history.push
    history('/created'); // Replace '/another-page' with your desired URL
  };

  // Condition based on which the modal will be displayed
  const conditionSatisfied = true; // Replace with your condition

  const handleModalClose = () => {
    setShowModal(false);
  };
    return (
        <div>
{/* <meta name="viewport" content="width=device-width, initial-scale=1.0"/> */}

            <h1>SSD Project - 9 Men Morris Game</h1><NAvbar></NAvbar>
         
           <div style={columnStyle}>
      <div style={sideColumnStyle}>
      <b>Created By : </b> {questions2.created_by}  {online1 ? <div style={onlineStyle}>Online</div> : <div style={offlineStyle}>Offline</div>}  
      </div>
      <div style={{pointerEvents: isClickable ? 'auto' : 'none',
        opacity: isClickable ? 1 : 0.6}}>
      <div style={centerColumnStyle}>
        <br></br>
      <b>Game ID : </b> {questions2.game_id} <br></br>
            
            <svg width="600" height="550">
            <circle class="circle" id="circle0" cx="50" cy="50" r="20" stroke="black" stroke-width="2" fill={colors[0]}
                onClick={() => handleClick(0)}  />
            <line x1="70" y1="50" x2="280" y2="50" stroke="black" stroke-width="2" />
            <circle class="circle" id="circle1" cx="300" cy="50" r="20" stroke="black" stroke-width="2" fill={colors[1]}
                onClick={() => handleClick(1)}  />
            <line x1="320" y1="50" x2="530" y2="50" stroke="black" stroke-width="2" />
            <circle class="circle" id="circle2" cx="550" cy="50" r="20" stroke="black" stroke-width="2" fill={colors[2]}
                onClick={() => handleClick(2)}  />

            <circle class="circle" id="circle3" cx="130" cy="120" r="20" stroke="black" stroke-width="2" fill={colors[3]}
          onClick={() => handleClick(3)}  />
            <line x1="150" y1="120" x2="280" y2="120" stroke="black" stroke-width="2" />
            <circle class="circle" id="circle4" cx="300" cy="120" r="20" stroke="black" stroke-width="2" fill={colors[4]}
                onClick={() => handleClick(4)}  />
            <line x1="320" y1="120" x2="460" y2="120" stroke="black" stroke-width="2" />
            <circle class="circle" id="circle5" cx="470" cy="120" r="20" stroke="black" stroke-width="2" fill={colors[5]}
                  onClick={() => handleClick(5)}
                   />


            <circle class="circle" id="circle6" cx="210" cy="190" r="20" stroke="black" stroke-width="2" fill={colors[6]}
                onClick={() => handleClick(6)}  />
            <line x1="230" y1="190" x2="280" y2="190" stroke="black" stroke-width="2" />
            <circle class="circle" id="circle7" cx="300" cy="190" r="20" stroke="black" stroke-width="2" fill={colors[7]}
                onClick={() => handleClick(7)}  />
            <line x1="320" y1="190" x2="370" y2="190" stroke="black" stroke-width="2" />
            <circle class="circle" id="circle8" cx="390" cy="190" r="20" stroke="black" stroke-width="2" fill={colors[8]}
                onClick={() => handleClick(8)}  />

            <line x1="300" y1="70" x2="300" y2="100" stroke="black" stroke-width="2" />
            <line x1="300" y1="140" x2="300" y2="170" stroke="black" stroke-width="2" />

            <line x1="210" y1="210" x2="210" y2="240" stroke="black" stroke-width="2" />
            <line x1="210" y1="280" x2="210" y2="310" stroke="black" stroke-width="2" />

            <line x1="390" y1="210" x2="390" y2="240" stroke="black" stroke-width="2" />
            <line x1="390" y1="280" x2="390" y2="310" stroke="black" stroke-width="2" />

            <line x1="130" y1="140" x2="130" y2="240" stroke="black" stroke-width="2" />
            <line x1="130" y1="280" x2="130" y2="380" stroke="black" stroke-width="2" />

            <line x1="50" y1="70" x2="50" y2="240" stroke="black" stroke-width="2" />
            <line x1="50" y1="280" x2="50" y2="450" stroke="black" stroke-width="2" />

            <line x1="470" y1="140" x2="470" y2="240" stroke="black" stroke-width="2" />
            <line x1="470" y1="280" x2="470" y2="380" stroke="black" stroke-width="2" />

            <line x1="550" y1="70" x2="550" y2="240" stroke="black" stroke-width="2" />
            <line x1="550" y1="280" x2="550" y2="450" stroke="black" stroke-width="2" />

            <circle class="circle" id="circle9" cx="50" cy="260" r="20" stroke="black" stroke-width="2" fill={colors[9]}
                onClick={() => handleClick(9)}  />
            <line x1="70" y1="260" x2="110" y2="260" stroke="black" stroke-width="2" />
            <circle class="circle" id="circle10" cx="130" cy="260" r="20" stroke="black" stroke-width="2" fill={colors[10]}
                onClick={() => handleClick(10)}  />
            <line x1="150" y1="260" x2="190" y2="260" stroke="black" stroke-width="2" />
            <circle class="circle" id="circle11" cx="210" cy="260" r="20" stroke="black" stroke-width="2" fill={colors[11]}
                onClick={() => handleClick(11)}  />

            <circle class="circle" id="circle12" cx="390" cy="260" r="20" stroke="black" stroke-width="2" fill={colors[12]}
                onClick={() => handleClick(12)}  />
            <line x1="410" y1="260" x2="450" y2="260" stroke="black" stroke-width="2" />
            <circle class="circle" id="circle13" cx="470" cy="260" r="20" stroke="black" stroke-width="2" fill={colors[13]}
                onClick={() => handleClick(13)}  />
            <line x1="490" y1="260" x2="530" y2="260" stroke="black" stroke-width="2" />
            <circle class="circle" id="circle14" cx="550" cy="260" r="20" stroke="black" stroke-width="2" fill={colors[14]}
                onClick={() => handleClick(14)}  />

            ////////////////////////////////////////////////////////////////////////////////////////////////
            <circle class="circle" id="circle15" cx="210" cy="330" r="20" stroke="black" stroke-width="2" fill={colors[15]}
                onClick={() => handleClick(15)}  />
            <line x1="230" y1="330" x2="280" y2="330" stroke="black" stroke-width="2" />
            <circle class="circle" id="circle16" cx="300" cy="330" r="20" stroke="black" stroke-width="2" fill={colors[16]}
                onClick={() => handleClick(16)}  />
            <line x1="320" y1="330" x2="370" y2="330" stroke="black" stroke-width="2" />
            <circle class="circle" id="circle17" cx="390" cy="330" r="20" stroke="black" stroke-width="2" fill={colors[17]}
                onClick={() => handleClick(17)}  />

            <circle class="circle" id="circle18" cx="130" cy="400" r="20" stroke="black" stroke-width="2" fill={colors[18]}
                onClick={() => handleClick(18)}  />
            <line x1="150" y1="400" x2="280" y2="400" stroke="black" stroke-width="2" />
            <circle class="circle" id="circle19" cx="300" cy="400" r="20" stroke="black" stroke-width="2" fill={colors[19]}
                onClick={() => handleClick(19)}  />
            <line x1="320" y1="400" x2="460" y2="400" stroke="black" stroke-width="2" />
            <circle class="circle" id="circle20" cx="470" cy="400" r="20" stroke="black" stroke-width="2" fill={colors[20]}
                onClick={() => handleClick(20)}  />


            <circle class="circle" id="circle21" cx="50" cy="470" r="20" stroke="black" stroke-width="2" fill={colors[21]}
                onClick={() => handleClick(21)}  />
            <line x1="70" y1="470" x2="280" y2="470" stroke="black" stroke-width="2" />
            <circle class="circle" id="circle22" cx="300" cy="470" r="20" stroke="black" stroke-width="2" fill={colors[22]}
                onClick={() => handleClick(22)}  />
            <line x1="320" y1="470" x2="530" y2="470" stroke="black" stroke-width="2" />
            <circle class="circle" id="circle23" cx="550" cy="470" r="20" stroke="black" stroke-width="2" fill={colors[23]}
                onClick={() => handleClick(23)}  />


            <line x1="300" y1="350" x2="300" y2="380" stroke="black" stroke-width="2" />
            <line x1="300" y1="420" x2="300" y2="450" stroke="black" stroke-width="2" />
        </svg>
      </div>
      </div>
      <div style={sideColumnStyle}>
      <b>Joined Player : </b> {questions2.joined_by} {online2 ? <div style={onlineStyle}>Online</div> : <div style={offlineStyle}>Offline</div>} 
      </div>
    </div>

           
           {/* {questions2.lastaccessedtime ? new Date() - questions2.lastaccessedtime[0] : ""} */}
            










        </div>
    );
}
export default GamePage;
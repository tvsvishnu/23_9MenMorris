const express = require('express')
const app = express()
const port = 3001
var cors = require('cors');
app.use(cors());
app.set("view engine", "ejs");
const bodyparser = require("body-parser");
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);


// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://tvsvishnu:TVSV1234@cluster0.ngem1.mongodb.net/?retryWrites=true&w=majority";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);

// let mongoose = require('mongoose');

// let mongoDB = `mongodb+srv://tvsvishnu:1234@cluster0.ngem1.mongodb.net/?retryWrites=true&w=majority`;


// const connectDB = async () => {
//     try {
//         const conn = await mongoose.connect(mongoDB, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true
//           });
      
//           console.log(`MongoDB connected: ${conn.connection.host}`);
//     } catch (err) {
//         console.log(err);
//         process.exit(1);
//     }
// }
// connectDB();
// module.exports = { connectDB };
// mongoose.connect("mongodb+srv://tvsvishnu:TVSV1234@cluster0.ngem1.mongodb.net/?retryWrites=true&w=majority", {useNewUrlParser: true,  useUnifiedTopology: true});

mongoose.connect("mongodb://0.0.0.0:27017/ssddb", {useNewUrlParser: true});

const bcrypt = require('bcrypt')

const userSchema = {

    email: String,
    password : String,
};
const usersModel = mongoose.models.usersModel || mongoose.model('ssdprojectusers', userSchema);
const gameSchema = {
    game_id : String,
    created_by : String,
    joined_by : String,
    lastaccessedtime : [Number, Number],
    curr_saved : [Number],
    curr_turn : Number,
    colors : [String],
    moves : Number
};
const gameModel = mongoose.models.gameModel || mongoose.model('games', gameSchema);

// const gameSchema2 = {
//     game_id : String,
//     joined_by : String,
// };
// const gameModel2 = mongoose.models.gameModel2 || mongoose.model('joined_games', gameSchema);



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/register', async (req, res) => {
    console.log(req.body.email)
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = new usersModel({
        email: req.body.email,
        password: hashedPassword
    });

    usersModel.find({email : req.body.email}).then((data) => {
        console.log(data)
        if(data[0] != undefined){
            console.log("Enteredd")
            res.send({"statuss" : "already"})
            res.end()
        }
        else{
            newUser.save().then(()=>{
                res.send({"statuss" : "success"})
               
            }).catch((err)=>{
                console.log(err);
            })
            console.log("Entered")
        }
    })
    
})

// app.get('/creategame')

app.post('/creategame', async (req, res) => {
    console.log("Printing in Server API")
    console.log(req.body)
    // const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newGame = new gameModel({
        game_id : Math.floor(Math.random()*90000) + 10000,
        created_by : req.body.email,
        joined_by : "",
        moves : 0,
        curr_turn : 0,
        curr_saved :Array.from({ length: 24 }, () => 2),
        colors :Array.from({ length: 24 }, () => "white"),
        lastaccessedtime : [new Date(), new Date()]
        });

    
    newGame.save().then(()=>{
                res.send({"statuss" : "success"})
               
            }).catch((err)=>{
                console.log(err);
            })
            console.log("Entered")
        
    
    
})

// app.post('/inshistory', (req, res) => {
//     console.log(req.body)
//     const newHistory = new historyModel({
//         email: req.body.email_id,
//         ques: req.body.selectedQuestion.ques,
//         ans : req.body.selectedQuestion.ans,
//     });

   
//     newHistory.save().then(()=>{
//                 res.send({"statuss" : "success"})
               
//             }).catch((err)=>{
//                 console.log(err);
//             })
//             console.log("Entered")
        
    
// })


// app.post('/insq', (req, res) => {

//     const newQues = new questionsModel({
//         ques: req.body.ques,
//         ans: req.body.ans
//     });

    
//             newQues.save().then(()=>{
//                 res.send({"statuss" : "success"})
//             }).catch((err)=>{
//                 console.log(err);
//             })
//             console.log("Entered")
    
// })

// app.post('/todoapi', (req, res) => {
//     todoModel.find({email : req.body.email})
//     .sort({ date: -1 }) 
//     .exec()
//     .then((questions) => {
//         console.log('Questions sorted by timestamp (ascending):');
//         // console.log(questions)
//         res.send({ "questions": questions }); 
//     })
//     .catch((err) => {
//         console.error(err);
//         res.status(500).send('Internal Server Error'); 
//     });

    
// })

app.post('/createdgamesapi', (req, res) => {
    // const today = new Date();

    gameModel.find({$or: [
      { created_by: req.body.email },
      { joined_by: req.body.email }
  ]})
    .then((questions) => {
        console.log('Questions sorted by timestamp (ascending):');
        // console.log(questions)
        res.send({ "questions": questions }); 
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Internal Server Error'); 
    });
})



app.post('/updategame',  async (req, res) => {

    const { game_id, curr_saved, colors, curr_turn, moves } = req.body;

  try {
    const updatedGame = await gameModel.findOneAndUpdate(
      { game_id: game_id },
      { $set: { curr_saved: curr_saved, colors: colors, curr_turn : curr_turn, moves : moves } },
      { new: false }
    );
    if (!updatedGame) {
      return res.status(404).json({ error: 'Game not found' });
    }

    return res.status(200).json({ message: 'Game updated successfully', updatedGame });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }

})

app.post('/gamedetailsapi',  async (req, res) => {


    // const today = new Date();
    console.log("Hit By : " , req.body.email_id)
    // console.log(req.body)
    if(req.body.update){
        const elementIndexToUpdate = req.body.player_index; // Index of the element to update (0 or 1)

        const currentTimeElement = new Date(); // Create a new current time element
      
        const updateQuery = {
          $set: {
            [`lastaccessedtime.${elementIndexToUpdate}`]: currentTimeElement
          }
        };
      
        gameModel.updateOne(
          { game_id: req.body.game_id },
          updateQuery
        )
          .then((result) => {
            if (result.nModified > 0) {
              console.log(`Current time element ${elementIndexToUpdate} updated for game_id:`, req.body.game_id);
              // res.status(200).send(`Current time element ${elementIndexToUpdate} updated successfully`);
            } else {
              // console.log('No document found for game_id:', req.body.game_id);
              // res.status(404).send('Game not found');
            }
          })
          .catch((err) => {
            console.error('Error:', err);
          //   res.status(500).send('Internal Server Error');
          });
    }
    


    gameModel.find({game_id : req.body.game_id})
    .then((questions) => {
        console.log('Questions sorted by timestamp (ascending):');
        console.log(questions)
        res.send({ "questions": questions }); 
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Internal Server Error'); 
    });
})


app.post('/joingame', async(req, res) => {
    const game_id = req.body.game_id
    const update_value = req.body.email
    // const { gameid, update_value } = req.body;

    if (!game_id || !update_value) {
      return res.status(400).json({ error: "Please provide 'gameid' and 'update_value' in the request body" });
    }
  
    const foundGame = await gameModel.findOne({game_id : req.body.game_id});
  
    if (foundGame) {
      if (!foundGame.joined_by) {
        if(foundGame.created_by != update_value){
            foundGame.joined_by = update_value;
            await foundGame.save();
            return res.send({"data" : "joined"})
        }
        else{
            return res.send({"data" : "same_user_joining"})
        }
        
        // return res.status(200).json({ message: `Updated joined_by field for GameID ${game_id}` });
      } else {
        return res.send({"data" : "already_joined"})
        // return res.status(200).json({ message: `Game with GameID ${game_id} already has a value in joined_by field` });
      }
    } else {
        return res.send({"data" : "game_not_found"})
        // return res.status(404).json({ error: `No game found with GameID ${game_id}` });
    }
    
    

})
// app.post('/changestatus', (req, res) => {
//     // const today = new Date();
//     const _id = req.body._id
//     todoModel.updateOne(
//         { _id },
//         { $set: { status: true } },
//         { new: true } // Set new to true to return the updated document
//       )
//     .sort({ date: -1 }) 
//     .exec()
//     .then((questions) => {
//         console.log('Questions sorted by timestamp (ascending):');
//         // console.log(questions)
//         res.send({ "questions": questions }); 
//     })
//     .catch((err) => {
//         console.error(err);
//         res.status(500).send('Internal Server Error'); 
//     });
// })

// app.post('/deletetodo', (req, res) => {
//     // const today = new Date();

//     todoModel.deleteMany({_id : req.body._id })
//     .sort({ date: -1 }) 
//     .exec()
//     .then((questions) => {
//         console.log('Questions sorted by timestamp (ascending):');
//         // console.log(questions)
//         res.send({ "questions": questions }); 
//     })
//     .catch((err) => {
//         console.error(err);
//         res.status(500).send('Internal Server Error'); 
//     });
// })
// app.post('/pendingtodoapi', (req, res) => {
//     todoModel.find({email : req.body.email, status : false })
//     .sort({ date: -1 }) 
//     .exec()
//     .then((questions) => {
//         console.log('Questions sorted by timestamp (ascending):');
//         // console.log(questions)
//         res.send({ "questions": questions }); 
//     })
//     .catch((err) => {
//         console.error(err);
//         res.status(500).send('Internal Server Error'); 
//     });
// })

// app.post('/historyapi', (req, res) => {
//     console.log(req.body.email_id)
//     historyModel.find({email : req.body.email_id})
//     .sort({ timestamp: -1 }) 
//     .exec()
//     .then((questions) => {
//         console.log('Questions sorted by timestamp (ascending):');
//         console.log(questions)
//         res.send({ "questions": questions }); 
//     })
//     .catch((err) => {
//         console.error(err);
//         res.status(500).send('Internal Server Error'); 
//     });
// })

// app.post('/historydeleteapi', (req, res) => {
//     console.log(req.body)
//     historyModel.deleteMany({ email: req.body.email_id })
//         .exec()
//         .then(() => {
//             res.send({ message: `Deleted all records with email ID` });
//         })
//         .catch((err) => {
//             console.error(err);
//             res.status(500).send('Internal Server Error');
//         });
// })


// app.post('/editquestion', (req, res) => {
//     console.log(req.body)
//     questionsModel.deleteMany({ _id: req.body.currqid })
//         .exec()
//         .then(() => {

//             if(req.body.deleteqq){
//                 const newQues = new questionsModel({
//                     ques: req.body.ques,
//                     ans: req.body.ans
//                 });

//                         newQues.save().then(()=>{
//                             res.send({"statuss" : "success"})
//                         }).catch((err)=>{
//                             console.log(err);
//                         })
//                         console.log("Entered")
//             }
//             else{
//                 res.send({"statuss" : "success"})

//             }
//             console.log("Done")
//         })
//         .catch((err) => {
//             console.error(err);
//             res.status(500).send('Internal Server Error');
//         });
// })

app.post('/login', async (req, res) => {
    console.log(req.body.email)

    const user = await usersModel.findOne({ email: req.body.email })

    usersModel.find({email : req.body.email}).then(async (data) => {
        console.log(data)
        if(data[0] != undefined){
            const userAllowed = await bcrypt.compare(req.body.password, user.password)
            if(userAllowed){
                res.send({"statuss" : "logged"})
            }
            else{
                res.send({"statuss" : "exists"})
        
            }
        }
        else{
            res.send({"statuss" : "no"})
        }
    })
    
    
    // 2. compare the password from req vs password in db - Authenticated ok
        
    
})
    


    




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
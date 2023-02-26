require("dotenv").config();
const PORT=process.env.PORT
const express=require("express")
const connect=require("./config/db")
const cors=require("cors")
const { Telegraf } = require("telegraf");
const Trello = require('node-trello');
const bot = new Telegraf(process.env.BOT_TOKEN);
const userRoute=require("./src/routes/userRoute");
const taskRoute=require("./src/routes/taskRoute")
const loginController = require("./src/controller/userController");
const { AddTaskFromTelegram, RemoveTaskFromTelegram, GetTaskTelegram } = require("./src/controller/taskController");

const TRELLO_API_KEY = 'a97889fe9a471d296a3156a37ffed72d';
const TRELLO_TOKEN = 'ATTAff775878c4a01ebb31a402792c31d6bde3137b038df3519db657b11e14154f2267967C52';
const trello = new Trello(TRELLO_API_KEY, TRELLO_TOKEN);
var Boardid=""
var Listid=""
var trelloUrl=""
const app=express()
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())


app.use("/user",userRoute)
app.use("/task",taskRoute)

bot.startWebhook("/webhook", null, 5000);
bot.command("start", (res) => {
    res.reply("Welcome! Please use the /user command to authenticate.");
});
bot.command("user", (res) => {
    console.log(res)
    if (res.message) {
      let user = {name: res.message.from.first_name,telgram_user_id: res.message.from.id,};
      res.reply(loginController(user));
      res.reply(`Hello ${res.message.from.first_name}! ID: ${res.message.from.id}.You can try for /add task in trello board or /remove task from trello board , you want to see your all task /getmytask `);
    } else {
      res.reply("You are not logged in. Please use the /user command to authenticate.");
    }
});
bot.command("add", (res) => {
    res.reply(
      `Thank you! please provide your task in below format. for ex: "addTask_taskTitle_taskDescription_status(pending,doing,done) or to create a Trello board first login on trello and then try /create_board"`
    );
});
bot.command("create_board",(res)=>{
    res.reply(`Thank you! please provide your task in below format. for ex: "createBoard_boardName`)
})
bot.command("create_list",(res)=>{
  res.reply(`Thank you! please provide your list name in below format. for ex: "createList_boardName_listName`)
})

bot.command("create_card",(res)=>{
  res.reply(`Thank you! please provide your card name in below format. for ex: "createCard_ListName_cardName`)
})
bot.command("getmytask", async (res) => {
    const user_id = res.message.from.id;
   console.log(user_id)
    let data = await GetTaskTelegram(user_id);
  
     console.log(data)
  
    res.reply(`Thank you! Here list of you added task on Trello board`);
    if (data.length == 0) {
      res.reply("Your Task list is empty! you can Add Task using /add");
    } else {
      data.map((ele, index) => {
        res.reply(
          `Task Title: ${ele.task_title}, Task Description: ${ele.task_description}`
        );
      });
    }
});
bot.command("remove", (res) => {
    res.reply(`Thank you! please provide your task id in below format. for ex: "remove_TaskId:123"`);
});
bot.command("open_my_trello_board", (res) => {
    // SaveTempUser(res.message.from.id);
  
    // bot.telegram.sendMessage(
    //   res.from.id,
    //   `Please follow this link: <a href="${process.env.LOCALHOST}/${res.message.from.id}">${process.env.LOCALHOST}</a>`,
    //   { parse_mode: "HTML" }
    // );
});
bot.use(async (res) => {
    if (res.message.text.includes("addTask")) {
      const taskArr = res.message.text.split("_");
  
      const task_title = taskArr[1];
      const task_description = taskArr[2];
      const status = taskArr[3];
      const user_id = res.message.from.id;
  
      res.reply(
        AddTaskFromTelegram({
          task_title,
          task_description,
          status,
          user_id,
        })
      );
    } else if (res.message.text.includes("remove_TaskId")) {
      const TaskId = res.message.text.split(":");
      const user_id = res.message.from.id;
      //console.log(TaskId,user_id);
      res.reply(await RemoveTaskFromTelegram(user_id, TaskId[1]));
    } 
    else if (res.message.text.includes("createBoard")) {
        const TaskId = res.message.text.split("_");
        const user_id = res.message.from.id;
        console.log(TaskId[1],user_id);
         // Create the board
 trello.post('/1/boards/', { name: TaskId[1] }, (err, data) => {
   
    Boardid=data.id
    trelloUrl=data.url
  // console.log(data)
  })
  
       return  res.reply(`board created to create a list on board:- ${TaskId[1]} /create_list `);
 } 
 else if (res.message.text.includes("createList")) {
  const TaskId = res.message.text.split("_");
  console.log(res.message.text)
  console.log(Boardid,"Boardid")
  const user_id = res.message.from.id;

trello.post(`/1/lists`, { name: TaskId[2], idBoard:Boardid }, (err, data) => {
 
  Listid=data.id
 // console.log(data)
});

   return res.reply(`list created to create a card on list:- ${TaskId[2]} /create_card `);
} 

else if (res.message.text.includes("createCard")) {
  const TaskId = res.message.text.split("_");
  console.log(res.message.text)
  console.log(Boardid,"Boardid",Listid,"Listid")
  const user_id = res.message.from.id;


  trello.get(`/1/boards/${Boardid}/lists`, (err, lists) => {
    const list = lists.find((l) => l.name === TaskId[1]);
    if (!list) {
    console.log(list)
     return res.reply(`list not found`)
    }

    // Add the card to the list
    trello.post(`/1/cards/`, { name: TaskId[2], idList: Listid }, (err, data) => {
      // if (err) {
      //  return res.reply(`Error adding card: ${err}`);
      // } else {
      //   bot.sendMessage(chatId, `Card added to list ${listName} with ID ${data.id}`);
      // }
      console.log(data)
    });

    return  res.reply(`card created to check go on trello by click ${trelloUrl}  `);

  });

} 
    
    
    else {
      res.reply("Please Provide correct command!");
    }
  });
  
bot.launch();


app.listen(PORT,async ()=>{
    await connect()
    console.log("server is running on port 8080")
})
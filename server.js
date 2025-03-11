const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

let Monday = Array.from({ length: 3 }, () =>
  Array.from({ length: 10 }, (_, i) => i + 1)
);
let Tuesday = Array.from({ length: 3 }, () =>
  Array.from({ length: 10 }, (_, i) => i + 1)
);
let Wednesday = Array.from({ length: 3 }, () =>
  Array.from({ length: 10 }, (_, i) => i + 1)
);
let Thursday = Array.from({ length: 3 }, () =>
  Array.from({ length: 10 }, (_, i) => i + 1)
);
let Friday = Array.from({ length: 3 }, () =>
  Array.from({ length: 10 }, (_, i) => i + 1)
);
let Saturday = Array.from({length: 3}, () => Array.from({length: 10}, (_, i) => i + 1));



function getCurrentPeriod() {
  const hour = new Date().getHours(); //9
  if (hour >= 21 && hour < 22) return 1;
  if (hour >= 10 && hour < 11) return 2;
  if (hour >= 11 && hour < 12) return 3;
  if (hour >= 1 && hour < 2) return 4;
  if (hour >= 2 && hour < 3) return 5;
  if (hour >= 3 && hour < 4) return 6;

  return null;
}

app.get('/classes', async (req, res) => {
    const currentPeriod = getCurrentPeriod();
    if (currentPeriod === null) {
      res.send("noClasses");
    } else {
      let weekdays = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      let now =new Date();
      let day = weekdays[now.getDay()];
      let classrooms = [];
      switch(day){
        case 'Sunday':
          break;
        case 'Monday':
               classrooms = Monday[currentPeriod - 1];
                res.render("classes", { classrooms, currentPeriod });
          break;
        case 'Tuesday':
               classrooms = Tuesday[currentPeriod - 1];
                res.render("classes", { classrooms, currentPeriod });
          break;
        case 'Wednesday':
               classrooms =Wednesday[currentPeriod - 1];
                res.render("classes", { classrooms, currentPeriod });
          break;
        case 'Thursday':
               classrooms = Thursday[currentPeriod - 1];
                res.render("classes", { classrooms, currentPeriod });
          break;

        case 'Friday':
               classrooms = Friday[currentPeriod - 1];
                res.render("classes", { classrooms, currentPeriod });
          break;
       
        case 'Saturday':
               classrooms = Saturday[currentPeriod - 1];
                res.render("classes", { classrooms, currentPeriod });
          break;
      }


    }});


let users = [
  {username: 'user1', password: 'pass1'},
  {username: 'user2', password: 'pass2'}
  // Add more users as needed
];

app.get('/', (req, res) => {
  res.render('login');
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    res.redirect('/classes');
  } else {
    res.send('Incorrect Username and/or Password!');
  }
});
io.on('connection', (socket) => {
    socket.on('book', (room, period) => {


      let weekdays = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      let now = new Date();
      let day = weekdays[now.getDay()];
      switch (day) {
        case "Sunday":
          break;
        case "Monday":
Monday[period - 1] = Monday[period - 1].filter((r) => r !== room);
io.emit("update", Monday[period - 1]);          break;
        case "Tuesday":
Tuesday[period - 1] = Tuesday[period - 1].filter((r) => r !== room);
io.emit("update", Tuesday[period - 1]);          break;
        case "Wednesday":
Wednesday[period - 1] = Wednesday[period - 1].filter((r) => r !== room);
io.emit("update", Wednesday[period - 1]);          break;
        case "Thursday":
          Thursday[period - 1] = Thursday[period - 1].filter(r => r !== room);
        io.emit('update', Thursday[period - 1]);
        break;

        case "Friday":
Friday[period - 1] = Friday[period - 1].filter((r) => r !== room);
io.emit("update", Friday[period - 1]);          break;

        case "Saturday":
          Saturday[period - 1] = Saturday[period - 1].filter((r) => r !== room);
          io.emit("update", Saturday[period - 1]);
          break;
      }
        // periods[period - 1] = periods[period - 1].filter(r => r !== room);
        // io.emit('update', periods[period - 1]);
    });
});
setInterval(() => {
  const hour = new Date().getHours();

  if (hour >=23) {
    Monday = Array.from({ length: 3 }, () =>
      Array.from({ length: 10 }, (_, i) => i + 1)
    );
     Tuesday = Array.from({ length: 3 }, () =>
      Array.from({ length: 10 }, (_, i) => i + 1)
    );
    Wednesday = Array.from({ length: 3 }, () =>
      Array.from({ length: 10 }, (_, i) => i + 1)
    );
     Thursday = Array.from({ length: 3 }, () =>
      Array.from({ length: 10 }, (_, i) => i + 1)
    );
     Friday = Array.from({ length: 3 }, () =>
      Array.from({ length: 10 }, (_, i) => i + 1)
    );
     Saturday = Array.from({ length: 3 }, () =>
      Array.from({ length: 10 }, (_, i) => i + 1)
    );


  }
}, 30000); 
http.listen(3000, () => console.log('Server started on port 3000'));
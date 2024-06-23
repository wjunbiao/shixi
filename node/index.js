
const { application } = require("express");
let mysql = require("mysql")
const express = require('express')

const cors = require('cors');
const { title } = require("process");
const port = 3000;
const app = express();



 
// 用于解析JSON类型的请求体
app.use(express.json());
// 用于解析URLEncoded类型的请求体
app.use(express.urlencoded({ extended: true }));
app.use(cors());

let connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "hsp",
    database: "db05"
});

connection.connect((err) => {
    if (err) {
        console.error("连接失败：" + err.stack);
        return;
    }
    console.log("连接成功!");
})



//编写用户 tea_plan 接口
app.get('/tea_plan', (err, res) => {
    const state = err.query.state; // 获取查询参数
    //   console.log(state); // 输出: 123
      const teacher = err.query.teacher; // 获取查询参数
    //   console.log(teacher); // 输出: 123
    const sql = "SELECT * FROM tea_plan where state = ? and teacher = ?"
    connection.query(sql,[state,teacher],(err, result) => {

        if (err) {
            console.error("查询出错：" + err.message);
            return;
        }

        res.json(result)
    });
})



//编写用户 search tea_plan 接口
app.get('/tea_plan2', (err, res) => {
    const state = err.query.state; // 获取查询参数
      console.log(state); // 输出: 123
    const search = err.query.search; // 获取查询参数
    console.log(search); // 输出: 123
    
    const sql = "SELECT * FROM tea_plan where `state`=? and `title` = ?"
    
    connection.query(sql,[state,search],(err, result) => {

        if (err) {
            console.error("查询出错：" + err.message);
            return;
        }

        res.json(result)
    });
})


//编写添加 addtea_plan 接口
app.get('/addtea_plan', (err, res) => {
    const data = err.body;
  // 处理data
    const querystring = require('querystring');
    // console.log(querystring)
    const queryObject = querystring.parse(err.url.split('?')[1]);
    // console.log(queryObject)
    const teacher = queryObject['teacher'];
    const title = queryObject['title'];
    const text = queryObject['text'];
    const time = queryObject['time'];
    const state = queryObject['state'];

    console.log(teacher)
        // const sql = "SELECT * FROM tea_plan"
     const sql = 'INSERT INTO tea_plan (teacher,title,text,`time`,state) VALUES(\''+teacher+'\',\''+title+'\',\''+text+'\',\''+time+'\',\''+state+'\')';
     connection.query(sql, (err, result) => {
         if (err) {
             console.error("tea_plan 添加出错:" + err.message);
             return;
         } 
         res.json(result)
     });
 })

 //编写修改 tea_plan 接口
 app.get('/eduittea_plan/:id', (err, res) => {
    const { id } = err.params;
    console.log('接收到的ID是:', id); 
    const querystring = require('querystring');
    const queryObject = querystring.parse(err.url.split('?')[1]);
    console.log(queryObject)
    const title = queryObject['title'];
    const text = queryObject['text'];
    console.log(title)
    const sql = "update tea_plan set title=?,text=? where `id` = ?"
    //    const sql = "SELECT * FROM tea_activities where `id` = ?"
    connection.query(sql,[title,text,id] ,(err, result) => {
        if (err) {
            console.error("tea_plan修改出错：" + err.message);
            return;
        }
        res.json(result)
    });
})



//编写删除tea_plan接口
app.get('/deltea_plan/:id', (err, res) => {
    const { id } = err.params;
    console.log('接收到的ID是:', id);    
        //    const sql = "SELECT * FROM tea_plan where `id` = ?"
       const sql = "DELETE FROM tea_plan WHERE id=?"
    connection.query(sql,[id] ,(err, result) => {

        if (err) {
            console.error("tea_plan 删除出错：" + err.message);
            return;
        }

        res.json(result)
    });
})





//编写用户 tea_activities 接口
app.get('/tea_activities', (err, res) => {
    const search = err.query.search; // 获取查询参数
    console.log(search); // 输出: 123
    var sql =""
    if(search!=undefined){
     
     sql = "SELECT * FROM tea_activities where title = ?"
    }else{
    sql = "SELECT * FROM tea_activities"
    }
    connection.query(sql,[search],(err, result) => {

        if (err) {
            console.error("查询出错：" + err.message);
            return;
        }

        res.json(result)
    });
})

//编写添加 addtea_activities 接口
app.get('/addtea_activities', (err, res) => {
    const data = err.body;
  // 处理data
    const querystring = require('querystring');
    // console.log(querystring)
    const queryObject = querystring.parse(err.url.split('?')[1]);
    console.log(queryObject)
    const teacher = queryObject['teacher'];
    const title = queryObject['title'];
    const text = queryObject['text'];
    const time = queryObject['time'];

        // const sql = "SELECT * FROM tea_activities"
     const sql = 'INSERT INTO tea_activities (teacher,title,text,`time`) VALUES(\''+teacher+'\',\''+title+'\',\''+text+'\',\''+time+'\')';
     connection.query(sql, (err, result) => {
         if (err) {
             console.error("tea_activities添加出错:" + err.message);
             return;
         } 
         res.json(result)
     });
 })


 //编写修改tea_activities接口
app.get('/eduittea_activities/:id', (err, res) => {
    const { id } = err.params;
    console.log('接收到的ID是:', id); 
    const querystring = require('querystring');
    const queryObject = querystring.parse(err.url.split('?')[1]);
    const title = queryObject['title'];
    const text = queryObject['text'];
    const time = queryObject['time'];
    console.log(title)
    const sql = "update tea_activities set title=?,text=?,time=? where `id` = ?"
    //    const sql = "SELECT * FROM tea_activities where `id` = ?"
    connection.query(sql,[title,text,time,id] ,(err, result) => {
        if (err) {
            console.error("tea_activities修改出错：" + err.message);
            return;
        }
        res.json(result)
    });
})


//编写删除tea_activities接口
app.get('/deltea_activities/:id', (err, res) => {
    const { id } = err.params;
    console.log('接收到的ID是:', id);    
        //    const sql = "SELECT * FROM tea_activities where `id` = ?"
       const sql = "DELETE FROM tea_activities WHERE id=?"
    connection.query(sql,[id] ,(err, result) => {

        if (err) {
            console.error("tea_activities删除出错：" + err.message);
            return;
        }

        res.json(result)
    });
})





//编写添加addcourse接口
app.get('/addcourse', (err, res) => {
    const data = err.body;
  // 处理data
    const http = require('http');
    const querystring = require('querystring');
    // console.log(querystring)
    const queryObject = querystring.parse(err.url.split('?')[1]);
    console.log(queryObject)
    const teacher = queryObject['teacher'];
    const title = queryObject['title'];
    const text = queryObject['text'];
    const time = queryObject['time'];
    const state = queryObject['state'];

        // const sql = "SELECT * FROM course"
     const sql = 'INSERT INTO course (teacher,title,text,`time`,`state`) VALUES(\''+teacher+'\',\''+title+'\',\''+text+'\',\''+time+'\',\''+state+'\')';
     connection.query(sql, (err, result) => {
         if (err) {
             console.error("course 添加出错:" + err.message);
             return;
         } 
         res.json(result)
     });
 })

//编写修改activety接口
app.get('/eduitcourse/:id', (err, res) => {
    const { id } = err.params;
    console.log('接收到的ID是:', id); 
    const querystring = require('querystring');
    const queryObject = querystring.parse(err.url.split('?')[1]);
    const title = queryObject['title'];
    const text = queryObject['text'];
    const time = queryObject['time'];
    const state = queryObject['state'];
    // console.log(queryObject)
    const sql = "update course set title=?,text=?,time=?,`state`=? where `id` = ?"
    //    const sql = "SELECT * FROM activity where `id` = ?"
    connection.query(sql,[title,text,time,state,id] ,(err, result) => {
        if (err) {
            console.error("course 修改出错：" + err.message);
            return;
        }
        res.json(result)
    });
})


//编写删除 course 接口
app.get('/delcourse/:id', (err, res) => {
    const { id } = err.params;
    console.log('接收到的ID是:', id);    
        //    const sql = "SELECT * FROM activity where `id` = ?"
       const sql = "DELETE FROM course WHERE id=?"
    connection.query(sql,[id] ,(err, result) => {

        if (err) {
            console.error("course 删除出错：" + err.message);
            return;
        }

        res.json(result)
    });
})





//编写用户 course 接口
app.get('/course', (err, res) => {
    const state = err.query.state; // 获取查询参数
      console.log(state); // 输出: 123
      const teacher = err.query.teacher; // 获取查询参数
      console.log(teacher); // 输出: 123
    const sql = "SELECT * FROM course where state = ? and teacher = ?"
    connection.query(sql,[state,teacher],(err, result) => {

        if (err) {
            console.error("查询出错：" + err.message);
            return;
        }

        res.json(result)
    });
})

app.get('/courses', (err, res) => {
    const state = err.query.state; // 获取查询参数
      console.log(state); // 输出: 123
      const teacher = err.query.teacher; // 获取查询参数
      console.log(teacher); // 输出: 123
    const sql = "SELECT * FROM course where state = ? and teacher = ?"
    connection.query(sql,[state,teacher],(err, result) => {

        if (err) {
            console.error("查询出错：" + err.message);
            return;
        }

        res.json(result)
    });
})


app.get('/courses2', (err, res) => {
    const state = err.query.state; // 获取查询参数
      console.log(state); // 输出: 123
    const search = err.query.search; // 获取查询参数
    console.log(search); // 输出: 123
  const sql = "SELECT * FROM course where state = ? and `title` = ?"
  connection.query(sql,[state,search],(err, result) => {

      if (err) {
          console.error("查询出错：" + err.message);
          return;
      }

      res.json(result)
  });
})



//编写 plan 接口
app.get('/plan', (err, res) => {
    const sql = "SELECT * FROM plan"
    connection.query(sql,(err, result) => {

        if (err) {
            console.error("plan查询出错：" + err.message);
            return;
        }

        res.json(result)
    });
})




//编写search plan 接口
app.get('/plan2', (err, res) => {
    const search = err.query.search; // 获取查询参数
//   console.log(search); // 输出: 123
        // const sql = "SELECT * FR?OM activity "
    const sql = "SELECT * from plan where major=?"
    connection.query(sql,[search],(err, result) => {

        if (err) {
            console.error("search plan查询出错:" + err.message);
            return;
        }

        res.json(result)
    });
})


app.get('/addplan', (err, res) => {
    const data = err.body;
  // 处理data
    const querystring = require('querystring');
    // console.log(querystring)
    const queryObject = querystring.parse(err.url.split('?')[1]);
    console.log(queryObject)
    const major = queryObject['major'];
    const clas = queryObject['clas'];
    const plan = queryObject['plan'];
        // const sql = "SELECT * FROM plan"
     const sql = 'INSERT INTO plan (major,clas,plan) VALUES(\''+major+'\',\''+clas+'\',\''+plan+'\')';
     connection.query(sql, (err, result) => {
         if (err) {
             console.error("plan 添加出错:" + err.message);
             return;
         } 
         res.json(result)
     });
 })




 //编写修改 plan 接口
app.get('/eduitplan/:id', (err, res) => {
    const { id } = err.params;
    console.log('接收到的ID是:', id); 
    const querystring = require('querystring');
    const queryObject = querystring.parse(err.url.split('?')[1]);
    const major = queryObject['major'];
    const clas = queryObject['clas'];
    const plan = queryObject['plan'];
    console.log(title)
    const sql = "update plan set major=?,clas=?,plan=? where `id` = ?"
    //    const sql = "SELECT * FROM activity where `id` = ?"
    connection.query(sql,[major,clas,plan,id] ,(err, result) => {
        if (err) {
            console.error("plan 修改出错：" + err.message);
            return;
        }
        res.json(result)
    });
})

//编写删除 plan 接口
app.get('/delplan/:id', (err, res) => {
    const { id } = err.params;
    console.log('接收到的ID是:', id);    
        //    const sql = "SELECT * FROM plan where `id` = ?"
       const sql = "DELETE FROM plan WHERE id=?"
    connection.query(sql,[id] ,(err, result) => {

        if (err) {
            console.error("plan 删除出错：" + err.message);
            return;
        }

        res.json(result)
    });
})



app.get('/addenterprise', (err, res) => {
    const data = err.body;
  // 处理data
    const querystring = require('querystring');
    // console.log(querystring)
    const queryObject = querystring.parse(err.url.split('?')[1]);
    console.log(queryObject)
    const enterprise = queryObject['enterprise'];
    const post = queryObject['post'];
    const ask = queryObject['ask'];

        // const sql = "SELECT * FROM enterprise"
     const sql = 'INSERT INTO enterprise (enterprise,post,ask) VALUES(\''+enterprise+'\',\''+post+'\',\''+ask+'\')';
     connection.query(sql, (err, result) => {
         if (err) {
             console.error("enterprise 添加出错:" + err.message);
             return;
         } 
         res.json(result)
     });
 })




 //编写修改 enterprise 接口
app.get('/eduitenterprise/:id', (err, res) => {
    const { id } = err.params;
    console.log('接收到的ID是:', id); 
    const querystring = require('querystring');
    const queryObject = querystring.parse(err.url.split('?')[1]);
    const enterprise = queryObject['enterprise'];
    const post = queryObject['post'];
    const ask = queryObject['ask'];
    console.log(title)
    const sql = "update enterprise set enterprise=?,post=?,ask=? where `id` = ?"
    //    const sql = "SELECT * FROM activity where `id` = ?"
    connection.query(sql,[enterprise,post,ask,id] ,(err, result) => {
        if (err) {
            console.error("enterprise 修改出错：" + err.message);
            return;
        }
        res.json(result)
    });
})

//编写删除 enterprise 接口
app.get('/delenterprise/:id', (err, res) => {
    const { id } = err.params;
    console.log('接收到的ID是:', id);    
        //    const sql = "SELECT * FROM plan where `id` = ?"
       const sql = "DELETE FROM enterprise WHERE id=?"
    connection.query(sql,[id] ,(err, result) => {

        if (err) {
            console.error("enterprise 删除出错：" + err.message);
            return;
        }

        res.json(result)
    });
})







app.get('/addnotice', (err, res) => {
    const data = err.body;
  // 处理data
    const querystring = require('querystring');
    // console.log(querystring)
    const queryObject = querystring.parse(err.url.split('?')[1]);
    console.log(queryObject)
    const title = queryObject['title'];
    const text = queryObject['text'];
    const time = queryObject['time'];
    
        // const sql = "SELECT * FROM enterprise"
     const sql = 'INSERT INTO notice (title,text,time) VALUES(\''+title+'\',\''+text+'\',\''+time+'\')';
     connection.query(sql, (err, result) => {
         if (err) {
             console.error("notice 添加出错:" + err.message);
             return;
         } 
         res.json(result)
     });
 })




 //编写修改 plan 接口
app.get('/eduitnotice/:id', (err, res) => {
    const { id } = err.params;
    console.log('接收到的ID是:', id); 
    const querystring = require('querystring');
    const queryObject = querystring.parse(err.url.split('?')[1]);
    const title = queryObject['title'];
    const text = queryObject['text'];
    const time = queryObject['time'];
    console.log(title)
    const sql = "update notice set title=?,text=? where `id` = ?"
    //    const sql = "SELECT * FROM activity where `id` = ?"
    connection.query(sql,[title,text,parseInt(id)] ,(err, result) => {
        if (err) {
            console.error("notice 修改出错：" + err.message);
            return;
        }
        res.json(result)
    });
})

//编写删除 plan 接口
app.get('/delnotice/:id', (err, res) => {
    const { id } = err.params;
    console.log('接收到的ID是:', id);    
        //    const sql = "SELECT * FROM plan where `id` = ?"
       const sql = "DELETE FROM notice WHERE id=?"
    connection.query(sql,[id] ,(err, result) => {

        if (err) {
            console.error("notice 删除出错：" + err.message);
            return;
        }

        res.json(result)
    });
})
























//编写activity接口
app.get('/activity', (err, res) => {
    const teacher = err.query.teacher; // 获取查询参数
//   console.log(teacher); // 输出: 123
    const sql = "SELECT * FROM activity where teacher = ?"
    connection.query(sql,[teacher],(err, result) => {

        if (err) {
            console.error("activity查询出错：" + err.message);
            return;
        }

        res.json(result)
    });
})

//编写添加addactivity接口
app.get('/addactivity', (err, res) => {
    const data = err.body;
  // 处理data
    const http = require('http');
    const querystring = require('querystring');
    // console.log(querystring)
    const queryObject = querystring.parse(err.url.split('?')[1]);
    console.log(queryObject)
    const teacher = queryObject['teacher'];
    const title = queryObject['title'];
    const text = queryObject['text'];
    const time = queryObject['time'];
        // const sql = "SELECT * FROM activity"
     const sql = 'INSERT INTO activity (teacher,title,text,`time`) VALUES(\''+teacher+'\',\''+title+'\',\''+text+'\',\''+time+'\')';
     connection.query(sql, (err, result) => {
         if (err) {
             console.error("activity添加出错:" + err.message);
             return;
         } 
         res.json(result)
     });
 })

//编写修改activety接口
app.get('/eduitactivity/:id', (err, res) => {
    const { id } = err.params;
    console.log('接收到的ID是:', id); 
    const querystring = require('querystring');
    const queryObject = querystring.parse(err.url.split('?')[1]);
    const title = queryObject['title'];
    const text = queryObject['text'];
    const time = queryObject['time'];
    console.log(title)
    const sql = "update activity set title=?,text=?,time=? where `id` = ?"
    //    const sql = "SELECT * FROM activity where `id` = ?"
    connection.query(sql,[title,text,time,id] ,(err, result) => {
        if (err) {
            console.error("activity修改出错：" + err.message);
            return;
        }
        res.json(result)
    });
})


//编写search activity接口
app.get('/activity2', (err, res) => {
    const search = err.query.search; // 获取查询参数
//   console.log(search); // 输出: 123
        // const sql = "SELECT * FROM activity "
    const sql = "SELECT * from activity where title=?"
    connection.query(sql,[search],(err, result) => {

        if (err) {
            console.error("search activity查询出错:" + err.message);
            return;
        }

        res.json(result)
    });
})

//编写删除activety接口
app.get('/delactivety/:id', (err, res) => {
    const { id } = err.params;
    console.log('接收到的ID是:', id);    
        //    const sql = "SELECT * FROM activity where `id` = ?"
       const sql = "DELETE FROM activity WHERE id=?"
    connection.query(sql,[id] ,(err, result) => {

        if (err) {
            console.error("activety删除出错：" + err.message);
            return;
        }

        res.json(result)
    });
})


//编写用户search enterprise 接口
app.get('/enterprise2', (err, res) => {
    const search = err.query.search; // 获取查询参数
  console.log(search); // 输出: 123
        // const sql = "SELECT * FR?OM activity "
    const sql = "SELECT * from enterprise where enterprise=?"
    connection.query(sql,[search],(err, result) => {

        if (err) {
            console.error("search enterprise查询出错:" + err.message);
            return;
        }

        res.json(result)
    });
})

//编写用户enterprise接口
app.get('/enterprises', (err, res) => {
    const sql = "SELECT * FROM enterprise"
    connection.query(sql,(err, result) => {

        if (err) {
            console.error("查询出错：" + err.message);
            return;
        }

        res.json(result)
    });
})

//编写enterprise id 接口
app.get('/enterprise/:id', (err, res) => {
    const { id } = err.params;
//   console.log('接收到的ID是:', id);
    const sql = "SELECT * FROM enterprise where `id` = ?"
    connection.query(sql,[id] ,(err, result) => {

        if (err) {
            console.error("查询出错：" + err.message);
            return;
        }

        res.json(result)
    });
})



//编写task接口
app.get('/task', (err, res) => {
    const teacher = err.query.teacher; // 获取查询参数
//   console.log(teacher);
    const sql = "SELECT * FROM task where `teacher` = ?"
    connection.query(sql,[teacher] ,(err, result) => {

        if (err) {
            console.error("查询出错：" + err.message);
            return;
        }

        res.json(result)
    });
})


//编写添加addtask接口
app.get('/addtask', (err, res) => {
    const data = err.body;
  // 处理data
    const querystring = require('querystring');
    // console.log(querystring)
    const queryObject = querystring.parse(err.url.split('?')[1]);
    // console.log(queryObject)
    const teacher = queryObject['teacher'];
    const type = queryObject['type'];
    const start = queryObject['start'];
    const end = queryObject['end'];
    const text = queryObject['text'];
    const limit = queryObject['limit'];
        // const sql = "SELECT * FROM task"
     const sql = 'INSERT INTO task (teacher,type,`start`,`end`,`text`,`limit`) VALUES(\''+teacher+'\',\''+type+'\',\''+start+'\',\''+end+'\',\''+text+'\',\''+limit+'\')';
     connection.query(sql, (err, result) => {
         if (err) {
             console.error("task添加出错:" + err.message);
             return;
         } 
         res.json(result)
     });
 })
 
//编写修改task接口
app.get('/eduittask/:id', (err, res) => {
    const { id } = err.params;
    console.log('接收到的ID是:', id); 
    const querystring = require('querystring');
    console.log(querystring)
    const queryObject = querystring.parse(err.url.split('?')[1]);
    console.log(queryObject)
    const type = queryObject['type'];
    const start = queryObject['start'];
    const end = queryObject['end'];
    const text = queryObject['text'];
    const limit = queryObject['limit'];
    const sql = "update task set type=?,`start`=?,end=?,`limit`=?,`text`=? where `id` = ?"
    //    const sql = "SELECT * FROM activity where `id` = ?"
    connection.query(sql,[type,start,end,limit,text,id] ,(err, result) => {
        if (err) {
            console.error("task修改出错：" + err.message);
            return;
        }
        res.json(result)
    });
})



//编写删除activety接口
app.get('/deltask/:id', (err, res) => {
    const { id } = err.params;
    console.log('接收到的ID是:', id);    
        //    const sql = "SELECT * FROM task where `id` = ?"
       const sql = "DELETE FROM task WHERE id=?"
    connection.query(sql,[id] ,(err, result) => {

        if (err) {
            console.error("task删除出错：" + err.message);
            return;
        }

        res.json(result)
    });
})


//编写用户search enterprise 接口
app.get('/task2', (err, res) => {
    const search = err.query.search; // 获取查询参数
  console.log(search); // 输出: 123
        // const sql = "SELECT * FR?OM activity "
    const sql = "SELECT * from task where type=?"
    connection.query(sql,[search],(err, result) => {

        if (err) {
            console.error("search task查询出错:" + err.message);
            return;
        }

        res.json(result)
    });
})

//编写添加 add work接口
app.get('/addwork', (err, res) => {

    const data = err.body;
    // 处理data
      const http = require('http');
      const querystring = require('querystring');
      // console.log(querystring)
      const queryObject = querystring.parse(err.url.split('?')[1]);
      console.log(queryObject)
      const teacher = queryObject['teacher'];
      const name = queryObject['name'];
      const user_name = queryObject['user_name'];
      const type = queryObject['type'];
      const time = queryObject['time'];



    const sql = "insert into work (teacher,name,user_name,type,time) values(?,?,?,?,?)"
    // const sql = "SELECT * FROM work where `user_name` = ?"
    connection.query(sql,[teacher,name,user_name,type,time] ,(err, result) => {

        if (err) {
            console.error("work 添加出错：" + err.message);
            return;
        }

        res.json(result)
    });
})


//编写work接口
app.post('/work', (err, res) => {
    const userName = err.query.user_name; // 获取查询参数
//   console.log(userName); // 输出: 123
    const sql = "SELECT * FROM work where `user_name` = ?"
    connection.query(sql,[userName] ,(err, result) => {

        if (err) {
            console.error("查询出错：" + err.message);
            return;
        }

        res.json(result)
    });
})


app.get('/works/:id', (err, res) => {
    const { id } = err.params;
  console.log('接收到的ID是:', id);
    const sql = "SELECT * FROM enterprise where `id` = ?"
    connection.query(sql,[id] ,(err, result) => {

        if (err) {
            console.error("查询出错：" + err.message);
            return;
        }

        res.json(result)
    });
})


//编写用户 works 接口
app.get('/work3', (err, res) => {
    const username = err.query.teacher; // 获取查询参数
      console.log(username); // 输出: 123
    const sql = "SELECT * FROM work where teacher = ?"
    connection.query(sql,[username],(err, result) => {

        if (err) {
            console.error("work3查询出错：" + err.message);
            return;
        }

        res.json(result)
    });
})

//编写search work4 接口
app.get('/work4', (err, res) => {
    const search = err.query.search; // 获取查询参数
  console.log(search); // 输出: 123
        // const sql = "SELECT * FROM activity "
    const sql = "SELECT * from work where name=?"
    connection.query(sql,[search],(err, result) => {

        if (err) {
            console.error("search work4查询出错:" + err.message);
            return;
        }

        res.json(result)
    });
})




//编写work username接口
app.get('/work2', (err, res) => {
    const userName = err.query.user_name; // 获取查询参数
    const type = err.query.type; // 获取查询参数
  console.log(userName);
  console.log(type)
    const sql = "SELECT * FROM work where `user_name` = ? and type = ?"
    connection.query(sql,[userName,type] ,(err, result) => {

        if (err) {
            console.error("查询出错：" + err.message);
            return;
        }

        res.json(result)
    });
})




//编写 管理员all achievement 接口
app.get('/allachievement', (err, res) => {
    const sql = "SELECT * FROM achievement"
    connection.query(sql,(err, result) => {

        if (err) {
            console.error("all achievement 查询出错：" + err.message);
            return;
        }

        res.json(result)
    });
})




//编写achievement接口
app.get('/achievement', (err, res) => {
    const userName = err.query.user_name; // 获取查询参数
//   console.log(userName); // 输出: 123
    const sql = "SELECT * FROM achievement where `user_name` = ?"
    connection.query(sql,[userName] ,(err, result) => {

        if (err) {
            console.error("查询出错：" + err.message);
            return;
        }

        res.json(result)
    });
})


//编写search achievements 接口
app.get('/achievement2', (err, res) => {
    const search = err.query.search; // 获取查询参数
  console.log(search); // 输出: 123
        // const sql = "SELECT * FROM activity "
    const sql = "SELECT * from achievement where user_name=?"
    connection.query(sql,[search],(err, result) => {

        if (err) {
            console.error("search achievement2 查询出错:" + err.message);
            return;
        }

        res.json(result)
    });
})


//编写 achievements teacher接口
app.get('/achievements', (err, res) => {
    const teacher = err.query.teacher; // 获取查询参数
//   console.log(teacher); // 输出: 123
    const sql = "SELECT * FROM achievement where `teacher` = ?"
    connection.query(sql,[teacher] ,(err, result) => {

        if (err) {
            console.error("achievements查询出错：" + err.message);
            return;
        }

        res.json(result)
    });
})


//编写添加 achievements 接口
app.get('/addachievement', (err, res) => {
    const data = err.body;
  // 处理data
    const querystring = require('querystring');
    // console.log(querystring)
    const queryObject = querystring.parse(err.url.split('?')[1]);
    console.log(queryObject)
    const teacher = queryObject['teacher'];
    const name = queryObject['name'];
    const user_name = queryObject['user_name'];
    const title = queryObject['title'];
    const a = queryObject['a'];
    const b = queryObject['b'];
    const c = queryObject['c'];
    const abc =  parseFloat((parseInt(a)+parseInt(b)+parseInt(c))/3).toFixed(2)
    const d = queryObject['d'];
    const e = queryObject['e'];
    const f = queryObject['f'];
    const def =parseFloat((parseInt(d)+parseInt(e)+parseInt(f))/3).toFixed(2)
    const abcdef = (parseInt(a)+parseInt(b)+parseInt(c)+(parseInt(d)+parseInt(e)+parseInt(f)))
        // const sql = "SELECT * FROM tea_activities"
     const sql = 'INSERT INTO achievement (teacher,name,user_name,`title`,a,b,c,abc,d,e,f,def,abcdef) VALUES(\''+teacher+'\',\''+name+'\',\''+user_name+'\',\''+title+'\',\''+a+'\',\''+b+'\',\''+c+'\',\''+abc+'\',\''+d+'\',\''+e+'\',\''+f+'\',\''+def+'\',\''+abcdef+'\')';
     connection.query(sql, (err, result) => {
         if (err) {
             console.error("achievement添加出错:" + err.message);
             return;
         } 
         res.json(result)
     });
 })


 //编写修改 achievement 接口
 app.get('/eduitachievement/:id', (err, res) => {
    const { id } = err.params;
    console.log('接收到的ID是:', id); 
    const querystring = require('querystring');
    const queryObject = querystring.parse(err.url.split('?')[1]);
    console.log(queryObject)
    const title = queryObject['title'];
    const a = queryObject['a'];
    const b = queryObject['b'];
    const c = queryObject['c'];
    const abc =   parseFloat((parseInt(a)+parseInt(b)+parseInt(c))/3).toFixed(2)
    const d = queryObject['d'];
    const e = queryObject['e'];
    const f = queryObject['f'];
    const def =  parseFloat((parseInt(d)+parseInt(e)+parseInt(f))/3).toFixed(2)
    const abcdef = (parseInt(a)+parseInt(b)+parseInt(c)+(parseInt(d)+parseInt(e)+parseInt(f)))
    console.log(abc)
    const sql = "update achievement set title=?,a=?,b=? ,c=?,abc=?,d=?,e=?,f=?,def=?,abcdef=? where `id` = ?"
    //    const sql = "SELECT * FROM achievement where `id` = ?"
    connection.query(sql,[title,a,b,c,abc,d,e,f,def,abcdef,id] ,(err, result) => {
        if (err) {
            console.error("achievement 修改出错：" + err.message);
            return;
        }
        res.json(result)
    });
})


//编写删除 achievement 接口
app.get('/delachievement/:id', (err, res) => {
    const { id } = err.params;
    console.log('接收到的ID是:', id);    
        //    const sql = "SELECT * FROM achievement where `id` = ?"
       const sql = "DELETE FROM achievement WHERE id=?"
    connection.query(sql,[id] ,(err, result) => {

        if (err) {
            console.error("achievement 删除出错：" + err.message);
            return;
        }

        res.json(result)
    });
})




//编写notice接口
app.get('/notice', (err, res) => {

    const sql = "SELECT * FROM notice"
    connection.query(sql,(err, result) => {

        if (err) {
            console.error("查询出错：" + err.message);
            return;
        }

        res.json(result)
    });
})


//编写search plan 接口
app.get('/notice2', (err, res) => {
    const search = err.query.search; // 获取查询参数
  console.log(search); // 输出: 123
        // const sql = "SELECT * FROM activity "
    const sql = "SELECT * from notice where title=?"
    connection.query(sql,[search],(err, result) => {

        if (err) {
            console.error("search notice2查询出错:" + err.message);
            return;
        }

        res.json(result)
    });
})


// connection.query("select * from users", (err, result) => {

//     if (err) {
//         console.error("查询出错：" + err.message);
//         return;
//     }
//     console.log(result);
// });


//编写用户API接口
app.get('/users', (err, res) => {
    const userName = err.query.user_name; // 获取查询参数
//   console.log(userName); // 输出: 123
    const sql = "SELECT * FROM users where `user_name` = ?"
    connection.query(sql,[userName] ,(err, result) => {

        if (err) {
            console.error("users查询出错：" + err.message);
            return;
        }

        res.json(result)
    });
})

//编写用户API接口
app.get('/users2/:id', (err, res) => {
    const { id } = err.params;
    console.log('接收到的ID是:', id); 
    const querystring = require('querystring');
    console.log(querystring)
    const queryObject = querystring.parse(err.url.split('?')[1]);
    console.log(queryObject)
    const user_name = queryObject['user_name'];
    const pass_word = queryObject['pass_word'];
    const name = queryObject['name'];
    const year = queryObject['year'];
    const clas = queryObject['clas'];
    const sex = queryObject['sex'];
    const age = queryObject['age'];
    const tel = queryObject['tel'];
    const teacher = queryObject['teacher'];
    const limit = queryObject['limit'];
    const sql = "update users set user_name=?,pass_word=?,name=?,age=?,sex=?,tel=?,teacher=?,`limit`=?,year=?,clas=? where `id` = ?"
    //    const sql = "SELECT * FROM users where `id` = ?"
    connection.query(sql,[user_name,pass_word,name,age,sex,tel,teacher,limit,year,clas,id] ,(err, result) => {
        if (err) {
            console.error("修改出错：" + err.message);
            return;
        }
        res.json(result)
    });
})

//编写删除user学生接口
app.get('/deluser/:id', (err, res) => {
    const { id } = err.params;
    console.log('接收到的ID是:', id);    
    // const sql = "update users set user_name=?,pass_word=?,name=?,age=?,sex=?,tel=?,teacher=?,`limit`=?,year=?,clas=? where `id` = ?"
       const sql = "DELETE FROM users WHERE id=?"
    connection.query(sql,[id] ,(err, result) => {

        if (err) {
            console.error("删除出错：" + err.message);
            return;
        }

        res.json(result)
    });
})


//编写添加学生接口
app.get('/adduser', (err, res) => {
       
    const http = require('http');
    const querystring = require('querystring');
    console.log(querystring)
    const queryObject = querystring.parse(err.url.split('?')[1]);
    console.log(queryObject)
    const user_name = queryObject['user_name'];
    const pass_word = queryObject['pass_word'];
    const name = queryObject['name'];
    const year = queryObject['year'];
    const clas = queryObject['clas'];
    const sex = queryObject['sex'];
    const age = queryObject['age'];
    const tel = queryObject['tel'];
    const teacher = queryObject['teacher'];
    const limit = queryObject['limit'];
    const state = queryObject['state'];
    
    const sql = "insert into  users(user_name,pass_word,name,age,sex,tel,teacher,`limit`,year,clas,`state`) values(?,?,?,?,?,?,?,?,?,?,?)"
    //    const sql = "SELECT * FROM users where `id` = ?"
    connection.query(sql,[user_name,pass_word,name,age,sex,tel,teacher,limit,year,clas,state] ,(err, result) => {

        if (err) {
            console.error("添加出错：" + err.message);
            return;
        }

        res.json(result)
    });
})


//编写用户API接口
app.get('/users3', (err, res) => {
    const state = err.query.state; // 获取查询参数
//   console.log(userName); // 输出: 123
    const sql = "SELECT * from users where `state` = ?"
    connection.query(sql,[state] ,(err, result) => {

        if (err) {
            console.error("user3查询出错：" + err.message);
            return;
        }

        res.json(result)
    });
})

//编写用户API接口
app.get('/users33', (err, res) => {
    const state = err.query.state; // 获取查询参数
  console.log(state); // 输出: 123
  const teacher = err.query.teacher; // 获取查询参数
  console.log(teacher); // 输出: 123
    const sql = "SELECT * from users where `state` = ? and teacher=?"
    connection.query(sql,[state,teacher] ,(err, result) => {

        if (err) {
            console.error("user33查询出错：" + err.message);
            return;
        }

        res.json(result)
    });
})


//编写用户API接口
app.get('/users4', (err, res) => {
    const search = err.query.search; // 获取查询参数
  console.log(search); // 输出: 123
    const sql = "SELECT * from users where user_name=? or name=?"
    connection.query(sql,[search,search],(err, result) => {

        if (err) {
            console.error("user4查询出错:" + err.message);
            return;
        }

        res.json(result)
    });
})

//编写添加用户接口
app.post('/adduser', (err, res) => {
    const data = err.body;
  // 处理data
    console.log(data);
    console.log(data['user_name'])
    const user_name =data['user_name'];
    const pass_word =data['pass_word'];
    const state =data['state'];
    const limit =data['limit'];
     const sql = 'INSERT INTO users (user_name,pass_word,state,`limit`) VALUES(\''+user_name+'\',\''+pass_word+'\',\''+state+'\',\''+limit+'\')';
     connection.query(sql, (err, result) => {
        
         if (err) {
             console.error("添加出错：" + err.message);
             return;
         }
         
         res.json(result)
     });
 })

app.listen(8082, () => {
    console.log("Server running at http://127.0.0.1:8082")
})

const express=require("express")
const app=express()
const PORT=process.env.PORT || 8080
const fs=require("fs")
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
const path=require("path")
const uniqid=require("uniqid")
app.get("/notes",(req,res)=>{
res.sendFile(path.join(__dirname,"/public/notes.html"))
})

app.get("/api/notes",(req,res)=>{
    fs.readFile("db/db.json","utf8",(err,data)=>{
        res.json(JSON.parse(data))
    })
    })


    app.post("/api/notes",(req,res)=>{
        fs.readFile("db/db.json","utf8",(err,data)=>{
            var currentdata=JSON.parse(data)
            req.body.id=uniqid()
            currentdata.push(req.body)
            fs.writeFile("db/db.json",JSON.stringify(currentdata),(error)=>{
                res.json(req.body)   
            })
           

        })
        })

        app.delete("/api/notes/:id",(req,res)=>{
            fs.readFile("db/db.json","utf8",(err,data)=>{
                var currentdata=JSON.parse(data)
               currentdata=currentdata.filter(note=>{
                   return note.id != req.params.id
               })
            fs.writeFile("db/db.json",JSON.stringify(currentdata),(error)=>{
                    res.json(req.body)   
                })
               
    
            })
            })       

app.listen(PORT,function() {
  console.log("app on PORT 8080")  
})
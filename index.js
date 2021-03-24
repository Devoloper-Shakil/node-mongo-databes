const express = require('express')
// const bodyParser = require('body-parser')
const app = express()

const MongoClient = require('mongodb').MongoClient; 
 const password ="ZdZM4mkzcqv5GpF";

 

 const uri = "mongodb+srv://shakil:ZdZM4mkzcqv5GpF@cluster0.xcxqb.mongodb.net/shakil?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get('/', (req, res)=> {
  res.sendFile(__dirname + '/index.html') 
})




client.connect(err => {
  const collection = client.db("shakil").collection("product");
  app.post ("/product", (req,res)=>{
      const product=(req.body);
        collection.insertOne(product )
        .then (resulet=>{
            console.log("product ad ad ad ad ");
            res.send("succseful add your product");
        })
  }) 
  

});


app.listen(3000)

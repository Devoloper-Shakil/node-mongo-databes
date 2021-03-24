const express = require('express')
// const bodyParser = require('body-parser')
const app = express()

const MongoClient = require('mongodb').MongoClient; 
const ObjectId=require('mongodb').ObjectId;
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

 app.get("/products" ,(req, res)=>{
   collection.find({})
   .toArray((err,document)=>{
      res.send(document);
   })
 })


  app.post ("/product", (req,res)=>{
      const product=(req.body);
        collection.insertOne(product )
        .then (resulet=>{
            // console.log("product ad ad ad ad ");
            res.redirect('/')
            // res.send("succseful add your product");
        })
  })
  
  app.get('/produc/:id',(req,res)=>{
    collection.find({_id:ObjectId (req.params.id)})
    .toArray((err,document)=>{
     res.send(document[0]);
    })
  })

  app.patch('/update/:id', (req,res)=>{
    collection.updateOne({_id:ObjectId (req.params.id)},
    {
      $set:{price:req.body.price , quantritry:req.body.quantritry}
    })
    .then(result=>{
      res.send(result.modifiedCount>0);
    //  console.log(result)
      
    })
  })

  app.delete("/delete/:id", (req , res)=>{
    collection.deleteOne({_id:ObjectId (req.params.id)})
    .then(result=>{
      res.send(result.deletedCount>0);
      // console.log(result);
    })
  
  });

});



app.listen(3000)

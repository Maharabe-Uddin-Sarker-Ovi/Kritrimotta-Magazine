const express = require("express");
const cors = require("cors");
const app = express();
require('dotenv').config();
var jwt = require('jsonwebtoken');
var cookieParser = require('cookie-parser');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const port = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: ["http://localhost:5173"],
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

const uri = process.env.DB_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db; 
const verified = async (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) {
    return res.status(401).send({ message: 'Unauthorized access: no token' });
  }
  jwt.verify(token, process.env.SECRET_TOKEN, (error, decode) => {
    if (error) {
      return res.status(401).send({ message: 'Unauthorized access: invalid token' });
    }
    req.user = decode;
    next();
  });
};

async function run() {
  try {
   
    await client.connect();
    console.log("Connected to MongoDB!");

    db = client.db("magazine");
    const users = db.collection("users");
    const magazine = db.collection("post");
    const blogs = db.collection("blog");
    const bookings = db.collection("checkout");

    app.post("/api/user/access-token",async(req,res)=>{
        const user=req.body
        console.log(user)
        const token=jwt.sign(user, process.env.SECRET_TOKEN , { expiresIn: '96h' })
        res.cookie("token",token,{
            httpOnly:true,
            secure:true,
            sameSite:"none",
        }).send({"Success":true})
  })

  // user cretation 
  app.put("/api/user/create-user/:email",async(req,res)=>{
      const email = req.params.email
      const user = req.body
      const query = { email: email }
      const options = { upsert: true }
      const isExist = await users.findOne(query)
      if (isExist) return res.send(isExist)
        
      const result = await users.updateOne(
        query,
        {
          $set: { ...user, timestamp: Date.now() },
        },
        options
      )
      res.send(result)
  });

  //view user
  app.get("/api/users",async(req,res)=>{
    const result=await users.find().toArray();
    res.send(result)
  })

  //view user email based
  app.get("/api/users/:email",async(req,res)=>{
    const email=req.params.email 
    const query={email:email}
    const result=await users.findOne(query)
    res.send(result)
  })
  //roled user
  app.patch("/api/user/status/:id",verified,async(req,res)=>{
    const id=req.params.id;
    const role=req.body.role;
    const query={_id : new ObjectId(id)}
    const options = { upsert: true };

    const updateDoc = {
      $set: {
        role:role
      },
    };
    const result = await users.updateOne(query, updateDoc, options);
    res.send(result);
  })

  app.delete("/api/user/cancel-users/:id",async(req,res)=>{
        const id=req.params.id 
        const query={_id:new ObjectId(id)}
        const result=await users.deleteOne(query)
        res.send(result)
    })



  //Data inserted of new magazine
  app.post("/api/admin/create-magazine",async(req,res)=>{
      const Magazine=req.body 
      const result=await magazine.insertOne(Magazine)
      res.send(result)

    })



    // user/services/?sortField=details.pricing&sortOrder=asc&category=Home

    app.get("/api/user/magazines",async(req,res)=>{
        const queryCategory=req.query?.category 
        const sortField=req.query?.sortField
        const sortOrder=req.query?.sortOrder

        //limit to show the data
        const page=Number(req.query?.page);
        const limit=Number(req.query?.limit);

        const skip=(page-1)*limit 
        

        let catQuery={}
        let sortObj={}

        if(queryCategory){
            catQuery.category=queryCategory
        }
        if(sortField && sortOrder){
            sortObj[sortField]=sortOrder
        }
        

        const result=await magazine.find(catQuery).skip(skip).limit(limit).sort(sortObj).toArray()
        const total=await magazine.countDocuments()
        res.send({total,result})
    })

    app.get("/api/user/magazine/:id",async(req,res)=>{
        const id=req.params.id 
        const query={_id:new ObjectId(id)}
        const result=await magazine.findOne(query)
        res.send(result)
    })

    app.delete("/api/user/cancel-magazine/:id",async(req,res)=>{
        const id=req.params.id 
        const query={_id:new ObjectId(id)}
        const result=await magazine.deleteOne(query)
        res.send(result)
    })




    
    // Booking Related API
    app.post("/api/user/create-booking",async(req,res)=>{
        const booking=req.body
        
        const result=await bookings.insertOne(booking)
        res.send(result)

    })



    app.delete("/api/user/cancel-booking/:id",async(req,res)=>{
        const id=req.params.id 
        const query={_id:new ObjectId(id)}
        const result=await bookings.deleteOne(query)
        res.send(result)
    })

    app.get("/api/user/bookings",verified,async(req,res)=>{
      const queryEmail=req.query?.email
      const tokenEmail=req.user?.email
      if(queryEmail){
        if(queryEmail!==tokenEmail){
        return res.status(403).send({"message":"Forbidden acccess"})
      }
      }
      

      let query={}
      if(queryEmail){
        query.email=queryEmail
        
      }

      const result=await bookings.find(query).toArray()
      res.send(result)
      

    })

    app.get("/api/user/booked",async(req,res)=>{
      const result=await bookings.find().toArray()
      res.send(result)
    })

    app.patch("/api/user/bookings/status/:id",verified,async(req,res)=>{
    const id=req.params.id;
    const status=req.body.status;
    const query={_id : new ObjectId(id)}
    const options = { upsert: true };

    const updateDoc = {
      $set: {
        status:status
      },
    };
    const result = await bookings.updateOne(query, updateDoc, options);
    res.send(result);
  })

    app.get('/', (req, res) => {
      res.send('Let\'s read the world!');
    });

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });

  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}

// Start the server and keep the client connection open
run().catch(console.dir);

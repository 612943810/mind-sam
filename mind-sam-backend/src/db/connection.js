let mongoose=require('mongoose');
mongoose.connect("mongodb+srv://personal:<password>@personal.yhrxz.mongodb.net/?retryWrites=true&w=majority",
{useNewUrlParser:true,
useUnifiedTopology:true
})
.then(()=>{
    console.log("Connection sucess")
});
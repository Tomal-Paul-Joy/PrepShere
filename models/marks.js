const mongoose = require("mongoose");

const marksSchema = mongoose.Schema({
   qn1: { 
      type: String, 
      required: true,
   },
   qn2: { 
      type: String, 
      required: true,
   }, 
   qn3: { 
      type: String, 
      required: true,
   },
   qn4: { 
      type: String, 
      required: true,
   },
   qn5: { 
      type: String, 
      required: true,
   },
   qn6: { 
      type: String, 
      required: true,
   },
   qn7: { 
      type: String, 
      required: true,
   },
   qn8: { 
      type: String, 
      required: true,
   }
});

module.exports = mongoose.model("marks", marksSchema);

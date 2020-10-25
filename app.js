//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const intro = "Hello, I am Riya.";
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect('mongodb://localhost:27017/cvDB', {useNewUrlParser: true, useUnifiedTopology: true});

const dataTableSchema = {
  field: String,
  cofields: [{name: String,
              place: String,
              year: String,
              description:String
                    }]
};

const defaultcofields= [{name: "",
              place: "",
              year: "",
              description: ""
                    }];

const DataTable = mongoose.model("DataTable",dataTableSchema );

const Edu = new DataTable({
  field: "EDU",
  cofields: [{name: "B.Sc.(H) Computer Science",
              place: "University of Delhi",
              year: "2017-2020",
              description: "Coursework: Internet Technologies, Database Management System, Software Engineering, Operating System, Computer Networks, Data Mining, Data Science, Data Structure"
            },
            { name: "Intermediate",
              place: "CBSE Board, D.A.V Public School",
              year: "2016",
              description: "Non Medical Stream. Subjects: Physics, Chemistry, Mathematics, English, Physical Education"
            },
            { name: "High School",
              place: "CBSE Board, D.A.V Public School",
              year: "2014"
            }
      ]
});

const Intern = new DataTable({
  field: "INTERN",
  cofields: [{name: "IT Intern",
              place: "ITISARAS: Non-Profit Organisation",
              year: "Currently Working",
              description: "Work included managing wordpress websites and making customization in the design of the theme."
            },
            { name: "Content Developer",
              place: "Intellify, IIT Delhi",
              year: "Jan 2020",
              description: "Created video content for unpriveledged students of class 11th and 12th of Mathematics subject."
            },
            { name: "Podcast Anchor",
              place: "Development Channel",
              year: "Sept-Nov 2019",
              description: "Made news podcasts and contributed in audience outreach programme."
            },
            { name: "Fellowship",
              place: "YES Foundation",
              year: "May-July 2018",
              description: "Worked in Young Women’s Christian Association (NGO) as a Media for Social Change fellow of YES Bank Foundation. Created content and designed a Coffee Table Book for the NGO to be used as a pitch kit"
            }
      ]
});

const Roles = new DataTable({
  field: "ROLES",
  cofields: [{name: "General Facilities In-charge",
              place: "Indraprastha College for Women",
              year: "Current Position",
              description:""
            },
            { name: "Treasurer",
              place: "National Service Scheme",
              year: "2019-2020",
              description:""
            },
            { name: "Technical Team Member",
              place: "Placement Cell",
              year: "2017-2019",
              description:""
            }
      ]
});
const Awards = new DataTable({
  field: "AWARDS",
  cofields: [{name: "Case Study Competion",
              place: "First Position",
              year: "2018",
              description:"Organized by Shri Ram College of Commerce in NSS Annual Festival. Participated as a team of 3 members and won cashprize of worth Rs. 8000."
            },
            { name: "Poster Paper Presentation",
              place: "First Position",
              year: "2020",
              description:"Organized by Departement of Computer Scienece of Indraprastha College of Women."
            }

      ]
});
const Proj = new DataTable({
  field: "PROJ",
  cofields: [{name: "La-Cantine",
              place: "Software Engineering Project",
              year: "2019",
              description:"A canteen management application."
            },
            { name: "IT",
              place: "Itisaras",
              year: "2020",
              description:""
            },
            { name: "Content Video",
              place: "IIT Delhi",
              year: "Jan",
              description:""
            }
      ]
});

const defaultItems = [Edu, Intern, Roles, Awards];

DataTable.insertMany(defaultItems, function(err){
if(err){
  console.log(err);
  }
  else{
    console.log("Succesfully Inserted Dafault Items.");
  }
});

app.get("/", function(req, res){
  res.render("index", {
    content: intro
  });
});

app.get("/commandprompt", function(req, res){
   res.render("command", {title: "", cofield :defaultcofields });
});

app.get("/instructions", function(req, res){
   res.render("instruction");
});

app.post("/commandprompt", function(req,res){

  const requestedField= req.body.requestedCommand;
  console.log(requestedField);
  DataTable.findOne({field:requestedField },{"_id":1}, function(err,itemid){
    if(err){
      console.log("Could not find id");
      res.render("error");
    }
    else{
      console.log(itemid);
    }
  });

  DataTable.findOne({field:requestedField },function(err, foundedItems){
    if(!err){
        if(!foundedItems){
        console.log("No error, but items are not found.");
        res.render("error");
      }

      else{
         res.render("command", {title: foundedItems.field, cofield: foundedItems.cofields});
      }
    }
  });
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});

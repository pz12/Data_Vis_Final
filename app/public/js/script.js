
let datamodel; //Global variable that any class can access
// let CofDeath = new CausesOfDeath();
// let weekdays = new DaysOfWeek();
// let USMap = new USmap();
let CofDeath;
let weekdays;
let USMap;
let race;
let gender;

d3.json("data/ProjectData.json", (d)=>{
  // console.log(d)



   datamodel = new DataModel(d);
   CofDeath = new CausesOfDeath();
   weekdays = new DaysOfWeek();
   USMap = new USmap();
   race = new Race();
   gender = new Gender();
   var initial_year = '1999';
   weekdays.update(initial_year, "all");
   USMap.update(initial_year);
   race.update(initial_year, "all");
   gender.update(initial_year, "all");
   CofDeath.update(initial_year);
    // beginTest()
});

function changeYear(year) {
  weekdays.update(year, "all");
  USMap.update(year);
  race.update(year, "all");
  gender.update(year, "all");
  CofDeath.update(year);
}

function update(year) {
  weekdays.update(year, "all");
  USMap.update(year);
  race.update(year, "all");
  gender.update(year, "all");
  CofDeath.update(year);
}

// https://stackoverflow.com/questions/34934577/html-range-slider-with-play-pause-loop
var myTimer;

function play() {
  clearInterval (myTimer);
  myTimer = setInterval (function() {
       var b= d3.select("#rangeSlider");
       var t = (+b.property("value") + 1) % (+b.property("max") + 1);
       if (t == 0) { t = +b.property("min"); }
       b.property("value", t);
       update(t);
     }, 1000);
}

function pause() {
  clearInterval (myTimer);
}


// d3.csv("data/Cause_of_Death_2000.csv", function(error, codData){
//     //CofDeath.update(codData);
// });

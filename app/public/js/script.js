
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
    // beginTest()
});

function changeYear(year) {
  console.log(year)
  weekdays.update(year, state);
  USMap.update(year);
  race.update(year);
  gender.update(year);
}
d3.csv("data/Cause_of_Death_2000.csv", function(error, codData){
    //CofDeath.update(codData);
});

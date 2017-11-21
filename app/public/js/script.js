
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
   weekdays.update(initial_year);
   USMap.update(initial_year);
   race.update(initial_year);
   gender.update(initial_year);
    // beginTest()
});

function changeYear(year) {
  console.log(year)
  weekdays.update(year);
  USMap.update(year);
  race.update(initial_year);
  gender.update(initial_year);
}
d3.csv("data/Cause_of_Death_2000.csv", function(error, codData){
    //CofDeath.update(codData);
});






function beginTest(){
  console.log('yes')

    const items = this.model.getData("DayOfTheWeek", "all", 2001);

    for (let item of items){
        console.log(JSON.stringify(item, null, 2))
    }
    //console.log(JSON.stringify(DataModel.CategorizeItems(items), null, 2))
}



function loadPage(){

  //Read in cause of death data
  d3.csv("data/Cause_of_Death_2000.csv", function(error, codData){

    //Cause of death
      let CofDeath = new CausesOfDeath();
      CofDeath.update(codData);
  });

//Map visualization
  viz();


}

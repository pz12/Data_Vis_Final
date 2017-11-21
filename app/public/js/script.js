
let datamodel; //Global variable that any class can access


d3.json("data/ProjectData.json", (d)=>{
  // console.log(d)
  let CofDeath = new CausesOfDeath();
  let weekdays = new DaysOfWeek();
  let USMap = new USmap();
   datamodel = new DataModel(d);
   weekdays.update('1999');
   USMap.update('1999');

    // beginTest()
});

function changeYear(year) {
  
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

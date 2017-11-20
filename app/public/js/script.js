
let CofDeath = new CausesOfDeath();
let USMap = new USmap();
let datamodel;

d3.json("data/ProjectData.json", (d)=>{
  // console.log(d)
   datamodel = new DataModel(d);
   USMap.update('1999')

    // beginTest()
});
d3.csv("data/Cause_of_Death_2000.csv", function(error, codData){


    CofDeath.update(codData);
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

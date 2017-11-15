

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

/**
 * Created by maxtaggart on 11/10/17.
 */

d3.json("/app/data/ProjectData.json", (d)=>{
   this.model = new DataModel(d);
    beginTest()
});

function beginTest(){
    const items = this.model.getData("DayOfTheWeek", "Maine", 2001);
    for (let item of items){
        console.log(JSON.stringify(item, null, 2))
    }
    //console.log(JSON.stringify(DataModel.CategorizeItems(items), null, 2))
}

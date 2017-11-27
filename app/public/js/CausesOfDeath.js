/**
*Created by: Jean Fredo Louis
* Display the causes of death using the ICD Codes and the display text of those ICDs
*
*/


class CausesOfDeath {

    //Initializes the svg elements required for this chart;

     constructor(){

         this.margin = {top: 30, right: 20, bottom: 30, left: 50};
         this.svgWidth = 600;
         this.svgHeight = 400;

         let divCausesChart = d3.select("#topTen");
         this.svg = divCausesChart.append("svg")
         	        .attr("width",this.svgWidth)
         	        .attr("height",this.svgHeight)
     }


update(year){
  let codData = datamodel.getData("CauseOfDeath", "all",year)

      let codDataSrt = codData.sort(function (a, b) {
        return b.Num_Deaths - a.Num_Deaths;
      });

      // let totDeath = this.codDate.map(d=>{return d.Num_Deaths})
      let xScale = d3.scaleLinear()
                      .domain([0, d3.max(codData, d => parseInt(d.Num_Deaths))])
                      .range([0, this.svgWidth]);
      //
      //         // Create colorScale
              let colorScale = d3.scaleLinear()
                      .domain([0, d3.max(codData, d => parseInt(d.Num_Deaths))])
                      .range(["grey", "red"]);

      // Define the div for the tooltip
      let div = d3.select("#topTen").append("div")
          .attr("class", "tooltip")
          .style("opacity", 0);


      let causesRect = this.svg
                      .selectAll('rect')
                      .data(codDataSrt);
        let causesRect_new = causesRect.enter().append('rect');
        causesRect.exit().remove();
        causesRect = causesRect_new.merge(causesRect);

        causesRect.on("mouseover", function(d) {
            div.transition()
                .duration(200)
                .style("opacity", .9);
            // div.html(d.Cause_of_Death + "<br/>" + "(" + d.Num_Deaths + ")")
            div.html(d.Num_Deaths + " - " + d.Cause_of_Death)
                .style("left", (d3.event.pageX-30) + "px")
                .style("top", (d3.event.pageY) + "px");
                })
                .on("mouseout", function(d) {
                    div.transition()
                        .duration(500)
                        .style("opacity", 0);
                })
                  .attr('x', 0)
                  .attr('y', function(d,i) {
                          return (i*25);
                  })
                  .attr('width', d => {
                    let NumDeaths = parseInt(d.Num_Deaths);
                    return xScale(NumDeaths);
                  })
                  .attr('height', 20)
                  .attr('fill', function (d) {
                    return colorScale(d.Num_Deaths);
                  })

      };

}

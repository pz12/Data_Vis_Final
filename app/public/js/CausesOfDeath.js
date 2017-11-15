/**
*Created by: Jean Fredo Louis
* Display the causes of death using the ICD Codes and the display text of those ICDs
*
*/


class CausesOfDeath {

    //Initializes the svg elements required for this chart;

     constructor(codData){

         this.codData = codData;

         this.margin = {top: 30, right: 20, bottom: 30, left: 50};
         this.svgWidth = 600;
         this.svgHeight = 400;

         let divCausesChart = d3.select("#topTen");
         this.svg = divCausesChart.append("svg")
         	        .attr("width",this.svgWidth)
         	        .attr("height",this.svgHeight)
     }


update(codData){

      //let NumDeaths = parseInt(codData.Num_Deaths);

      let codDataSrt = codData.sort(function (a, b) {
        return b.Num_Deaths - a.Num_Deaths;
      });

      // let totDeath = this.codDate.map(d=>{return d.Num_Deaths})
      let xScale = d3.scaleLinear()
                      .domain([0, d3.max(codData, d => d.Num_Deaths)])
                      .range([0, this.svgWidth]);
      //
      //         // Create colorScale
              let colorScale = d3.scaleLinear()
                      .domain([0, d3.max(codData, d => d.Num_Deaths)])
                      .range(["green", "orange"]);


      let causesRect = this.svg
                      .selectAll('rect')
                      .data(codDataSrt);
        let causesRect_new = causesRect.enter().append('rect');
        causesRect.exit().remove();
        causesRect = causesRect_new.merge(causesRect);

        causesRect.transition()
                  .duration(1000)
                  .attr('x', 0)
                  .attr('y', function(d,i) {
                          return (i*25);
                  })
                  .attr('width', d => {
                    //console.log(parseInt(d.Num_Deaths))
                    console.log(d);
                    console.log(typeof(d.Num_Deaths))
                    return xScale(parseInt(d.Num_Deaths));
                  })
                  .attr('height', 20)
                  .attr('fill', function (d) {
                    return colorScale(d.Num_Deaths);
                  })

      };





}

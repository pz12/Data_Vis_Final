
class Race {

  constructor() {

    this.margin = {top: 30, right: 20, bottom: 30, left: 50};
    this.svgWidth = 200;
    this.svgHeight = 300;

    let divRaceChart = d3.select("#ethnicity");
    this.svg = divRaceChart.append("svg")
                           .attr("width",this.svgWidth)
                           .attr("height",this.svgHeight);
  }

  update(year, state) {
    let raceData = datamodel.getData("Race", state, year);

    console.log(raceData);

    //x.domain(raceData.map(function(d) { return d.Race; }));
    //y.domain([0, d3.max(raceData, function(d) { return d.frequency; })]);

    let yScale = d3.scaleLinear()
                    .domain([0, d3.max(raceData, d => d.Deaths)])
                    .range([0, this.svgHeight]);

           // Create colorScale
            let colorScale = d3.scaleOrdinal()
                    .domain([0, d3.max(raceData, d => d.Race)])
                    .range(["#ff8000", "#0080ff", "#8000ff", "#ff0040"]);

    // Define the div for the tooltip
     let div = d3.select("#ethnicity").append("div")
         .attr("class", "tooltip")
         .style("opacity", 0);


    let raceRect = this.svg
                    .selectAll('rect')
                    .data(raceData);
      let raceRect_new = raceRect.enter().append('rect');
      raceRect.exit().remove();
      raceRect = raceRect_new.merge(raceRect);
        raceRect.transition()
                .duration(3000)
                .attr('y', 0)
                .attr('x', function(d,i) {
                        return (i*35);
                })
                .attr('width', 30)
                .attr('height', d => {
                  return yScale(d.Deaths);
                })
                .attr('fill', function (d) {
                  return colorScale(d.Race);
                });

        raceRect.on("mouseover", function(d) {
            div.transition()
                .duration(200)
                .style("opacity", .9);
            // div.html(d.Cause_of_Death + "<br/>" + "(" + d.Num_Deaths + ")")
            div.html(d.Race + " - " + d.Deaths)
                .style("left", (d3.event.pageX-30) + "px")
                .style("top", (d3.event.pageY) + "px");
                })
                .on("mouseout", function(d) {
                    div.transition()
                        .duration(500)
                        .style("opacity", 0);
                })


  }

}

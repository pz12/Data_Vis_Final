
class Race {

  constructor() {

    this.margin = {top: 30, right: 20, bottom: 30, left: 50};
    this.svgWidth = 200;
    this.svgHeight = 300;

    let divRaceChart = d3.select("#ethnicity")

    this.svg = divRaceChart.append("svg")
                           .attr("width",this.svgWidth)
                           .attr("height",this.svgHeight);
  }


  tooltip_render(tooltip_data) {
      let text = "<h2 class ='yes' >" + tooltip_data.race + "</h2>";
      text +=  "<div>Deaths: " + tooltip_data.deaths+"</div>";
      text += "<div>Rate per 100,000: " + tooltip_data.rate+"</div>";


      return text;
  }

  update(year, state) {
    let raceData = datamodel.getData("Race", state, year);

    console.log(raceData);


    let tip = d3.tip().attr('class', 'd3-tip')
    // .attr("transform","translate(0,0) scale(-1,-1)" )
        .direction('ne')
        .offset(function() {
            return [370,200];
        })
        .html((d)=>{
            // populate data in the following format
            let tooltip_data = {
                "race": d.Race,
                "deaths":d.Deaths,
                "rate" : d['Crude Rate']
              }

             // pass this as an argument to the tooltip_render function then,
             // return the HTML content returned from that method.

            return this.tooltip_render(tooltip_data);
        });
        this.svg.call(tip)

    //x.domain(raceData.map(function(d) { return d.Race; }));
    //y.domain([0, d3.max(raceData, function(d) { return d.frequency; })]);

    let yScale = d3.scaleLinear()
                    .domain([0, d3.max(raceData, d => parseInt(d.Deaths))])
                    .range([this.margin.top, this.svgHeight]);

           // Create colorScale
            let colorScale = d3.scaleOrdinal()
                    .domain([0, d3.max(raceData, d => d.Race)])
                    .range([ "#41b6c4", "#238443", "#fc8d59", "#c2e699"]);

    // Define the div for the tooltip
     let div = d3.select("#ethnicity").append("div")
         .attr("class", "tooltip")
         .style("opacity", 0);


    let raceRect = this.svg
                    .attr("transform","translate(0,0) scale(-1,-1)" )
                    .selectAll('rect')
                    .data(raceData);
      let raceRect_new = raceRect.enter().append('rect').on('mouseover', tip.show).on('mouseout', tip.hide);
      raceRect.exit().remove();
      raceRect = raceRect_new.merge(raceRect);
        raceRect.transition()
                .duration(500)
                .attr('y', 0)
                .attr('x', function(d,i) {
                        return (i*35);
                })
                .attr('width', 30)
                .attr('height', d => {
                  let numdeath = parseInt(d.Deaths);
                  return yScale(numdeath);
                })
                .attr('fill', function (d) {
                  return colorScale(d.Race);
                });
                // .attr("transform", "rotate(-90) translate(0,-1)");



  }

}

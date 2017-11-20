

class USmap {

  constructor() {
    this.width = 1200;
    this.height = 800;
    this.svg = d3.select('#USmap')
              .append('svg')
              .attr('width', this.width)
              .attr('height', this.height)
  }

  /**
     * Renders the HTML content for tool tip.
     *
     * @param tooltip_data information that needs to be populated in the tool tip
     * @return text HTML content for tool tip
     */
    tooltip_render(tooltip_data) {
        let text = "<h2 class ='yes' >" + tooltip_data.state + "</h2>";
        text +=  "<div>Deaths: " + tooltip_data.deaths+"</div>";
        text += "<div>Rate per 100,000: " + tooltip_data.rate+"%</div>";


        return text;
    }

update(stateResults) {

  //Use this tool tip element to handle any hover over the chart
  let tip = d3.tip().attr('class', 'd3-tip')
      .direction('se')
      .offset(function() {
          return [0,0];
      })
      .html((d)=>{
          // populate data in the following format
          let tooltip_data = {
              "state": d.State,
              "deaths":d.Deaths,
              "rate" : d['Crude Rate']
            }

           // pass this as an argument to the tooltip_render function then,
           // return the HTML content returned from that method.

          return this.tooltip_render(tooltip_data);
      });
      this.svg.call(tip)

let results;



let radiusScale = d3.scaleLinear()
                    .domain([0, d3.max(stateResults, d => d['Crude Rate'])])
                    .range([0,8]);


  this.svg.selectAll('circle')
                  .data(stateResults)
                  .enter()
                  .append('circle')
                  .attr('cx', (d) => {
                    return d.Space*50+50;
                  })
                  .attr('cy', (d) => {
                    return d.Row*40+50;
                  })
                  .attr('r', (d) => {
                    return radiusScale(d['Crude Rate']);
                  })
                  // .attr('width', (d) => {
                  //   return Math.random() * (50 - 40) + 40;
                  // })
                  // .attr('height', (d) => {
                  //   return Math.random() * (50 - 40) + 40;
                  // })
                  .attr('fill', 'red')
                  .attr('stroke', 'black')
                  .attr('class', 'tile')
                  .on('mouseover', tip.show)
                  .on('mouseout', tip.hide)



    // https://stackoverflow.com/questions/34934577/html-range-slider-with-play-pause-loop
    var myTimer;
    d3.select("#play_button").on("click", function() {
     clearInterval (myTimer);
    	myTimer = setInterval (function() {
        	var b= d3.select("#rangeSlider");
          var t = (+b.property("value") + 1) % (+b.property("max") + 1);
          if (t == 0) { t = +b.property("min"); }
          b.property("value", t);
          //update (t);
        }, 1000);
    });

    d3.select("#pause_button").on("click", function() {
    	clearInterval (myTimer);
    });

// console.log(results)
}


}

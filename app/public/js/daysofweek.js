
// WE DON"T HAVE THE DAY OF THE WEEK DATA PERFECTLY

class DaysOfWeek {

  constructor() {
    this.w = 300;
    this.h = 300;
    this.svg = d3.select('#daysOfWeek')
        .append('svg')
        .attr('width', this.w)
        .attr('height', this.h)



  }

  update(year, state) {
    let daysData = datamodel.getData("DayOfTheWeek", state, year)
    console.log(daysData)
      let radiusScale = d3.scaleLinear()
                          .domain([0, d3.max(daysData, d => d['Deaths'])])
                          .range([0,100]);

    let radius_mean = d3.mean(daysData, d => d['Deaths'])

    var line = d3.lineRadial()
      .radius(function(d, i){ return radiusScale(d.deaths) ; })
      .angle(function(d){ return d.angle * (Math.PI/180) ; })
        // .curve(d3.curveLinear);
      .curve(d3.curveCardinalClosed);
    //links to different curves available
    // https://codepen.io/alsheuski/pen/BKQmaz
    // http://bl.ocks.org/emmasaunders/c25a147970def2b02d8c7c2719dc7502

  let data = []
  let angles = [ 0, 51, 102, 153, 204, 255, 306];
  let textX = [this.w/2.3, this.w/1.33, this.w/1.25, this.w/1.54, this.w/3.33, this.w/10, this.w/8.57]
  // let textX = [this.w/2.3, 225, 240, 195, 90, 30, 35];
  let textY = [this.h/6.25, this.h/3.53, this.h/1.67, this.h/1.22, this.h/1.2, this.h/1.67, this.h/3.33]
  // let textY = [48, 85, 180, 245, 250, 180, 90]
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  this.svg.selectAll('text').remove()
  this.svg.selectAll('text')
          .data(days)
          .enter()
          .append('text')
          .text(function(d) {
            // if(d.Weekday =="Thursday") return "TH";
            // return d.Weekday.substring(0,1);
            return d.substring(0,3).toUpperCase();
          })
          .attr('x', function(d, i) {
            return textX[i];
          })
          .attr('y', function(d, i) {
            return textY[i];
          })
          .attr('class', 'DOWtext')
  daysData.forEach(function(d, i) {
    data.push({"deaths":parseInt(d.Deaths), "angle":angles[i]});
  })
  let average = this.svg.select('circle').datum(radius_mean);
  average.exit()
      .transition()
      .duration(500)
      .remove()
  // average = average.append('circle');
average = average.enter().append('circle').merge(average);
average
  .transition()
       .duration(500)
       .attr('r', () => {
        return radiusScale(radius_mean)
      })
    .attr('stroke', 'gray')
    .attr('stroke-width', 2)
    .attr('opacity', 0.8)
    .attr('fill', 'none')
    .attr('cx', (d) => {
      return this.w/2
    })
    .attr('cy', (d) => {
      return this.h/2
    })

    // let data = daysData;
    // this.svg.selectAll('path').remove()
    // var path = this.svg.append('path')
    //   .datum(data)
    //   .transition()
    //   .duration(1000)
    //   .attr('d', line)
    //   .attr('stroke', 'green')
    //   .attr('stroke-width', 3)
    //   .attr('fill', 'none')
    //   .attr('transform', 'translate(' + this.w/2 +','+ this.h/2 +')')

    let path = this.svg.selectAll('path')
                        .data([data]);

  let path_new = path.enter().append('path')
  path.exit().remove();
  path = path_new.merge(path);

  path
  .transition()
  .duration(1000)
  .attr('d', line)
      .attr('stroke', 'green')
      .attr('id','thisOne')
      .attr('stroke-width', 3)
      .attr('fill', 'none')
      .attr('transform', 'translate(' + this.w/2 +','+ this.h/2 +')')

      this.svg.append('text')
        .text('Days of the Week (Incomplete)')
        .attr('x', (d) => {
          return this.w/2 - this.w/6;
        })
        .attr('y', 12)
        .attr('class', 'DOWtext')
      this.svg.append('text')
        .text('(Total Deaths per Given Day)')
        .attr('x', (d) => {
          return this.w/2 - this.w/6+10;
        })
        .attr('y', 30)
        .attr('class', 'DOWtextsmall')

    var average_line_start = this.h/2-radiusScale(radius_mean);
    this.svg.append('path')
            .attr('d', (d) => {
              return 'M'+this.w/2+','+this.h/2+'L'+this.w/2+','+average_line_start;
            })
            .attr('stroke', 'gray')
            .attr('stroke-width', 2)
            .attr('fill', 'none')

    this.svg.append('text')
            .text((d) => {
              return Math.floor(radius_mean)
            })
            .attr('x', (d) => {
              return this.w/2 + 7;
            })
            .attr('y', (d) => {
              return this.h/2.6;
            })
            .attr('class', 'DOWtext')
  }


}

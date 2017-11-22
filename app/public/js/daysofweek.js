

class DaysOfWeek {

  constructor() {
    this.w = 300;
    this.h = 300;
    this.svg = d3.select('#daysOfWeek')
        .append('svg')
        .attr('width', this.w)
        .attr('height', this.h)
        .style('border', 'gray solid 1px')
  }

  update(year) {
    console.log(year)
    console.log('Days of week loading')
    let daysData = datamodel.getData("DayOfTheWeek", "all", year)
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
    let angles = [ 0, 51, 102, 153, 204, 255, 306];
    let textX = [this.w/2.3, this.w/1.33, this.w/1.25, this.w/1.54, this.w/3.33, this.w/10, this.w/8.57]
    // let textX = [this.w/2.3, 225, 240, 195, 90, 30, 35];
    let textY = [this.h/6.25, this.h/3.53, this.h/1.67, this.h/1.22, this.h/1.2, this.h/1.67, this.h/3.33]
    // let textY = [48, 85, 180, 245, 250, 180, 90]
    let data = []
    this.svg.selectAll('text').remove()
    this.svg.selectAll('text')
            .data(daysData)
            .enter()
            .append('text')
            .text(function(d) {
              // if(d.Weekday =="Thursday") return "TH";
              // return d.Weekday.substring(0,1);
              return d.Weekday.substring(0,3).toUpperCase();
            })
            .attr('x', function(d, i) {
              return textX[i];
            })
            .attr('y', function(d, i) {
              return textY[i];
            })

  daysData.forEach(function(d, i) {
    data.push({"deaths":parseInt(d.Deaths), "angle":angles[i]});
  })
  this.svg.selectAll('circle').remove()
  this.svg.append('circle')
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
    this.svg.selectAll('path').remove()
    var path = this.svg.append('path')
      .datum(data)
      .attr('d', line)
      .attr('stroke', 'green')
      .attr('stroke-width', 3)
      .attr('fill', 'none')
      .attr('transform', 'translate(' + this.w/2 +','+ this.h/2 +')')
      //.attr('d', line);


      this.svg.append('text')
        .text('Days of the Week')
        .attr('x', 50)
        .attr('y', 20)
  }


}

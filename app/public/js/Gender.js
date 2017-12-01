//Highest rate for gender is for West Virginia in 2015; 47.7 for Males and 30.9 for Females
class Gender {

  constructor() {
      this.svgContainerHeight = 300;
      this.genderDiv = d3.select("#gender").attr("height", this.svgContainerHeight);
      this.svgContainerWidth = 340;
      this.bottomSVGPadding = 20;
      this.leftSVGPadding = 20;
      this.topSVGPadding = 10;
      this.bottomGPadding = 0;
      this.leftGPadding = 0;
      this.topGPadding = 0;
      this.svgContainer = this.genderDiv.append("svg");
      this.svgContainer.attr("height", this.svgContainerHeight).attr("width", this.svgContainerWidth);
      this.gContainerWidth = this.svgContainerWidth - this.leftSVGPadding;
      this.gContainerHeight = this.svgContainerHeight - this.bottomSVGPadding - this.topSVGPadding;
      this.gContainer = this.svgContainer.append("g")
          .attr("transform", `translate(${this.leftSVGPadding}, ${this.topSVGPadding})`);

  // .attr('height', this.gContainerHeight)
  //         .attr("width", this.gContainerWidth)




      //Formatting and Scales
      this.maleCenter = (this.gContainerWidth - this.leftGPadding) * .3333;
      this.femaleCenter = (this.gContainerWidth - this.leftGPadding) * .6666;
      this.maxRate = 50.;
      this.rateScale = d3.scaleLinear().domain([50, 0]).range([this.gContainerHeight - this.bottomGPadding, 0]);
      this.categoryScale = d3.scaleOrdinal().domain(["Male", "Female"]).range([this.maleCenter, this.femaleCenter]);
      this.maleColor = "#0E3AD6";
      this.femaleColor = "#D63877";
      this.colorScale = d3.scaleOrdinal().domain(["Male", "Female"]).range([this.maleColor, this.femaleColor]);
      this.xAxisGroup = this.gContainer.append("g").attr("transform", `translate(0, ${this.gContainerHeight + 10})`);
      this.yAxisGroup = this.gContainer.append("g").attr("transform", `translate(30, 0)`);

      //Bar Formatting
      this.barWidth = 35;

      //Set up the axis
      let yAxis = d3.axisLeft(this.rateScale);
      let xAxis = d3.axisBottom(this.categoryScale);
      this.xAxisGroup.call(xAxis);
      this.yAxisGroup.call(yAxis);
  }

  update(year, state) {
      let data = datamodel.getData("Gender", state, year);
      let bars = this.gContainer.selectAll("rect").data(data);
      bars.exit().remove();
      bars = bars.enter().append("rect").merge(bars);
      bars.attr("width", this.barWidth)
          .attr("height", d=>{
              let height =  this.rateScale(+d["Crude Rate"]);
              return height;
          })
          .attr("fill", d=>this.colorScale(d.Gender))
          .attr("y", this.bottomGPadding)
          .attr("x", d =>{return this.categoryScale(d.Gender) - .5 * this.barWidth})
          .attr("transform", `translate(0, ${this.gContainerHeight - this.bottomGPadding}) scale(1, -1)`);

  }

}

//Highest rate for gender is for West Virginia in 2015; 47.7 for Males and 30.9 for Females
class Gender {

  constructor() {
      this.genderDiv = d3.select("#gender");
      this.svgHeight = 340;
      this.svgWidth = 340;
      this.svg = this.genderDiv.append("svg");
      this.svg.attr("height", this.svgHeight).attr("width", this.svgWidth);

      //Formatting and Scales
      this.bottomOffset = 20;
      this.maleCenter = this.svgWidth * .3333;
      this.femaleCenter = this.svgWidth * .6666;
      this.maxRate = 50.;
      this.rateScale = d3.scaleLinear().domain([0, 50]).range([0, this.svgHeight - this.bottomOffset]);
      this.categoryScale = d3.scaleOrdinal().domain(["Male", "Female"]).range([this.maleCenter, this.femaleCenter]);
      this.maleColor = "#0E3AD6";
      this.femaleColor = "#D63877";
      this.colorScale = d3.scaleOrdinal().domain(["Male", "Female"]).range([this.maleColor, this.femaleColor]);
      this.xAxisGroup = this.svg.append("g").attr("transform", `translate(0, ${this.svgHeight - this.bottomOffset})`);
      this.yAxisGroup = this.svg.append("g");

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
      let bars = this.svg.selectAll("rect").data(data);
      bars.exit().remove();
      bars = bars.enter().append("rect").merge(bars);
      bars.attr("width", this.barWidth)
          .attr("height", d=>{
              let height =  this.rateScale(+d["Crude Rate"]);
              return height;
          })
          .attr("fill", d=>this.colorScale(d.Gender))
          .attr("y", this.bottomOffset)
          .attr("x", d =>{return this.categoryScale(d.Gender) - .5 * this.barWidth})
          .attr("transform", `translate(0, ${this.svgHeight - this.bottomOffset}) scale(1, -1)`);

  }

}

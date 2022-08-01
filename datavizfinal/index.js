// import * as d3 from "https://cdn.skypack.dev/d3@7";
            
//internal variables 
var curr_page = 0;
var width = window.innerWidth /2;
var height = 450;
var margin = 40;
const sheetnames = ["#sheet1","#sheet2","#sheet3","#sheet4"]
const sheet1 = d3.select("#sheet1")
    .append("svg")
    .attr("width", width + 2*margin)
    .attr("height", height + 2*margin)
    .append("g")
    .attr("transform", "translate("+margin+", "+margin+")");
const sheet2 = d3.select("#sheet2")
    .append("svg")
    .attr("width", width + 2*margin)
    .attr("height", height + 2*margin)
    .append("g")
    .attr("transform", "translate("+margin+", "+margin+")");
const sheet3 = d3.select("#sheet3")
    .append("svg")
    .attr("width", width + 2*margin)
    .attr("height", height + 2*margin)
    .append("g")
    .attr("transform", "translate("+margin+", "+margin+")");
const sheet4 = d3.select("#sheet4")
    .append("svg")
    .attr("width", width + 2*margin)
    .attr("height", height + 2*margin)
    .append("g")
    .attr("transform", "translate("+margin+", "+margin+")");

//data
//https://raw.githubusercontent.com/JeffSackmann/tennis_atp/master/atp_matches_2021.csv

d3.csv("full_data.csv").then( function(data) {

    //FIRST CHART
    var xScale = d3.scaleLinear().domain([0,90]).range([0,width]);
    var yScale = d3.scaleLinear().domain([40,300]).range([height, 0]);
    //display
    // sheet2.append("g").call(d3.axisLeft(yScale));
    // sheet2.append("g").call(d3.axisBottom(xScale)).attr("transform", "translate("+0+", "+height+")");
    // //initially, color by court surface and plot in a line
    // sheet2.append("g").selectAll("circle").data(data).enter().append("circle")//.filter(function(d) {return d.hypertension == 1 || d.heart_disease == 1})
    //     // .attr("cx", function(d,i) {return width})
    //     .attr("cx", function(d) {return xScale(d.age)})
    //     .attr("cy", function(d) {return yScale(d.avg_glucose_level)})
    //     .attr("r", 2)
    //     .style("fill", function(d) {
    //         if (d.heart_disease == 1 && d.hypertension == 1) return "lightgreen";
    //         else if (d.heart_disease == 1) return "#F05365";
    //         else if (d.hypertension == 1) return "#1B065E";
    //         else return "#F5ECCD";
    //     })
    //     .style("opacity", 0.8);

    sheet2.append("g").append("line").attr("x1",0).attr("x2",width).attr("y1",yScale(140)).attr("y2", yScale(140)).attr("stroke","black").style("opacity", 0.5);

    //then, points travel to their location on the x axis
    // sheet2.selectAll("circle")
    //     .transition()
    //     .delay(function(d,i) {return(i*2)})
    //     .duration(1500)
    //     .attr("cx", function (d) { return xScale(d.age) });

    //end first chart
    
    //SECOND CHART
    xScale = d3.scaleLinear().domain([0,90]).range([0,width]);
    yScale = d3.scaleLinear().domain([40,300]).range([height, 0]);
    sheet1.append("g").call(d3.axisLeft(yScale));
    sheet1.append("g").call(d3.axisBottom(xScale)).attr("transform", "translate("+0+", "+height+")");
    //initially, color by court surface and plot in a line
    sheet1.append("g").selectAll("circle").data(data).enter().append("circle")//.filter(function(d) {return d.avg_glucose_level < 170 && d.avg_glucose_level > 120})
        .attr("cx", function(d,i) {return 0})
        .attr("cy", function(d) {return yScale(d.avg_glucose_level)})
        .attr("r", 2)
        .style("fill", function(d) {
            if (d.avg_glucose_level < 140) return "#CEBACF";
            else if (d.avg_glucose_level < 190) return "#B0A3D4";
            else return "#7D80DA";
            if (d.stroke == 1) return 'red';
            // if (d.heart_disease == 1 && d.hypertension == 1) return "lightgreen";
            // else if (d.heart_disease == 1) return "#F05365";
            // else if (d.hypertension == 1) return "#1B065E";
            else return "#F5ECCD";
        })
        .style("opacity", 0.8);
    sheet1.append("g").append("line").attr("x1",0).attr("x2",width).attr("y1",yScale(140)).attr("y2", yScale(140)).attr("stroke","black").style("opacity", 0.5);

    //then, points travel to their location on the x axis
    sheet1.selectAll("circle")
        .transition()
        .delay(function(d,i) {return(i*2)})
        .duration(100)
        .attr("cx", function (d) { return xScale(d.age) });

// https://d3-graph-gallery.com/graph/custom_annotation.html
// Features of the annotation
const annotations = [
    {
      note: {
        label: "We see a clear gap in patients with blood glucose levels 120-140. From the data, the patients patients in this group seem less prone to disease.",
        title: "The Gap"
      },
      x: xScale(75),
      y: yScale(140),
      dy: -20,
      dx: 30
    },
    {
        note: {
            label: "Heart Disease",
            title: "Red"
          },
          x: xScale(82),
          y: yScale(57),
          dy: -20,
          dx: 30
    },
    {
        note: {
            label: "Hypertension",
            title: "Blue"
          },
          x: xScale(42),
          y: yScale(77),
          dy: 10,
          dx: 30
    }
  ]
  // Add annotation to the chart
  const makeAnnotations = d3.annotation()
    .annotations(annotations)
  sheet1
    .append("g")
    .call(makeAnnotations)
//end second chart

});

function showDiseases() {
    console.log("colorchange")
    sheet1.selectAll("circle")
        .transition()
        .duration(1500)
        .style("fill", function(d) {
            if (d.heart_disease == 1) return "red";
            else if (d.hypertension == 1) return "blue";
            else return this.style.fill;
        })
        .attr("r", function(d) {
            if (d.heart_disease == 1 || d.hypertension == 1) return 10;
            else return this.attr.fill;
        });
}
function hideDiseases() {
    console.log("colorchange")
    sheet1.selectAll("circle")
        .transition()
        .duration(1500)
        .style("fill", function(d) {
            if (d.avg_glucose_level < 140) return "#CEBACF";
            else if (d.avg_glucose_level < 190) return "#B0A3D4";
            else return "#7D80DA";
        })
        .attr("r", 2);
}
document.querySelector("#showDiseases").addEventListener("click", showDiseases);
document.querySelector("#hideDiseases").addEventListener("click", hideDiseases);

d3.csv("heart_failure_clinical_records_dataset.csv").then(function(data) {
    
    //THIRD CHART
    xScale = d3.scaleLinear().domain([25000,700000]).range([0,width]);
    yScale = d3.scaleLinear().domain([0,10]).range([height, 0]);
    sheet3.append("g").call(d3.axisLeft(yScale));
    sheet3.append("g").call(d3.axisBottom(xScale)).attr("transform", "translate("+0+", "+height+")");
    //initially, color by court surface and plot in a line
    sheet3.append("g").selectAll("dot").data(data).enter().append("circle")
        .attr("cx", function(d,i) {return width})
        .attr("cy", function(d) {return yScale(d.serum_creatinine)})
        .attr("r", 2)
        .style("fill", function(d) {
            // var smoke = d.smoking_status;
            // if (smoke == "never smoked") return "pink";
            // else if (smoke == "formerly smoked") return "grey";
            // if (smoke == "smokes") return "red";
            if (d.diabetes == 1) return "red";
            // if (d.DEATH_EVENT == 1) return "black";
            return "#F5ECCD";
        });
    //then, points travel to their location on the x axis
    sheet3.selectAll("circle")
        .transition()
        .delay(function(d,i) {return(i*2)})
        .duration(4000)
        .attr("cx", function (d) { return xScale(d.platelets)});


    //end third chart

    //FOURTH CHART
    xScale = d3.scaleLinear().domain([0,100]).range([0,width]);
    yScale = d3.scaleLinear().domain([0,100]).range([height, 0]);
    sheet4.append("g").call(d3.axisLeft(yScale));
    sheet4.append("g").call(d3.axisBottom(xScale)).attr("transform", "translate("+0+", "+height+")");
    //initially, color by court surface and plot in a line
    sheet4.append("g").selectAll("circle").data(data).enter().append("circle")
        .attr("cx", function(d,i) {return width})
        .attr("cy", function(d) {return yScale(d.ejection_fraction)})
        .attr("r", 2)
        .style("fill", function(d) {
            if(d.high_blood_pressure == 1) return "red";
            if (d.DEATH_EVENT == 1) return "blue";
            return "lightblue"
        });
    sheet4.append("g").append("line").attr("x1",0).attr("x2",width).attr("y1",yScale(75)).attr("y2", yScale(75)).attr("stroke","black").style("opacity", 0.5);
    sheet4.append("g").append("line").attr("x1",0).attr("x2",width).attr("y1",yScale(50)).attr("y2", yScale(50)).attr("stroke","black").style("opacity", 0.5);
    sheet4.append("g").append("line").attr("x1",0).attr("x2",width).attr("y1",yScale(41)).attr("y2", yScale(41)).attr("stroke","black").style("opacity", 0.5);

    //then, points travel to their location on the x axis
    sheet4.selectAll("circle")
        .transition()
        .delay(function(d,i) {return(i*2)})
        .duration(1500)
        .attr("cx", function (d) { return xScale(d.age) });
        //end fourth chart
        

});
//BUTTONS
document.addEventListener('DOMContentLoaded', function() {
    var buttons = document.querySelectorAll(".sheetswitch");
    buttons.forEach(button => {
        button.addEventListener("click", function() {
            let n = button.value;
            console.log(button.value, sheetnames[button.value]);
            d3.select(sheetnames[curr_page]).style("display","none");
            d3.select(sheetnames[n]).style("display", "block");
            curr_page = n;
            console.log(curr_page);
            document.querySelector("#displaydiv").innerHtml = document.querySelector(sheetnames[n]).innerHtml;
        });
        // button.click();
    });
//end buttons
});

// document.querySelector("#toSheet2").addEventListener("click", navToSheet(1));
// document.querySelector("#toSheet3").addEventListener("click", navToSheet(2));
// document.querySelector("#toSheet4").addEventListener("click", navToSheet(3));
// document.querySelector("#toSheet1").addEventListener("click", navToSheet(0));
        
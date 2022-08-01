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
    var xScale = d3.scaleLinear().domain([0,100]).range([0,width]);
    var yScale = d3.scaleLinear().domain([40,300]).range([height, 0]);
    //display
    sheet1.append("g").call(d3.axisLeft(yScale));
    sheet1.append("g").call(d3.axisBottom(xScale)).attr("transform", "translate("+0+", "+height+")");
    //initially, color by court surface and plot in a line
    sheet1.append("g").selectAll("circle").data(data).enter().append("circle")//.filter(function(d) {return d.hypertension == 1 || d.heart_disease == 1})
        .attr("cx", function(d,i) {return width})
        .attr("cy", function(d) {return yScale(d.avg_glucose_level)})
        .attr("r", 2)
        .style("fill", function(d) {
            if (d.heart_disease == 1 && d.hypertension == 1) return "lightgreenu";
            else if (d.heart_disease == 1) return "#F05365";
            else if (d.hypertension == 1) return "#1B065E";
            else return "#F5ECCD";
        })
        .style("opacity", 0.8);

    sheet1.append("g").append("line").attr("x1",0).attr("x2",width).attr("y1",yScale(140)).attr("y2", yScale(140)).attr("stroke","black")

    //then, points travel to their location on the x axis
    sheet1.selectAll("circle")
        .transition()
        .delay(function(d,i) {return(i*2)})
        .duration(1500)
        .attr("cx", function (d) { return xScale(d.age) });
    //end first chart
    const annotations = [
        {
            note: { label: "Hi" },
            x: 100,
            y: 100,
            dy: 137,
            dx: 162,
            subject: { radius: 50, radiusPadding: 10 },
        },
    ];

    d3.annotation().annotations(annotations);
    //SECOND CHART
    xScale = d3.scaleLinear().domain([0,90]).range([0,width]);
    yScale = d3.scaleLinear().domain([0,60]).range([height, 0]);
    sheet2.append("g").call(d3.axisLeft(yScale));
    sheet2.append("g").call(d3.axisBottom(xScale)).attr("transform", "translate("+0+", "+height+")");
    //initially, color by court surface and plot in a line
    sheet2.append("g").selectAll("circle").data(data).enter().append("circle")//.filter(function(d) {return d.heart_disease == 1 || d.hypertension == 1})
        .attr("cx", function(d,i) {return 0})
        .attr("cy", function(d) {return yScale(d.bmi)})
        .attr("r", 2)
        .style("fill", function(d) {
            // if (d.avg_glucose_level < 170 && d.avg_glucose_level > 120) return "lightgreen";
            if(d.stroke == 1) return 'red';
            // if (d.heart_disease == 1 && d.hypertension == 1) return "lightgreen";
            // else if (d.heart_disease == 1) return "#F05365";
            // else if (d.hypertension == 1) return "#1B065E";
            else return "#F5ECCD";
        })
        .style("opacity", 0.8);
    //then, points travel to their location on the x axis
    sheet2.selectAll("circle")
        .transition()
        .delay(function(d,i) {return(i*2)})
        .duration(1500)
        .attr("cx", function (d) { return xScale(d.age) });

    
//end second chart

});

d3.csv("heart_failure_clinical_records_dataset.csv").then(function(data) {
    
    //THIRD CHART
    xScale = d3.scaleLinear().domain([113,148]).range([0,width]);
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
            if (d.high_blood_pressure == 1) return "red";
            return "#F5ECCD";
        });
    //then, points travel to their location on the x axis
    sheet3.selectAll("circle")
        .transition()
        .delay(function(d,i) {return(i*2)})
        .duration(1500)
        .attr("cx", function (d) { return xScale(d.serum_sodium)});


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
            if(d.high_blood_pressure     == 1) return "red";
            return "lightblue"
        });
    sheet4.append("g").append("line").attr("x1",0).attr("x2",width).attr("y1",yScale(75)).attr("y2", yScale(75)).attr("stroke","black")
    sheet4.append("g").append("line").attr("x1",0).attr("x2",width).attr("y1",yScale(50)).attr("y2", yScale(50)).attr("stroke","black")
    sheet4.append("g").append("line").attr("x1",0).attr("x2",width).attr("y1",yScale(41)).attr("y2", yScale(41)).attr("stroke","black")

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
buttons[0].click();
//end buttons
});

// document.querySelector("#toSheet2").addEventListener("click", navToSheet(1));
// document.querySelector("#toSheet3").addEventListener("click", navToSheet(2));
// document.querySelector("#toSheet4").addEventListener("click", navToSheet(3));
// document.querySelector("#toSheet1").addEventListener("click", navToSheet(0));
        
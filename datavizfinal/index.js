// import * as d3 from "https://cdn.skypack.dev/d3@7";

//internal variables 
var curr_page = 0;
var width = window.innerWidth / 2;
var height = 450;
var margin = 40;
const sheetnames = ["#sheet1", "#sheet3", "#sheet4"]
const sheet1 = d3.select("#sheet1")
    .append("svg")
    .attr("width", width + 2 * margin)
    .attr("height", height + 2 * margin)
    .append("g")
    .attr("transform", "translate(" + margin + ", " + margin + ")");
const sheet2 = d3.select("#sheet2")
    .append("svg")
    .attr("width", width + 2 * margin)
    .attr("height", height + 2 * margin)
    .append("g")
    .attr("transform", "translate(" + margin + ", " + margin + ")");
const sheet3 = d3.select("#sheet3")
    .append("svg")
    .attr("width", width + 2 * margin)
    .attr("height", height + 2 * margin)
    .append("g")
    .attr("transform", "translate(" + margin + ", " + margin + ")");
const sheet4 = d3.select("#sheet4")
    .append("svg")
    .attr("width", width + 2 * margin)
    .attr("height", height + 2 * margin)
    .append("g")
    .attr("transform", "translate(" + margin + ", " + margin + ")");

//data
//https://raw.githubusercontent.com/JeffSackmann/tennis_atp/master/atp_matches_2021.csv

d3.csv("full_data.csv").then(function (data) {

    //FIRST CHART
    var xScale = d3.scaleLinear().domain([0, 90]).range([0, width]);
    var yScale = d3.scaleLinear().domain([40, 300]).range([height, 0]);
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

    sheet2.append("g").append("line").attr("x1", 0).attr("x2", width).attr("y1", yScale(140)).attr("y2", yScale(140)).attr("stroke", "black").style("opacity", 0.5);

    //then, points travel to their location on the x axis
    // sheet2.selectAll("circle")
    //     .transition()
    //     .delay(function(d,i) {return(i*2)})
    //     .duration(1500)
    //     .attr("cx", function (d) { return xScale(d.age) });

    //end first chart

    //SECOND CHART
    xScale = d3.scaleLinear().domain([0, 90]).range([0, width]);
    yScale = d3.scaleLinear().domain([40, 300]).range([height, 0]);
    sheet1.append("g").call(d3.axisLeft(yScale));
    sheet1.append("g").call(d3.axisBottom(xScale)).attr("transform", "translate(" + 0 + ", " + height + ")");
    //initially, color by court surface and plot in a line
    sheet1.append("g").selectAll("circle").data(data).enter().append("circle")//.filter(function(d) {return d.avg_glucose_level < 170 && d.avg_glucose_level > 120})
        .attr("cx", function (d, i) { return xScale(d.age) })
        .attr("cy", function (d) { return yScale(140) })
        .attr("r", 2)
        .style("fill", function (d) {
            if (d.avg_glucose_level < 140) return "#CEBACF";
            else if (d.avg_glucose_level < 190) return "#B0A3D4";
            else return "#7D80DA";
            if (d.stroke == 1) return 'red';
            // if (d.heart_disease == 1 && d.hypertension == 1) return "lightgreen";
            // else if (d.heart_disease == 1) return "#F05365";
            // else if (d.hypertension == 1) return "#1B065E";
            else return "#F5ECCD";
        })
        .style("opacity", 0.5);
    sheet1.append("g").append("line").attr("x1", 0).attr("x2", width).attr("y1", yScale(140)).attr("y2", yScale(140)).attr("stroke", "black").style("opacity", 0.5);

    //then, points travel to their location on the x axis
    sheet1.selectAll("circle")
        .transition()
        .delay(function (d, i) { return (i * 2) })
        .duration(1000)
        .attr("cy", function (d) { return yScale(d.avg_glucose_level) });

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
                title: "Yellow"
            },
            x: xScale(42),
            y: yScale(77),
            dy: 10,
            dx: 30
        }
    ]
    // Add annotation to the chart
    const makeAnnotations = d3.annotation()
        .annotations(annotations).type(d3.annotationCalloutCircle)
    sheet1
        .append("g")
        .call(makeAnnotations)
        .on('subjectover', function (annotation) {
            annotation.type.a.selectAll("g.annotation-connector, g.annotation-note").classed("hidden", false);
        }).on('subjectout', function (annotation) {
            annotation.type.a.selectAll("g.annotation-connector, g.annotation-note").classed("hidden", true);
        });
    //end second chart

});

function showDiseases() {
    console.log("colorchange")
    sheet1.selectAll("circle")
        .transition()
        .duration(1500)
        .style("fill", function (d) {
            if (d.heart_disease == 1) return "red";
            else if (d.hypertension == 1) return "orange";
            else return this.style.fill;
        })
        .attr("r", function (d) {
            if (d.heart_disease == 1 || d.hypertension == 1) return 3;
            else return 2;
        });
}
function hideDiseases() {
    console.log("colorchange")
    sheet1.selectAll("circle")
        .transition()
        .duration(1500)
        .style("fill", function (d) {
            if (d.avg_glucose_level < 140) return "#CEBACF";
            else if (d.avg_glucose_level < 190) return "#B0A3D4";
            else return "#7D80DA";
        })
        .attr("r", 2);
}
document.querySelector("#showDiseases").addEventListener("click", showDiseases);
document.querySelector("#hideDiseases").addEventListener("click", hideDiseases);

d3.csv("heart_failure_clinical_records_dataset.csv").then(function (data) {

    //THIRD CHART
    xScale = d3.scaleLinear().domain([20,100]).range([0, width]);
    yScale = d3.scaleLinear().domain([0, 100]).range([height, 0]);
    sheet4.append("g").call(d3.axisLeft(yScale));
    sheet4.append("g").call(d3.axisBottom(xScale)).attr("transform", "translate(" + 0 + ", " + height + ")");
    //initially, color by court surface and plot in a line
    sheet4.append("g").selectAll("dot").data(data).enter().append("circle")
        .attr("cx", function (d, i) { return width })
        .attr("cy", function (d) { return yScale(d.ejection_fraction) })
        .attr("r", 2)
        .style("fill", function (d) {
            // var smoke = d.smoking_status;
            // if (smoke == "never smoked") return "pink";
            // else if (smoke == "formerly smoked") return "grey";
            // if (smoke == "smokes") return "red";
            // if (d.diabetes == 1) return "red";
            // if (d.DEATH_EVENT == 1) return "black";
            return "#7D80DA";
        });
    //then, points travel to their location on the x axis
    sheet4.selectAll("circle")
        .transition()
        .delay(function (d, i) { return (i * 2) })
        .duration(2000)
        .attr("cx", function (d) { return xScale(d.age) });

    // List of groups (here I have one group per column)
    var fields = ["age",  "ejection_fraction", "platelets", "serum_creatinine", "serum_sodium", "time"]
    // var fields = ["age", "anaemia", "creatinine_phosphokinase", "diabetes", "ejection_fraction", "high_blood_pressure", "platelets", "serum_creatinine", "serum_sodium", "sex", "smoking", "time", "DEATH_EVENT"]
    var cFields = ["anaemia", "diabetes", "high_blood_pressure", "sex", "smoking", "DEATH_EVENT"]
    // add the options to the button
    d3.select("#xField")
        .selectAll('myOptions')
        .data(fields)
        .enter()
        .append('option')
        .text(function (d) { return d; }) // text showed in the menu
        .attr("value", function (d) { return d; }) // corresponding value returned

    // add the options to the button
    d3.select("#yField")
        .selectAll('myOptions')
        .data(fields)
        .enter()
        .append('option')
        .text(function (d) { return d; }) // text showed in the menu
        .attr("value", function (d) { return d; }) // corresponding value returned
    d3.select("#cField")
        .selectAll('myOptions')
        .data(cFields)
        .enter()
        .append('option')
        .text(function (d) { return d; }) // text showed in the menu
        .attr("value", function (d) { return d; }) // corresponding value returned
    // A function that update the chart
    data.forEach(function (d) {
        d.platelets = parseInt(d.platelets);
        d.time = parseInt(d.time)
    });

    const dimensions = ["cx", "cy", "r"]

    function updateColor(selectedGroup) {
     
            sheet4.selectAll("circle")
            .transition()
            .delay(function (d, i) { return (i * 2) })
            .duration(2000)
            .style("fill", function(d) {
                var val1 = parseInt(d[selectedGroup]);
                if (val1 > 0) {return "red";}
                else return "#7D80DA";
            }).style("opacity", 0.5)
            .attr("r", function(d) {
                if(selectedGroup == "sex") return 2;
                else {
                    let val = d[selectedGroup];
                    if(val == 1) return 4;
                    else return 2;
                }
            });
        
    }

    function update(selectedGroup, dim) {
        // Create new data with the selection?
        if(dim > 1) {
            return updateColor(selectedGroup);
        }
        let maxv = d3.max(data, function (d) { return d[selectedGroup] });
        let minv = d3.min(data, function (d) { return d[selectedGroup] });
        if (dim == 0) {
            xScale = d3.scaleLinear().domain([minv, maxv]).range([0, width]);

        } else if (dim == 1) {
            yScale = d3.scaleLinear().domain([minv, maxv]).range([height, 0]);
        }
        // console.log(yScale.domain)
        // console.log(minv, maxv, yScale(minv), yScale(maxv), selectedGroup)

        sheet4.select(".y.axis")
            .call(d3.axisLeft(yScale));
        // console.log()
        // console.log(d3.max(data[selectedGroup]))
        // var dataFilter = data.map(function(d){return {max: d3.max(d[selectedGroup]), min: d3.min(d[selectedGroup]), y:d[selectedGroup]} })
        // console.log(dataFilter)
        // Give these new data to update line

        if (dim == 0) {
            sheet4.selectAll("circle")
                .transition()
                .delay(function (d, i) { return (i * 2) })
                .duration(2000)
                .attr("cx", function (d) {
                    let val = d[selectedGroup];
                    if (val < minv || val > maxv) console.log("YOO");
                    // console.log(val, yScale(val))
                    return xScale(d[selectedGroup])
                });
        } else if (dim == 1) {
            sheet4.selectAll("circle")
                .transition()
                .delay(function (d, i) { return (i * 2) })
                .duration(2000)
                .attr("cy", function (d) {
                    let val = d[selectedGroup];
                    if (val < minv || val > maxv) console.log("YOO");
                    // console.log(val, yScale(val))
                    return yScale(d[selectedGroup])
                });
        } else {
            console.log("not supported (yet)")
        }
        sheet4.transition().call(d3.axisTop(xScale));

        sheet4.transition().call(d3.axisLeft(yScale));
    }

    // When the button is changed, run the updateChart function
    d3.select("#xField").on("change", function (d) {
        // recover the option that has been chosen
        var selectedOption = d3.select(this).property("value")
        console.log(selectedOption)
        // run the updateChart function with this selected option
        update(selectedOption, 0)
    });
    // When the button is changed, run the updateChart function
    d3.select("#yField").on("change", function (d) {
        // recover the option that has been chosen
        var selectedOption = d3.select(this).property("value")
        console.log(selectedOption)
        // run the updateChart function with this selected option
        update(selectedOption, 1)
    })
    d3.select("#cField").on("change", function (d) {
        // recover the option that has been chosen
        var selectedOption = d3.select(this).property("value")
        console.log(selectedOption)
        // run the updateChart function with this selected option
        update(selectedOption, 2);
    })
    //end third chart

    //FOURTH CHART
    xScale = d3.scaleLinear().domain([20, 100]).range([0, width]);
    yScale = d3.scaleLinear().domain([0, 100]).range([height, 0]);
    sheet3.append("g").call(d3.axisLeft(yScale));
    sheet3.append("g").call(d3.axisBottom(xScale)).attr("transform", "translate(" + 0 + ", " + height + ")");
    //initially, color by court surface and plot in a line
    sheet3.append("g").selectAll("circle").data(data).enter().append("circle")
        .attr("cx", function (d, i) { return width })
        .attr("cy", function (d) { return yScale(d.ejection_fraction) })
        .attr("r", 2)
        .style("fill", function (d) {
            if (d.high_blood_pressure == 1) return "orange";
            if (d.DEATH_EVENT == 1) return "black";
            return "#7D80DA";
        });
    sheet3.append("g").append("line").attr("x1", 0).attr("x2", width).attr("y1", yScale(75)).attr("y2", yScale(75)).attr("stroke", "black").style("opacity", 0.5);
    sheet3.append("g").append("line").attr("x1", 0).attr("x2", width).attr("y1", yScale(50)).attr("y2", yScale(50)).attr("stroke", "black").style("opacity", 0.5);
    sheet3.append("g").append("line").attr("x1", 0).attr("x2", width).attr("y1", yScale(41)).attr("y2", yScale(41)).attr("stroke", "black").style("opacity", 0.5);

    //then, points travel to their location on the x axis
    sheet3.selectAll("circle")
        .transition()
        .delay(function (d, i) { return (i * 2) })
        .duration(1500)
        .attr("cx", function (d) { return xScale(d.age) });
    //end fourth chart


});
//BUTTONS
document.addEventListener('DOMContentLoaded', function () {
    d3.select('#customAxesDiv').style("display", "none");
    var buttons = document.querySelectorAll(".sheetswitch");
    buttons.forEach(button => {
        button.addEventListener("click", function () {
            d3.select(sheetnames[curr_page]).style("display", "none");
            if (button.value == 1) {
                curr_page += 1;
                if (curr_page > 2) curr_page = 2;
            } else {
                curr_page -= 1;
                if (curr_page < 0) curr_page = 0;
            }
            console.log(sheetnames[curr_page])
            d3.select(sheetnames[curr_page]).style("display", "block");
            if (curr_page == 0) {
                d3.select('#toggleDiseaseDiv').style("display", "block");
            } else if (curr_page == 2) {
                d3.select('#customAxesDiv').style("display", "block");
            } else {
                d3.select('#toggleDiseaseDiv').style("display", "none");
                d3.select('#customAxesDiv').style("display", "none");
            }
        });
        // button.click();
    });
    //end buttons
});

// document.querySelector("#toSheet2").addEventListener("click", navToSheet(1));
// document.querySelector("#tosheet4").addEventListener("click", navToSheet(2));
// document.querySelector("#tosheet3").addEventListener("click", navToSheet(3));
// document.querySelector("#toSheet1").addEventListener("click", navToSheet(0));

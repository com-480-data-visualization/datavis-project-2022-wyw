let height = 880;
let width = 1100;
let margin = ({top: 0, right: 20, bottom: 34, left: 10});



let chartState = {};

chartState.measure = "date";
chartState.scale = "scaleLinear";
chartState.legend = "Year";


// Colors used for circles depending on continent
let colors = d3.scaleOrdinal()
    .domain(['Expressionism', 'Impressionism', 'Realism', 'Surrealism',
    'Cubism', 'PostImpressionism', 'Symbolism',
    'NorthernRenaissance', 'ArtNouveau',
    'Primitivism', 'Baroque',
    'Orientalism', 'Romanticism', 'HighRenaissance',
    'EarlyRenaissance', 'LateRenaissance', 'PopArt'])
    .range(['#84D1DC','#555582','#DB8B21','#FFD9C0',
'#8CC0DE','#B4CFB0','#94B49F','#789395','#ffd840','#FFB2A6','#FF8AAE','#FFE69A','#92B4EC',
'#F39189','#6E7582','#046582','#C65D7B','#874356','#827397','#464E2E','#ACB992',
'#DEA057','#CE9461','#8E3200','#A64B2A','#73777B','#15133C','#3A3845']);

d3.select("#ExpressionismColor").style("color", colors("Expressionism"));
d3.select("#ImpressionismColor").style("color", colors("Impressionism"));
d3.select("#RealismColor").style("color", colors("Realism"));
d3.select("#SurrealismColor").style("color", colors("Surrealism"));
d3.select("#CubismColor").style("color", colors("Cubism"));
d3.select("#PostImpressionismColor").style("color", colors("PostImpressionism"));
d3.select("#SymbolismColor").style("color", colors("Symbolism"));
d3.select("#NorthernRenaissanceColor").style("color", colors("NorthernRenaissance"));
d3.select("#ArtNouveauColor").style("color", colors("ArtNouveau"));
d3.select("#PrimitivismColor").style("color", colors("Primitivism"));
d3.select("#BaroqueColor").style("color", colors("Baroque"));
d3.select("#OrientalismColor").style("color", colors("Orientalism"));
d3.select("#RomanticismColor").style("color", colors("Romanticism"));
d3.select("#HighRenaissanceColor").style("color", colors("HighRenaissance"));
d3.select("#EarlyRenaissanceColor").style("color", colors("EarlyRenaissance"));
d3.select("#LateRenaissanceColor").style("color", colors("LateRenaissance"));
d3.select("#PopArtColor").style("color", colors("PopArt"));
let svg = d3.select("#svganchor")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

let xScale = d3.scaleLinear()
    .range([margin.left, width - margin.right]);

svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + (height - margin.bottom) + ")");

// Create line that connects circle and X axis
let xLine = svg.append("line")
    .attr("stroke", "rgb(96,125,139)")
    .attr("stroke-dasharray", "1,2");


// Create tooltip div and make it invisible
let tooltip = d3.select("#svganchor").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);


function showbio(author){
    var para = document.getElementsByTagName("P1").item(0);
    var link = document.querySelector("a");
    if (author==''){
        para.firstChild.data = ' ';
        document.getElementById('myLink').href=" ";   
        document.getElementById("myLink").textContent = "";
    
    }else{
        para.firstChild.data = author_bios[author].bio;
        document.getElementById('myLink').href=author_bios[author].wikipedia;   
        document.getElementById("myLink").textContent = "  Find Out More on Wiki...";
    
    }     
    
    return;
}


// Load and process data
draw(reduced_data);
function draw(data) {

    let dataSet = data;

    // Set chart domain max value to the highest total value in data set
    xScale.domain(d3.extent(data, function (d) {
        return +d.date;
    }));

    redraw(dataSet);



    // Trigger filter function whenever checkbox is ticked/unticked
    d3.select("#range1").on("change", redraw);
    d3.select("#range2").on("change", redraw);
    d3.select("#inputButton").on("click", filterSelect);

    function redraw(){
        let drawData = dataSet;

        // filter the data based on the time of range slider
        let leftValue = document.getElementById("range1").value;
        let rightValue = document.getElementById("range2").value;

        var dataset  = drawData.filter(function(d)
        {
                if (d["date"] >= leftValue && d["date"] <= rightValue)
                {
                    return d;
                }

        })

        // Set scale type based on button clicked
        xScale = d3.scaleLinear().range([ margin.left, width - margin.right ]);


        xScale.domain(d3.extent(dataset, function(d) {
            return +d[chartState.measure];
        }));

        let xAxis;
        // Set X axis based on new scale. If chart is set to "per capita" use numbers with one decimal point

        xAxis = d3.axisBottom(xScale)
                .tickFormat(d3.format(".0f"))
                .ticks(5)
                .tickSizeOuter(0);


        d3.transition(svg).select(".x.axis")
            .transition()
            .duration(500)
            .call(xAxis);

        svg.select(".x.axis")
            .select(".domain")
            .attr("stroke-width","5")
            .attr("fill-color","#fcc")
            .attr("fill-opacity","1")
            .attr("font-size","20");
     
        svg.select(".x.axis").selectAll(".tick text")
           .attr("font-weight","300")
           .attr('font-familiy',"'Montserrat', sans-serif");


        /*

        // Create simulation with specified dataset
        let simulation = d3.forceSimulation(dataset)
            // Apply positioning force to push nodes towards desired position along X axis
            .force("x", d3.forceX(function(d) {
                // Mapping of values from total/perCapita column of dataset to range of SVG chart (<margin.left, margin.right>)
                return xScale(+d[chartState.measure]);  // This is the desired position
            }).strength(2))  // Increase velocity
            .force("y", d3.forceY((height / 2) - margin.bottom / 2))  // // Apply positioning force to push nodes towards center along Y axis
            .force("collide", d3.forceCollide(9)) // Apply collision force with radius of 9 - keeps nodes centers 9 pixels apart
            .stop();  // Stop simulation from starting automatically

        // Manually run simulation
        for (let i = 0; i < dataset.length; ++i) {
            simulation.tick(10);
        }*/
        let base_url =  "https://drive.google.com/uc?id=";


        // Create country circles
        let picturesCircles = svg.selectAll(".pictures")
            .data(dataset, function(d) { return d.style });

        picturesCircles.enter()
            .append("circle")
            .attr("class", "pictures")
            /*.attr('y',function(d){(height / 2) - margin.bottom / 2})*/
            .attr("cx", function(d) { return xScale(+d[chartState.measure]); })
            .attr("cy", height-margin.bottom)
            /*
            .attr("cy", function(d) { if (d.y > (height / 2) - margin.bottom / 2){ return 10*height + margin.bottom;}
                                      else { return margin.bottom;}})*/
            .attr("r", 3)
            .style("opacity", 0)
            .attr("fill", function(d){ return colors(d.style)})
            .merge(picturesCircles)
            .transition()
            .duration(1000)
            .delay(function(d) { return Math.abs(xScale(+d[chartState.measure]) - ((width / 2) + margin.right / 2))*4;})
            .attr("cy", function(d) { return height-margin.bottom-6*d['y']})
            .style("opacity", 0.95);
        


        picturesCircles.exit()
                        .transition()
                        .duration(1000)
                        .delay(function(d) { return Math.abs(d3.select(this).attr("cx")- ((width / 2) + margin.right / 2))*4; })
                        .attr("cy",  margin.bottom)
                        .style("opacity", 0)
                        .remove();
        /*
            .transition()
            .duration(500)
            .delay(function(d) { return Math.abs(d.x - ((width / 2) + margin.right / 2))*10; })
            .attr("cx", function(d) { if ((xScale(+d[chartState.measure])) > ((width / 2) + margin.right / 2)){ return 0;}
                                    else { return width;}})
            .attr("cy",  margin.bottom)
            .style("opacity", 0)*/
            


        // Show tooltip when hovering over circle (data for respective country)
        d3.selectAll(".pictures").on("mousemove", function(d) {
            tooltip.html(`Title: <strong>${d.title}</strong><br>
                          Painter: <strong>${d.name}</strong><br>
                          Year: <strong>${d.date}</strong><br>
                          genre: <strong>${d.genre}</strong><br>
                          Style: <strong>${d.style}</strong><br>
                          Nationality: <strong>${d.nationality}</strong><br>
                          `)
                .transition()
                .style('top', d3.event.pageY - 12 + 'px')
                .style('left', d3.event.pageX + 25 + 'px')
                .style("opacity", 0.95)
                .style("background-color","#fcc")
                .style("color","#6464de")
                .style("animation-name", "titleWind");


            xLine.attr("x1", d3.select(this).attr("cx"))
                .attr("y1", d3.select(this).attr("cy"))
                .attr("y2", (height - margin.bottom))
                .attr("x2",  d3.select(this).attr("cx"))
                .attr("opacity", 1);

            d3.select(this).transition()
            .duration(200)
            .attr("r", 8);


        }).on("mouseout", function(_) {
            tooltip.style("opacity", 0)
            .style("animation-name", "none");
            xLine.attr("opacity", 0);

            d3.select(this).transition()
            .duration(200)
            .attr("r", 3);


        }).on("click",function(d){
            
            let url = base_url.concat(d.fileId);
            var img = document.getElementById('bigpic');
            console.log(img);
            img.src =url;
            img.style.display = "block";
           /* img.style.margin = "auto";
            img.style.width = "75%";*/
        });

    }


    function filterSelect() {

        function getSelect() {
            let selectOptions = Array.from(document.querySelectorAll('select[name="selectOptions"] option:checked'));
            let selectChecked = {'Painters':[], 'Styles':[]};
            /*console.log(selectOptions[0].parentNode.label);*/
            for (let i = 0; i < selectOptions.length; i++) {
                if (selectOptions[i].parentNode.label == "Painters") {
                     selectChecked.Painters.push(selectOptions[i].value);
                }

                if (selectOptions[i].parentNode.label == "Styles") {
                     selectChecked.Styles.push(selectOptions[i].value);
                }
            }
            console.log(selectChecked);
            return (selectChecked.Painters.length > 0 || selectChecked.Styles.length > 0)  ? selectChecked : null;
        }

        //var values = Array.from(document.querySelectorAll('select[name="selectOptions"] option:checked')).map(el => el.getAttribute('value'));
        // var values = Array.from(document.querySelectorAll('select[name="selectOptions"] option:checked'));
        // console.log(values[0].getAttribute('value'));


        let selectOptions = getSelect();
        console.log(selectOptions);

        let newData = reduced_data;

        if (selectOptions == null) {
            dataSet = newData;
            redraw();
            showbio('');
            return;
        }

        if (selectOptions.Painters.length > 0){
            for (let i = 0; i < selectOptions.Painters.length; i++){
                let newArray = data.filter(function(d) {
                    return d.name == selectOptions.Painters[i];
                });
                Array.prototype.push.apply(newData, newArray);
            }
            dataSet = newData;
            console.log(dataSet);
            if(selectOptions.Painters.length == 1){
                showbio(selectOptions.Painters[0]);
            }else{showbio('');}
        }else{showbio('');}

        if (selectOptions.Styles.length > 0){
            let newData = [];
            for (let i = 0; i < selectOptions.Styles.length; i++){
                let newArray = data.filter(function(d) {
                    return d.style === selectOptions.Styles[i];
                });
                Array.prototype.push.apply(newData, newArray);
            }
            dataSet = newData;
            console.log(dataSet);
        }

        redraw();
    }

};

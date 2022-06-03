countriesCircles.exit()
            .transition()
            .duration(1000)
            .attr("cx", 0)
            .attr("cy", (height / 2) - margin.bottom / 2)
            .remove();

        countriesCircles.enter()
            .append("circle")
            .attr("class", "countries")
            .attr("cx", 0)
            .attr("cy", (height / 2) - margin.bottom / 2)
            .attr("r", 6)
            .attr("fill", function(d){ return colors(d.style)})
            .merge(countriesCircles)
            .transition()
            .duration(1000)
            .attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; });
let arr = [];
let app = document.getElementById("app")
console.log(app);
let maxWidth = app.clientWidth-100;
let maxHeight = app.clientHeight-100;
let author_box = d3.select("#app").append("div")
    .attr("class", "author_box")
    .style("opacity", 0);

function addItem() {

  for (var i=0;i<30;i++){
    let div = document.createElement("div");
    div.setAttribute("class", "star");
    div.style.position = 'absolute';
    div.style.left = Math.floor(Math.random() * maxWidth) + "px";
    div.style.top = Math.floor(Math.random() * maxHeight) + "px";
    app.appendChild(div);
    arr.push(div);
    }
}

    function move() {
        if(arr.length > 1000) {
            clearInterval(window.addTask);
        }
        if (arr.length > 0) {
            arr.forEach(div => {
                let speed = Math.floor(Math.random() * maxWidth/100) + 5;
                let left = div.offsetLeft;
                let top = div.offsetTop;

                let theta = Math.floor(Math.random() * speed) + 10 * Math.PI * Math.random();
                let speedX = Math.floor(speed * Math.cos(theta));
                let speedY = Math.floor(speed * Math.sin(theta));

                left += speedX;
                top += speedY;
                if (left  >= maxWidth) {
                  left = maxWidth;
                  speedX = -speedX
                }
                if (left  <= 50) {
                  left = 100;
                  speedX = -speedX
                }
                if (top  >= maxHeight) {
                  top = maxHeight;
                  speedY = -speedY
                }
                if (top  <= 50) {
                  top = 100;
                  speedY = -speedY
                }
                div.style.left = left + "px"
                div.style.top = top + "px"
            })
        }
    }


addItem();
//setInterval(move,1000);
let moveInterval = setInterval(move,2000)
moveInterval

d3.selectAll(".star")
            .data(authors_introduction);

d3.selectAll(".star").on("click", function(d) {

  clearInterval(moveInterval)

  author_box.html(`Name: <strong>${d.name}</strong><br>
                Years: <strong>${d.years}</strong><br>
                Nationality: <strong>${d.nationality}</strong><br>
                Bio: <strong>${d.bio}</strong><br>
                Wikipedia: <strong>${d.wikipedia}</strong><br>`)
                .transition()
                .style("top", function() { if (d3.event.pageY > (maxHeight / 2)){ return d3.event.pageY -200 + 'px';}
                else { return d3.event.pageY - 15 + 'px';}})
                .style('left', function() { if (d3.event.pageX > (maxWidth / 2)){ return d3.event.pageX -700 + 'px';}
                else { return d3.event.pageX + 100 + 'px';}})
                .style('z-index', "1")
                .style("opacity", 0.9)
                .style("animation-name", "titleWind");


  d3.select(this).transition()
  .duration(1000)
  .style("width", "100px")
  .style("height", "100px")
  .style("background-image","url("+d.image+")");

}).on("dblclick", function() {

  moveInterval = setInterval(move,2000)

  author_box.transition()
  .duration(1000)
  .style("opacity", 0)
  .style("animation-name", "none");
  d3.select(this).transition()
  .duration(1000)
  .style("background-image", "radial-gradient(rgb(192, 203, 245), rgba(96, 135, 172, 0.8), rgba(73, 113, 151, 0.8))")
  .style("width", "15px")
  .style("height", "15px");
});

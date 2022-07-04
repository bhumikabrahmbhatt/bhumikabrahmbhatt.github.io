import {
  select,
  forceSimulation,
  forceManyBody,
  forceLink,
  forceCenter,
  drag,
} from 'd3';

import { nodes, links } from './data';

const svg = d3.select('#container');
const width = +svg.attr('width');
const height = +svg.attr('height');
const centerX = width / 2;
const centerY = height / 2;

var rangeSlider = document.getElementById('myRange');
rangeSlider.addEventListener('change', function(event,a,b) {
  simulation.force("link").links(links).distance(event.target.value);
  simulation.alpha(1);
  simulation.restart();
})

const simulation = d3.forceSimulation(nodes)
  .force('charge', d3.forceManyBody().strength(-20))
  .force(
    'link',
    d3.forceLink(links).distance(rangeSlider.value) // (link) => link.distance
  )
  .force('center', d3.forceCenter(centerX, centerY));

const dragInteraction = d3.drag().on('drag', (event, node) => {
  node.fx = event.x;
  node.fy = event.y;
  simulation.alpha(1);
  simulation.restart();
});

const lines = svg
  .selectAll('line')
  .data(links)
  .enter()
  .append('line')
  .attr('stroke', (link) => link.color || 'black');


const circles = svg
  .append("g")
  .attr("class", "circles")
  .selectAll('circle')
  .data(nodes)
  .enter()
  .append('circle')
  .attr('fill', (node) => node.color || 'gray')
  .attr('r', (node) => node.size)
  .call(dragInteraction);

d3.select("#allagents").selectAll("p").data(allagents).enter()
.append("text")
.text(function(ag){
    return ag+" ";
})

circles.on("click", function(d, agent) {
  if(agent.selectedagent === undefined){
    d3.select("#selectedagent").text(agent.id);
  }
  else{
    if(agent.selectedagent.metric_str === undefined){
      d3.select("#trustlog").style('display', 'block');
      d3.select("#agentlog").style('display', 'none');

      d3.select("#agent").text(agent.selectedagent.agent);
      d3.select("#datetime").text(agent.selectedagent.date_time);
      d3.select("#otheragent").text(agent.selectedagent.other_agent);
      d3.select("#resourceid").text(agent.selectedagent.resource_id);
      d3.select("#trustvalue").text(agent.selectedagent.trust_value);
    }
    else{
      d3.select("#agentlog").style('display', 'block');
      d3.select("#trustlog").style('display', 'none');

      d3.select("#adatetime").text(agent.selectedagent.date_time);
      d3.select("#metricstring").text(agent.selectedagent.metric_str);
      d3.select("#aotheragent").text(agent.selectedagent.other_agent);
      d3.select("#aresourceid").text(agent.selectedagent.resource_id);
      d3.select("#atrustvalue").text(agent.selectedagent.trust_value);
    }  
  }
});

const text = svg
  .selectAll('text')
  .data(nodes)
  .enter()
  .append('text')
  .attr('text-anchor', 'middle')
  .attr('alignment-baseline', 'middle')
  .style('pointer-events', 'none')
  .text((node) => node.id);

simulation.on('tick', () => {
  circles.attr('cx', (node) => node.x).attr('cy', (node) => node.y);
  text.attr('x', (node) => node.x).attr('y', (node) => node.y);

  lines
    .attr('x1', (link) => link.source.x)
    .attr('y1', (link) => link.source.y)
    .attr('x2', (link) => link.target.x)
    .attr('y2', (link) => link.target.y);
});


var zoom_handler = d3.zoom()
  .on("zoom", zoom_actions);

function zoom_actions(){
   circles.attr("transform", d3.zoomTransform(this));
   lines.attr("transform", d3.zoomTransform(this));
   text.attr("transform", d3.zoomTransform(this));
}

zoom_handler(svg);    

// zoomIn
d3.select("#zoomIn").on("click", function() {
  d3.select('svg')
    .transition()
    .call(zoom_handler.scaleBy, 2);
});

// zoomOut
d3.select("#zoomOut").on("click", function() {
  d3.select('svg')
    .transition()
    .call(zoom_handler.scaleBy, 0.5);
});

// resetZoom
d3.select("#resetZoom").on("click", function() {
  d3.select('svg')
    .transition()
    .call(zoom_handler.scaleTo, 1);
});

// center
d3.select("#center").on("click", function() {
  d3.select('svg')
    .transition()
    .call(zoom_handler.translateTo, 0.5 * width, 0.5 * height);
});

// panLeft
d3.select("#panLeft").on("click", function() {
  d3.select('svg')
    .transition()
    .call(zoom_handler.translateBy, -50, 0);
});

// panRight
d3.select("#panRight").on("click", function() {
  d3.select('svg')
    .transition()
    .call(zoom_handler.translateBy, 50, 0);
});
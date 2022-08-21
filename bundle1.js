(function (d3$1) {
    'use strict';
  
    const colors = [
      ['#E6A6B0'],
      ['#F4CAAF'],
      ['#719D93'],
      ['#A6D096'],
      ['#9D4452'],
      ['#A76C48'],
      ['#2E6B5E'],
      ['#538E3D'],
      ['#BE6B78'],
      ['#C99372'],
      ['#498175'],
      ['#75AC61'],
      ['#812836'],
      ['#884E2A'],
      ['#1B584A'],
      ['#3A7424'],
      ['#5B0D1A'],
      ['#602E0E'],
      ['#093E32'],
      ['#1F520C'],  
    ];
  
    const samples = {
       "agents_log": {
           "A":[],
           "B":[
              {
                 "date_time":"2022-05-05 14:23:45:579726",
                 "metric_str":"content_trust.direct_experience",
                 "other_agent":"A",
                 "resource_id":"http://example.com/Redecentralization_of_the_Web",
                 "trust_value":"0.0"
              },
              {
                 "date_time":"2022-05-05 14:23:45:588587",
                 "metric_str":"content_trust.recommendation",
                 "other_agent":"A",
                 "resource_id":"http://example.com/Redecentralization_of_the_Web",
                 "trust_value":"None"
              },
              {
                 "date_time":"2022-05-05 14:23:45:599123",
                 "metric_str":"content_trust.popularity",
                 "other_agent":"A",
                 "resource_id":"http://example.com/Redecentralization_of_the_Web",
                 "trust_value":"0.5"
              },
              {
                 "date_time":"2022-05-05 14:23:45:618727",
                 "metric_str":"content_trust.direct_experience",
                 "other_agent":"A",
                 "resource_id":"http://example.com/Web_of_Things",
                 "trust_value":"None"
              },
              {
                 "date_time":"2022-05-05 14:23:45:626127",
                 "metric_str":"content_trust.recommendation",
                 "other_agent":"A",
                 "resource_id":"http://example.com/Web_of_Things",
                 "trust_value":"None"
              },
              {
                 "date_time":"2022-05-05 14:23:45:635072",
                 "metric_str":"content_trust.popularity",
                 "other_agent":"A",
                 "resource_id":"http://example.com/Web_of_Things",
                 "trust_value":"0.5"
              },
              {
                 "date_time":"2022-05-05 14:23:45:654567",
                 "metric_str":"content_trust.direct_experience",
                 "other_agent":"A",
                 "resource_id":"http://example.com/Web_Assembly",
                 "trust_value":"1.0"
              },
              {
                 "date_time":"2022-05-05 14:23:45:663380",
                 "metric_str":"content_trust.recommendation",
                 "other_agent":"A",
                 "resource_id":"http://example.com/Web_Assembly",
                 "trust_value":"None"
              },
              {
                 "date_time":"2022-05-05 14:23:45:692856",
                 "metric_str":"content_trust.popularity",
                 "other_agent":"A",
                 "resource_id":"http://example.com/Web_Assembly",
                 "trust_value":"0.5"
              },
              {
                 "date_time":"2022-05-05 14:23:45:731857",
                 "metric_str":"content_trust.direct_experience",
                 "other_agent":"C",
                 "resource_id":"http://example.com/Semantic_Web_and_Linked_Open_Data",
                 "trust_value":"None"
              },
              {
                 "date_time":"2022-05-05 14:23:45:742579",
                 "metric_str":"content_trust.recommendation",
                 "other_agent":"C",
                 "resource_id":"http://example.com/Semantic_Web_and_Linked_Open_Data",
                 "trust_value":"None"
              },
              {
                 "date_time":"2022-05-05 14:23:45:752753",
                 "metric_str":"content_trust.popularity",
                 "other_agent":"C",
                 "resource_id":"http://example.com/Semantic_Web_and_Linked_Open_Data",
                 "trust_value":"0.5"
              },
              {
                 "date_time":"2022-05-05 14:23:45:820506",
                 "metric_str":"content_trust.direct_experience",
                 "other_agent":"C",
                 "resource_id":"http://example.com/Web-based_learning",
                 "trust_value":"0.0"
              },
              {
                 "date_time":"2022-05-05 14:23:45:829524",
                 "metric_str":"content_trust.recommendation",
                 "other_agent":"C",
                 "resource_id":"http://example.com/Web-based_learning",
                 "trust_value":"None"
              },
              {
                 "date_time":"2022-05-05 14:23:45:839545",
                 "metric_str":"content_trust.popularity",
                 "other_agent":"C",
                 "resource_id":"http://example.com/Web-based_learning",
                 "trust_value":"0.5"
              }
           ],
           "C":[],
           "D":[]
        },
       "trustLogDict": [
           {
              "date_time":"2022-05-05 14:23:45:601913",
              "agent":"B",
              "other_agent":"A",
              "resource_id":"http://example.com/Redecentralization_of_the_Web",
              "trust_value":"0.25"
           },
           {
              "date_time":"2022-05-05 14:23:45:639594",
              "agent":"B",
              "other_agent":"A",
              "resource_id":"http://example.com/Web_of_Things",
              "trust_value":"0.5"
           },
           {
              "date_time":"2022-05-05 14:23:45:715914",
              "agent":"B",
              "other_agent":"A",
              "resource_id":"http://example.com/Web_Assembly",
              "trust_value":"0.75"
           },
           {
              "date_time":"2022-05-05 14:23:45:757761",
              "agent":"B",
              "other_agent":"C",
              "resource_id":"http://example.com/Semantic_Web_and_Linked_Open_Data",
              "trust_value":"0.5"
           },
           {
              "date_time":"2022-05-05 14:23:45:844987",
              "agent":"B",
              "other_agent":"C",
              "resource_id":"http://example.com/Web-based_learning",
              "trust_value":"0.25"
           }
        ]
    };
  
    const nodes = [];
    const links = [];
  
    let i = 0;
  
    const addMainNode = (node) => {
      node.size = 20;
      node.color = colors[i++][0];
      nodes.push(node);
    };
  
    const connectMainNodes = (source, target, resource, datetime, trustvalue) => {
      links.push({
        source,
        target,
        resource,
        datetime,
        trustvalue,
        distance: 140,
        color: target.color
      });
    };
  
    const allagents = Object.keys(samples.agents_log);
  
    let castp = [];
    allagents.forEach((element, index) => {
      castp[index] = { id: index, agent: element };
      addMainNode(castp[index]);
    });
  
  
    for (i = 0; i < samples.trustLogDict.length; i++) {
      const first = castp.findIndex(element => element.agent === samples.trustLogDict[i].agent);
      const second = castp.findIndex(element => element.agent === samples.trustLogDict[i].other_agent);
      const resource = samples.trustLogDict[i].resource_id;
      const datetime = samples.trustLogDict[i].date_time;
      const trustvalue = samples.trustLogDict[i].trust_value;
  
      connectMainNodes(castp[second], castp[first], resource, datetime, trustvalue);
    }
  
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
    });
  
    const simulation = d3.forceSimulation(nodes)
      .force('charge', d3.forceManyBody().strength(-30))
      .force('link', d3.forceLink(links).distance(rangeSlider.value)) // (link) => link.distance)
      .force('center', d3.forceCenter(centerX, centerY));
  
    const dragInteraction = d3.drag().on('drag', (event, node) => {
      node.fx = event.x;
      node.fy = event.y;
      simulation.alpha(1);
      simulation.restart();
    });
  
    svg.append('defs').append("marker")
      .attr("id", "end")
      .attr("viewBox", "0 0 10 10")
      .attr("refX", "18")
      .attr("refY", "5")
      .attr("markerWidth", "5")
      .attr("markerHeight", "5")
      .attr('markerUnits', 'strokeWidth')
      .attr("xoverflow", "visible")
      .attr("orient", "auto")
      .append("path")
      .attr('fill', 'black')
      .attr("d", "M 0 0 L 10 5 L 0 10 z");
  
    const lines = svg
      .selectAll('line')
      .data(links)
      .enter()
      .append('path')
      .style("stroke-width", 5)
      .attr('stroke', (link) => link.color || 'black')
      .attr("class", "link")
      .attr('marker-end','url(#end)');
  
    const circles = svg
      .append("g")
      .attr("class", "circles")
      .selectAll('circle')
      .data(nodes)
      .enter()
      .append('circle')
      .attr('fill', (node) => node.color || 'gray')
      .attr('r', (node) => node.size)
      .style("stroke", 'black')
      .call(dragInteraction);
  
    const allagents$1 = Object.keys(samples.agents_log);
  
    d3.select("#allagents").selectAll("p").data(allagents$1).enter()
    .append("text")
    .text(function(ag){
        return ag+" ";
    });
  
    circles.on("click", function(d, agent) {
      document.getElementById("trustlog").innerHTML = ""; 
      document.getElementById("agentlog").innerHTML = "";
      d3.select("#selectedagent").text(agent.agent);
    })
    .on('mouseover', function(event,d){
      circles.style('fill', n=>n.id === d.id  ? n.color : '#b8b8b8');
      lines.style('stroke', a=>  a.target.id === d.id || a.source.id === d.id ? a.color : '#b8b8b8')
        .style('stroke-width', a=>a.target.id === d.id || a.source.id === d.id ? 5 : 1);
    })
    .on('mouseout', function(event,d){
      circles.style('fill', (node) => node.color);
      lines.style('stroke', (link) => link.color || 'black').style('stroke-width', 5);
    });
  
    const agents = samples.agents_log;
  
    var agentlogElements = "";
    var trustlogElements = "";
    lines.on("click", function(d, trustlog){ 
       
      agentlogElements = "";
      document.getElementById("trustlog").innerHTML = "";
  
      trustlogElements = `<div id="trustlog">
    <p><strong> Trust log info </strong></p>
    <p>Agent:  <span id="agent">`+trustlog.target.agent+`</span></p>
    <p>Date Time:  <span id="datetime">`+trustlog.datetime+`</span></p>
    <p>Other agent:  <span id="otheragent">`+trustlog.source.agent+`</span></p>
    <p>Resource ID:  <span id="resourceid">`+trustlog.resource+`</span></p>
    <p>Trust value:  <span id="trustvalue">`+trustlog.trustvalue+`</span></p>      
    </div>`;
  
      for (let i = 0; i < agents[trustlog.target.agent].length; i++) {
        if(agents[trustlog.target.agent][i].resource_id === trustlog.resource){
          
          agentlogElements += `<div id="agentlog">
        <p><strong> Agents log info </strong></p>
        <p>Date Time:  <span class="adatetime">`+agents[trustlog.target.agent][i].date_time+`</span></p>
        <p>Metric string:  <span class="metricstring">`+agents[trustlog.target.agent][i].metric_str+`</span></p>
        <p>Other agent:  <span class="aotheragent">`+agents[trustlog.target.agent][i].other_agent+`</span></p>
        <p>Resource ID:  <span class="aresourceid">`+agents[trustlog.target.agent][i].resource_id+`</span></p>
        <p>Trust value:  <span class="atrustvalue">`+agents[trustlog.target.agent][i].trust_value+`</span></p>      
        </div>`;
        }
        else {
          continue;
        }
      }
      
      document.getElementById("trustlog").innerHTML = trustlogElements;
      document.getElementById("agentlog").innerHTML = "";
      document.getElementById("agentlog").innerHTML = agentlogElements;
    });
  
    const text = svg
      .selectAll('text')
      .data(nodes)
      .enter()
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')
      .style('pointer-events', 'none')
      .text((node) => node.agent);
  
    var mLinkNum = {};
    for (var i$1=0; i$1<links.length; i$1++) {
      if (i$1 != 0 &&
          links[i$1].source.id == links[i$1-1].source.id &&
          links[i$1].target.id == links[i$1-1].target.id) {
              links[i$1].linkindex = links[i$1-1].linkindex + 1;
          }
      else {links[i$1].linkindex = 1;}  
      if(mLinkNum[links[i$1].target.id + "," + links[i$1].source.id] !== undefined){
  
        mLinkNum[links[i$1].target.id + "," + links[i$1].source.id] = links[i$1].linkindex;
      }
      else {
        mLinkNum[links[i$1].source.id + "," + links[i$1].target.id] = links[i$1].linkindex;
      }
    }
    simulation.on('tick', () => {
      circles.attr('cx', (node) => node.x).attr('cy', (node) => node.y);
      text.attr('x', (node) => node.x).attr('y', (node) => node.y);
      lines.attr("d", linkArc);
    });
  
    function linkArc(d) {
      var dx = d.target.x - d.source.x,
          dy = d.target.y - d.source.y,
          dr = Math.sqrt(dx * dx + dy * dy);
      var lTotalLinkNum = mLinkNum[d.source.id + "," + d.target.id] || mLinkNum[d.target.id + "," + d.source.id];
  
      if(lTotalLinkNum > 0)
      {
          dr = dr/(1 + (1/lTotalLinkNum) * (d.linkindex - 1));
      }
  
      return "M" + d.source.x + "," + d.source.y + 
              "A" + dr + "," + dr + " 0 0 1," + d.target.x + "," + d.target.y + 
              "A" + dr + "," + dr + " 0 0 0," + d.source.x + "," + d.source.y;	
    }
  
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
  
  }(d3));
  
  //# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbImNvbG9ycy5qcyIsInNhbXBsZXMuanMiLCJkYXRhLmpzIiwiaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IGNvbG9ycyA9IFtcbiAgWycjRTZBNkIwJ10sXG4gIFsnI0Y0Q0FBRiddLFxuICBbJyM3MTlEOTMnXSxcbiAgWycjQTZEMDk2J10sXG4gIFsnIzlENDQ1MiddLFxuICBbJyNBNzZDNDgnXSxcbiAgWycjMkU2QjVFJ10sXG4gIFsnIzUzOEUzRCddLFxuICBbJyNCRTZCNzgnXSxcbiAgWycjQzk5MzcyJ10sXG4gIFsnIzQ5ODE3NSddLFxuICBbJyM3NUFDNjEnXSxcbiAgWycjODEyODM2J10sXG4gIFsnIzg4NEUyQSddLFxuICBbJyMxQjU4NEEnXSxcbiAgWycjM0E3NDI0J10sXG4gIFsnIzVCMEQxQSddLFxuICBbJyM2MDJFMEUnXSxcbiAgWycjMDkzRTMyJ10sXG4gIFsnIzFGNTIwQyddLCAgXG5dOyIsImV4cG9ydCBjb25zdCBzYW1wbGVzID0ge1xuICAgXCJhZ2VudHNfbG9nXCI6IHtcbiAgICAgICBcIkFcIjpbXSxcbiAgICAgICBcIkJcIjpbXG4gICAgICAgICAge1xuICAgICAgICAgICAgIFwiZGF0ZV90aW1lXCI6XCIyMDIyLTA1LTA1IDE0OjIzOjQ1OjU3OTcyNlwiLFxuICAgICAgICAgICAgIFwibWV0cmljX3N0clwiOlwiY29udGVudF90cnVzdC5kaXJlY3RfZXhwZXJpZW5jZVwiLFxuICAgICAgICAgICAgIFwib3RoZXJfYWdlbnRcIjpcIkFcIixcbiAgICAgICAgICAgICBcInJlc291cmNlX2lkXCI6XCJodHRwOi8vZXhhbXBsZS5jb20vUmVkZWNlbnRyYWxpemF0aW9uX29mX3RoZV9XZWJcIixcbiAgICAgICAgICAgICBcInRydXN0X3ZhbHVlXCI6XCIwLjBcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgIFwiZGF0ZV90aW1lXCI6XCIyMDIyLTA1LTA1IDE0OjIzOjQ1OjU4ODU4N1wiLFxuICAgICAgICAgICAgIFwibWV0cmljX3N0clwiOlwiY29udGVudF90cnVzdC5yZWNvbW1lbmRhdGlvblwiLFxuICAgICAgICAgICAgIFwib3RoZXJfYWdlbnRcIjpcIkFcIixcbiAgICAgICAgICAgICBcInJlc291cmNlX2lkXCI6XCJodHRwOi8vZXhhbXBsZS5jb20vUmVkZWNlbnRyYWxpemF0aW9uX29mX3RoZV9XZWJcIixcbiAgICAgICAgICAgICBcInRydXN0X3ZhbHVlXCI6XCJOb25lXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgICBcImRhdGVfdGltZVwiOlwiMjAyMi0wNS0wNSAxNDoyMzo0NTo1OTkxMjNcIixcbiAgICAgICAgICAgICBcIm1ldHJpY19zdHJcIjpcImNvbnRlbnRfdHJ1c3QucG9wdWxhcml0eVwiLFxuICAgICAgICAgICAgIFwib3RoZXJfYWdlbnRcIjpcIkFcIixcbiAgICAgICAgICAgICBcInJlc291cmNlX2lkXCI6XCJodHRwOi8vZXhhbXBsZS5jb20vUmVkZWNlbnRyYWxpemF0aW9uX29mX3RoZV9XZWJcIixcbiAgICAgICAgICAgICBcInRydXN0X3ZhbHVlXCI6XCIwLjVcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgIFwiZGF0ZV90aW1lXCI6XCIyMDIyLTA1LTA1IDE0OjIzOjQ1OjYxODcyN1wiLFxuICAgICAgICAgICAgIFwibWV0cmljX3N0clwiOlwiY29udGVudF90cnVzdC5kaXJlY3RfZXhwZXJpZW5jZVwiLFxuICAgICAgICAgICAgIFwib3RoZXJfYWdlbnRcIjpcIkFcIixcbiAgICAgICAgICAgICBcInJlc291cmNlX2lkXCI6XCJodHRwOi8vZXhhbXBsZS5jb20vV2ViX29mX1RoaW5nc1wiLFxuICAgICAgICAgICAgIFwidHJ1c3RfdmFsdWVcIjpcIk5vbmVcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgIFwiZGF0ZV90aW1lXCI6XCIyMDIyLTA1LTA1IDE0OjIzOjQ1OjYyNjEyN1wiLFxuICAgICAgICAgICAgIFwibWV0cmljX3N0clwiOlwiY29udGVudF90cnVzdC5yZWNvbW1lbmRhdGlvblwiLFxuICAgICAgICAgICAgIFwib3RoZXJfYWdlbnRcIjpcIkFcIixcbiAgICAgICAgICAgICBcInJlc291cmNlX2lkXCI6XCJodHRwOi8vZXhhbXBsZS5jb20vV2ViX29mX1RoaW5nc1wiLFxuICAgICAgICAgICAgIFwidHJ1c3RfdmFsdWVcIjpcIk5vbmVcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgIFwiZGF0ZV90aW1lXCI6XCIyMDIyLTA1LTA1IDE0OjIzOjQ1OjYzNTA3MlwiLFxuICAgICAgICAgICAgIFwibWV0cmljX3N0clwiOlwiY29udGVudF90cnVzdC5wb3B1bGFyaXR5XCIsXG4gICAgICAgICAgICAgXCJvdGhlcl9hZ2VudFwiOlwiQVwiLFxuICAgICAgICAgICAgIFwicmVzb3VyY2VfaWRcIjpcImh0dHA6Ly9leGFtcGxlLmNvbS9XZWJfb2ZfVGhpbmdzXCIsXG4gICAgICAgICAgICAgXCJ0cnVzdF92YWx1ZVwiOlwiMC41XCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgICBcImRhdGVfdGltZVwiOlwiMjAyMi0wNS0wNSAxNDoyMzo0NTo2NTQ1NjdcIixcbiAgICAgICAgICAgICBcIm1ldHJpY19zdHJcIjpcImNvbnRlbnRfdHJ1c3QuZGlyZWN0X2V4cGVyaWVuY2VcIixcbiAgICAgICAgICAgICBcIm90aGVyX2FnZW50XCI6XCJBXCIsXG4gICAgICAgICAgICAgXCJyZXNvdXJjZV9pZFwiOlwiaHR0cDovL2V4YW1wbGUuY29tL1dlYl9Bc3NlbWJseVwiLFxuICAgICAgICAgICAgIFwidHJ1c3RfdmFsdWVcIjpcIjEuMFwiXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICAgXCJkYXRlX3RpbWVcIjpcIjIwMjItMDUtMDUgMTQ6MjM6NDU6NjYzMzgwXCIsXG4gICAgICAgICAgICAgXCJtZXRyaWNfc3RyXCI6XCJjb250ZW50X3RydXN0LnJlY29tbWVuZGF0aW9uXCIsXG4gICAgICAgICAgICAgXCJvdGhlcl9hZ2VudFwiOlwiQVwiLFxuICAgICAgICAgICAgIFwicmVzb3VyY2VfaWRcIjpcImh0dHA6Ly9leGFtcGxlLmNvbS9XZWJfQXNzZW1ibHlcIixcbiAgICAgICAgICAgICBcInRydXN0X3ZhbHVlXCI6XCJOb25lXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgICBcImRhdGVfdGltZVwiOlwiMjAyMi0wNS0wNSAxNDoyMzo0NTo2OTI4NTZcIixcbiAgICAgICAgICAgICBcIm1ldHJpY19zdHJcIjpcImNvbnRlbnRfdHJ1c3QucG9wdWxhcml0eVwiLFxuICAgICAgICAgICAgIFwib3RoZXJfYWdlbnRcIjpcIkFcIixcbiAgICAgICAgICAgICBcInJlc291cmNlX2lkXCI6XCJodHRwOi8vZXhhbXBsZS5jb20vV2ViX0Fzc2VtYmx5XCIsXG4gICAgICAgICAgICAgXCJ0cnVzdF92YWx1ZVwiOlwiMC41XCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgICBcImRhdGVfdGltZVwiOlwiMjAyMi0wNS0wNSAxNDoyMzo0NTo3MzE4NTdcIixcbiAgICAgICAgICAgICBcIm1ldHJpY19zdHJcIjpcImNvbnRlbnRfdHJ1c3QuZGlyZWN0X2V4cGVyaWVuY2VcIixcbiAgICAgICAgICAgICBcIm90aGVyX2FnZW50XCI6XCJDXCIsXG4gICAgICAgICAgICAgXCJyZXNvdXJjZV9pZFwiOlwiaHR0cDovL2V4YW1wbGUuY29tL1NlbWFudGljX1dlYl9hbmRfTGlua2VkX09wZW5fRGF0YVwiLFxuICAgICAgICAgICAgIFwidHJ1c3RfdmFsdWVcIjpcIk5vbmVcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgIFwiZGF0ZV90aW1lXCI6XCIyMDIyLTA1LTA1IDE0OjIzOjQ1Ojc0MjU3OVwiLFxuICAgICAgICAgICAgIFwibWV0cmljX3N0clwiOlwiY29udGVudF90cnVzdC5yZWNvbW1lbmRhdGlvblwiLFxuICAgICAgICAgICAgIFwib3RoZXJfYWdlbnRcIjpcIkNcIixcbiAgICAgICAgICAgICBcInJlc291cmNlX2lkXCI6XCJodHRwOi8vZXhhbXBsZS5jb20vU2VtYW50aWNfV2ViX2FuZF9MaW5rZWRfT3Blbl9EYXRhXCIsXG4gICAgICAgICAgICAgXCJ0cnVzdF92YWx1ZVwiOlwiTm9uZVwiXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICAgXCJkYXRlX3RpbWVcIjpcIjIwMjItMDUtMDUgMTQ6MjM6NDU6NzUyNzUzXCIsXG4gICAgICAgICAgICAgXCJtZXRyaWNfc3RyXCI6XCJjb250ZW50X3RydXN0LnBvcHVsYXJpdHlcIixcbiAgICAgICAgICAgICBcIm90aGVyX2FnZW50XCI6XCJDXCIsXG4gICAgICAgICAgICAgXCJyZXNvdXJjZV9pZFwiOlwiaHR0cDovL2V4YW1wbGUuY29tL1NlbWFudGljX1dlYl9hbmRfTGlua2VkX09wZW5fRGF0YVwiLFxuICAgICAgICAgICAgIFwidHJ1c3RfdmFsdWVcIjpcIjAuNVwiXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICAgXCJkYXRlX3RpbWVcIjpcIjIwMjItMDUtMDUgMTQ6MjM6NDU6ODIwNTA2XCIsXG4gICAgICAgICAgICAgXCJtZXRyaWNfc3RyXCI6XCJjb250ZW50X3RydXN0LmRpcmVjdF9leHBlcmllbmNlXCIsXG4gICAgICAgICAgICAgXCJvdGhlcl9hZ2VudFwiOlwiQ1wiLFxuICAgICAgICAgICAgIFwicmVzb3VyY2VfaWRcIjpcImh0dHA6Ly9leGFtcGxlLmNvbS9XZWItYmFzZWRfbGVhcm5pbmdcIixcbiAgICAgICAgICAgICBcInRydXN0X3ZhbHVlXCI6XCIwLjBcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgIFwiZGF0ZV90aW1lXCI6XCIyMDIyLTA1LTA1IDE0OjIzOjQ1OjgyOTUyNFwiLFxuICAgICAgICAgICAgIFwibWV0cmljX3N0clwiOlwiY29udGVudF90cnVzdC5yZWNvbW1lbmRhdGlvblwiLFxuICAgICAgICAgICAgIFwib3RoZXJfYWdlbnRcIjpcIkNcIixcbiAgICAgICAgICAgICBcInJlc291cmNlX2lkXCI6XCJodHRwOi8vZXhhbXBsZS5jb20vV2ViLWJhc2VkX2xlYXJuaW5nXCIsXG4gICAgICAgICAgICAgXCJ0cnVzdF92YWx1ZVwiOlwiTm9uZVwiXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICAgXCJkYXRlX3RpbWVcIjpcIjIwMjItMDUtMDUgMTQ6MjM6NDU6ODM5NTQ1XCIsXG4gICAgICAgICAgICAgXCJtZXRyaWNfc3RyXCI6XCJjb250ZW50X3RydXN0LnBvcHVsYXJpdHlcIixcbiAgICAgICAgICAgICBcIm90aGVyX2FnZW50XCI6XCJDXCIsXG4gICAgICAgICAgICAgXCJyZXNvdXJjZV9pZFwiOlwiaHR0cDovL2V4YW1wbGUuY29tL1dlYi1iYXNlZF9sZWFybmluZ1wiLFxuICAgICAgICAgICAgIFwidHJ1c3RfdmFsdWVcIjpcIjAuNVwiXG4gICAgICAgICAgfVxuICAgICAgIF0sXG4gICAgICAgXCJDXCI6W10sXG4gICAgICAgXCJEXCI6W11cbiAgICB9LFxuICAgXCJ0cnVzdExvZ0RpY3RcIjogW1xuICAgICAgIHtcbiAgICAgICAgICBcImRhdGVfdGltZVwiOlwiMjAyMi0wNS0wNSAxNDoyMzo0NTo2MDE5MTNcIixcbiAgICAgICAgICBcImFnZW50XCI6XCJCXCIsXG4gICAgICAgICAgXCJvdGhlcl9hZ2VudFwiOlwiQVwiLFxuICAgICAgICAgIFwicmVzb3VyY2VfaWRcIjpcImh0dHA6Ly9leGFtcGxlLmNvbS9SZWRlY2VudHJhbGl6YXRpb25fb2ZfdGhlX1dlYlwiLFxuICAgICAgICAgIFwidHJ1c3RfdmFsdWVcIjpcIjAuMjVcIlxuICAgICAgIH0sXG4gICAgICAge1xuICAgICAgICAgIFwiZGF0ZV90aW1lXCI6XCIyMDIyLTA1LTA1IDE0OjIzOjQ1OjYzOTU5NFwiLFxuICAgICAgICAgIFwiYWdlbnRcIjpcIkJcIixcbiAgICAgICAgICBcIm90aGVyX2FnZW50XCI6XCJBXCIsXG4gICAgICAgICAgXCJyZXNvdXJjZV9pZFwiOlwiaHR0cDovL2V4YW1wbGUuY29tL1dlYl9vZl9UaGluZ3NcIixcbiAgICAgICAgICBcInRydXN0X3ZhbHVlXCI6XCIwLjVcIlxuICAgICAgIH0sXG4gICAgICAge1xuICAgICAgICAgIFwiZGF0ZV90aW1lXCI6XCIyMDIyLTA1LTA1IDE0OjIzOjQ1OjcxNTkxNFwiLFxuICAgICAgICAgIFwiYWdlbnRcIjpcIkJcIixcbiAgICAgICAgICBcIm90aGVyX2FnZW50XCI6XCJBXCIsXG4gICAgICAgICAgXCJyZXNvdXJjZV9pZFwiOlwiaHR0cDovL2V4YW1wbGUuY29tL1dlYl9Bc3NlbWJseVwiLFxuICAgICAgICAgIFwidHJ1c3RfdmFsdWVcIjpcIjAuNzVcIlxuICAgICAgIH0sXG4gICAgICAge1xuICAgICAgICAgIFwiZGF0ZV90aW1lXCI6XCIyMDIyLTA1LTA1IDE0OjIzOjQ1Ojc1Nzc2MVwiLFxuICAgICAgICAgIFwiYWdlbnRcIjpcIkJcIixcbiAgICAgICAgICBcIm90aGVyX2FnZW50XCI6XCJDXCIsXG4gICAgICAgICAgXCJyZXNvdXJjZV9pZFwiOlwiaHR0cDovL2V4YW1wbGUuY29tL1NlbWFudGljX1dlYl9hbmRfTGlua2VkX09wZW5fRGF0YVwiLFxuICAgICAgICAgIFwidHJ1c3RfdmFsdWVcIjpcIjAuNVwiXG4gICAgICAgfSxcbiAgICAgICB7XG4gICAgICAgICAgXCJkYXRlX3RpbWVcIjpcIjIwMjItMDUtMDUgMTQ6MjM6NDU6ODQ0OTg3XCIsXG4gICAgICAgICAgXCJhZ2VudFwiOlwiQlwiLFxuICAgICAgICAgIFwib3RoZXJfYWdlbnRcIjpcIkNcIixcbiAgICAgICAgICBcInJlc291cmNlX2lkXCI6XCJodHRwOi8vZXhhbXBsZS5jb20vV2ViLWJhc2VkX2xlYXJuaW5nXCIsXG4gICAgICAgICAgXCJ0cnVzdF92YWx1ZVwiOlwiMC4yNVwiXG4gICAgICAgfVxuICAgIF1cbn07XG4iLCJpbXBvcnQgeyBjb2xvcnMgfSBmcm9tICcuL2NvbG9ycy5qcyc7XG5pbXBvcnQgeyBzYW1wbGVzIH0gZnJvbSAnLi9zYW1wbGVzLmpzJztcblxuZXhwb3J0IGNvbnN0IG5vZGVzID0gW107XG5leHBvcnQgY29uc3QgbGlua3MgPSBbXTtcblxubGV0IGkgPSAwO1xuXG5jb25zdCBhZGRNYWluTm9kZSA9IChub2RlKSA9PiB7XG4gIG5vZGUuc2l6ZSA9IDIwO1xuICBub2RlLmNvbG9yID0gY29sb3JzW2krK11bMF07XG4gIG5vZGVzLnB1c2gobm9kZSk7XG59O1xuXG5jb25zdCBjb25uZWN0TWFpbk5vZGVzID0gKHNvdXJjZSwgdGFyZ2V0LCByZXNvdXJjZSwgZGF0ZXRpbWUsIHRydXN0dmFsdWUpID0+IHtcbiAgbGlua3MucHVzaCh7XG4gICAgc291cmNlLFxuICAgIHRhcmdldCxcbiAgICByZXNvdXJjZSxcbiAgICBkYXRldGltZSxcbiAgICB0cnVzdHZhbHVlLFxuICAgIGRpc3RhbmNlOiAxNDAsXG4gICAgY29sb3I6IHRhcmdldC5jb2xvclxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBhbGxhZ2VudHMgPSBPYmplY3Qua2V5cyhzYW1wbGVzLmFnZW50c19sb2cpO1xuXG5sZXQgY2FzdHAgPSBbXTtcbmFsbGFnZW50cy5mb3JFYWNoKChlbGVtZW50LCBpbmRleCkgPT4ge1xuICBjYXN0cFtpbmRleF0gPSB7IGlkOiBpbmRleCwgYWdlbnQ6IGVsZW1lbnQgfTtcbiAgYWRkTWFpbk5vZGUoY2FzdHBbaW5kZXhdKTtcbn0pO1xuXG5cbmZvciAoaSA9IDA7IGkgPCBzYW1wbGVzLnRydXN0TG9nRGljdC5sZW5ndGg7IGkrKykge1xuICBjb25zdCBmaXJzdCA9IGNhc3RwLmZpbmRJbmRleChlbGVtZW50ID0+IGVsZW1lbnQuYWdlbnQgPT09IHNhbXBsZXMudHJ1c3RMb2dEaWN0W2ldLmFnZW50KTtcbiAgY29uc3Qgc2Vjb25kID0gY2FzdHAuZmluZEluZGV4KGVsZW1lbnQgPT4gZWxlbWVudC5hZ2VudCA9PT0gc2FtcGxlcy50cnVzdExvZ0RpY3RbaV0ub3RoZXJfYWdlbnQpO1xuICBjb25zdCByZXNvdXJjZSA9IHNhbXBsZXMudHJ1c3RMb2dEaWN0W2ldLnJlc291cmNlX2lkO1xuICBjb25zdCBkYXRldGltZSA9IHNhbXBsZXMudHJ1c3RMb2dEaWN0W2ldLmRhdGVfdGltZTtcbiAgY29uc3QgdHJ1c3R2YWx1ZSA9IHNhbXBsZXMudHJ1c3RMb2dEaWN0W2ldLnRydXN0X3ZhbHVlO1xuXG4gIGNvbm5lY3RNYWluTm9kZXMoY2FzdHBbc2Vjb25kXSwgY2FzdHBbZmlyc3RdLCByZXNvdXJjZSwgZGF0ZXRpbWUsIHRydXN0dmFsdWUpO1xufSIsImltcG9ydCB7XG4gIHNlbGVjdCxcbiAgZm9yY2VTaW11bGF0aW9uLFxuICBmb3JjZU1hbnlCb2R5LFxuICBmb3JjZUxpbmssXG4gIGZvcmNlQ2VudGVyLFxuICBkcmFnLFxufSBmcm9tICdkMyc7XG5cbmltcG9ydCB7IG5vZGVzLCBsaW5rcyB9IGZyb20gJy4vZGF0YS5qcyc7XG5pbXBvcnQgeyBzYW1wbGVzIH0gZnJvbSAnLi9zYW1wbGVzLmpzJztcblxuY29uc3Qgc3ZnID0gZDMuc2VsZWN0KCcjY29udGFpbmVyJyk7XG5jb25zdCB3aWR0aCA9ICtzdmcuYXR0cignd2lkdGgnKTtcbmNvbnN0IGhlaWdodCA9ICtzdmcuYXR0cignaGVpZ2h0Jyk7XG5jb25zdCBjZW50ZXJYID0gd2lkdGggLyAyO1xuY29uc3QgY2VudGVyWSA9IGhlaWdodCAvIDI7XG5cbnZhciByYW5nZVNsaWRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdteVJhbmdlJyk7XG5yYW5nZVNsaWRlci5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBmdW5jdGlvbihldmVudCxhLGIpIHtcbiAgc2ltdWxhdGlvbi5mb3JjZShcImxpbmtcIikubGlua3MobGlua3MpLmRpc3RhbmNlKGV2ZW50LnRhcmdldC52YWx1ZSk7XG4gIHNpbXVsYXRpb24uYWxwaGEoMSk7XG4gIHNpbXVsYXRpb24ucmVzdGFydCgpO1xufSlcblxuY29uc3Qgc2ltdWxhdGlvbiA9IGQzLmZvcmNlU2ltdWxhdGlvbihub2RlcylcbiAgLmZvcmNlKCdjaGFyZ2UnLCBkMy5mb3JjZU1hbnlCb2R5KCkuc3RyZW5ndGgoLTMwKSlcbiAgLmZvcmNlKCdsaW5rJywgZDMuZm9yY2VMaW5rKGxpbmtzKS5kaXN0YW5jZShyYW5nZVNsaWRlci52YWx1ZSkpIC8vIChsaW5rKSA9PiBsaW5rLmRpc3RhbmNlKVxuICAuZm9yY2UoJ2NlbnRlcicsIGQzLmZvcmNlQ2VudGVyKGNlbnRlclgsIGNlbnRlclkpKTtcblxuY29uc3QgZHJhZ0ludGVyYWN0aW9uID0gZDMuZHJhZygpLm9uKCdkcmFnJywgKGV2ZW50LCBub2RlKSA9PiB7XG4gIG5vZGUuZnggPSBldmVudC54O1xuICBub2RlLmZ5ID0gZXZlbnQueTtcbiAgc2ltdWxhdGlvbi5hbHBoYSgxKTtcbiAgc2ltdWxhdGlvbi5yZXN0YXJ0KCk7XG59KTtcblxuc3ZnLmFwcGVuZCgnZGVmcycpLmFwcGVuZChcIm1hcmtlclwiKVxuICAuYXR0cihcImlkXCIsIFwiZW5kXCIpXG4gIC5hdHRyKFwidmlld0JveFwiLCBcIjAgMCAxMCAxMFwiKVxuICAuYXR0cihcInJlZlhcIiwgXCIxOFwiKVxuICAuYXR0cihcInJlZllcIiwgXCI1XCIpXG4gIC5hdHRyKFwibWFya2VyV2lkdGhcIiwgXCI1XCIpXG4gIC5hdHRyKFwibWFya2VySGVpZ2h0XCIsIFwiNVwiKVxuICAuYXR0cignbWFya2VyVW5pdHMnLCAnc3Ryb2tlV2lkdGgnKVxuICAuYXR0cihcInhvdmVyZmxvd1wiLCBcInZpc2libGVcIilcbiAgLmF0dHIoXCJvcmllbnRcIiwgXCJhdXRvXCIpXG4gIC5hcHBlbmQoXCJwYXRoXCIpXG4gIC5hdHRyKCdmaWxsJywgJ2JsYWNrJylcbiAgLmF0dHIoXCJkXCIsIFwiTSAwIDAgTCAxMCA1IEwgMCAxMCB6XCIpO1xuXG5jb25zdCBsaW5lcyA9IHN2Z1xuICAuc2VsZWN0QWxsKCdsaW5lJylcbiAgLmRhdGEobGlua3MpXG4gIC5lbnRlcigpXG4gIC5hcHBlbmQoJ3BhdGgnKVxuICAuc3R5bGUoXCJzdHJva2Utd2lkdGhcIiwgNSlcbiAgLmF0dHIoJ3N0cm9rZScsIChsaW5rKSA9PiBsaW5rLmNvbG9yIHx8ICdibGFjaycpXG4gIC5hdHRyKFwiY2xhc3NcIiwgXCJsaW5rXCIpXG4gIC5hdHRyKCdtYXJrZXItZW5kJywndXJsKCNlbmQpJyk7XG5cbmNvbnN0IGNpcmNsZXMgPSBzdmdcbiAgLmFwcGVuZChcImdcIilcbiAgLmF0dHIoXCJjbGFzc1wiLCBcImNpcmNsZXNcIilcbiAgLnNlbGVjdEFsbCgnY2lyY2xlJylcbiAgLmRhdGEobm9kZXMpXG4gIC5lbnRlcigpXG4gIC5hcHBlbmQoJ2NpcmNsZScpXG4gIC5hdHRyKCdmaWxsJywgKG5vZGUpID0+IG5vZGUuY29sb3IgfHwgJ2dyYXknKVxuICAuYXR0cigncicsIChub2RlKSA9PiBub2RlLnNpemUpXG4gIC5zdHlsZShcInN0cm9rZVwiLCAnYmxhY2snKVxuICAuY2FsbChkcmFnSW50ZXJhY3Rpb24pO1xuXG5jb25zdCBhbGxhZ2VudHMgPSBPYmplY3Qua2V5cyhzYW1wbGVzLmFnZW50c19sb2cpO1xuXG5kMy5zZWxlY3QoXCIjYWxsYWdlbnRzXCIpLnNlbGVjdEFsbChcInBcIikuZGF0YShhbGxhZ2VudHMpLmVudGVyKClcbi5hcHBlbmQoXCJ0ZXh0XCIpXG4udGV4dChmdW5jdGlvbihhZyl7XG4gICAgcmV0dXJuIGFnK1wiIFwiO1xufSlcblxuY2lyY2xlcy5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKGQsIGFnZW50KSB7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidHJ1c3Rsb2dcIikuaW5uZXJIVE1MID0gXCJcIjsgXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWdlbnRsb2dcIikuaW5uZXJIVE1MID0gXCJcIjtcbiAgZDMuc2VsZWN0KFwiI3NlbGVjdGVkYWdlbnRcIikudGV4dChhZ2VudC5hZ2VudCk7XG59KVxuLm9uKCdtb3VzZW92ZXInLCBmdW5jdGlvbihldmVudCxkKXtcbiAgY2lyY2xlcy5zdHlsZSgnZmlsbCcsIG49Pm4uaWQgPT09IGQuaWQgID8gbi5jb2xvciA6ICcjYjhiOGI4JylcbiAgbGluZXMuc3R5bGUoJ3N0cm9rZScsIGE9PiAgYS50YXJnZXQuaWQgPT09IGQuaWQgfHwgYS5zb3VyY2UuaWQgPT09IGQuaWQgPyBhLmNvbG9yIDogJyNiOGI4YjgnKVxuICAgIC5zdHlsZSgnc3Ryb2tlLXdpZHRoJywgYT0+YS50YXJnZXQuaWQgPT09IGQuaWQgfHwgYS5zb3VyY2UuaWQgPT09IGQuaWQgPyA1IDogMSlcbn0pXG4ub24oJ21vdXNlb3V0JywgZnVuY3Rpb24oZXZlbnQsZCl7XG4gIGNpcmNsZXMuc3R5bGUoJ2ZpbGwnLCAobm9kZSkgPT4gbm9kZS5jb2xvcilcbiAgbGluZXMuc3R5bGUoJ3N0cm9rZScsIChsaW5rKSA9PiBsaW5rLmNvbG9yIHx8ICdibGFjaycpLnN0eWxlKCdzdHJva2Utd2lkdGgnLCA1KVxufSlcblxuY29uc3QgYWdlbnRzID0gc2FtcGxlcy5hZ2VudHNfbG9nO1xuXG52YXIgYWdlbnRsb2dFbGVtZW50cyA9IFwiXCI7XG52YXIgdHJ1c3Rsb2dFbGVtZW50cyA9IFwiXCI7XG5saW5lcy5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKGQsIHRydXN0bG9nKXsgXG4gICBcbiAgYWdlbnRsb2dFbGVtZW50cyA9IFwiXCI7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidHJ1c3Rsb2dcIikuaW5uZXJIVE1MID0gXCJcIjtcblxuICB0cnVzdGxvZ0VsZW1lbnRzID0gYDxkaXYgaWQ9XCJ0cnVzdGxvZ1wiPlxuICA8cD48c3Ryb25nPiBUcnVzdCBsb2cgaW5mbyA8L3N0cm9uZz48L3A+XG4gIDxwPkFnZW50OiAgPHNwYW4gaWQ9XCJhZ2VudFwiPmArdHJ1c3Rsb2cudGFyZ2V0LmFnZW50K2A8L3NwYW4+PC9wPlxuICA8cD5EYXRlIFRpbWU6ICA8c3BhbiBpZD1cImRhdGV0aW1lXCI+YCt0cnVzdGxvZy5kYXRldGltZStgPC9zcGFuPjwvcD5cbiAgPHA+T3RoZXIgYWdlbnQ6ICA8c3BhbiBpZD1cIm90aGVyYWdlbnRcIj5gK3RydXN0bG9nLnNvdXJjZS5hZ2VudCtgPC9zcGFuPjwvcD5cbiAgPHA+UmVzb3VyY2UgSUQ6ICA8c3BhbiBpZD1cInJlc291cmNlaWRcIj5gK3RydXN0bG9nLnJlc291cmNlK2A8L3NwYW4+PC9wPlxuICA8cD5UcnVzdCB2YWx1ZTogIDxzcGFuIGlkPVwidHJ1c3R2YWx1ZVwiPmArdHJ1c3Rsb2cudHJ1c3R2YWx1ZStgPC9zcGFuPjwvcD4gICAgICBcbiAgPC9kaXY+YDtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGFnZW50c1t0cnVzdGxvZy50YXJnZXQuYWdlbnRdLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYoYWdlbnRzW3RydXN0bG9nLnRhcmdldC5hZ2VudF1baV0ucmVzb3VyY2VfaWQgPT09IHRydXN0bG9nLnJlc291cmNlKXtcbiAgICAgIFxuICAgICAgYWdlbnRsb2dFbGVtZW50cyArPSBgPGRpdiBpZD1cImFnZW50bG9nXCI+XG4gICAgICA8cD48c3Ryb25nPiBBZ2VudHMgbG9nIGluZm8gPC9zdHJvbmc+PC9wPlxuICAgICAgPHA+RGF0ZSBUaW1lOiAgPHNwYW4gY2xhc3M9XCJhZGF0ZXRpbWVcIj5gK2FnZW50c1t0cnVzdGxvZy50YXJnZXQuYWdlbnRdW2ldLmRhdGVfdGltZStgPC9zcGFuPjwvcD5cbiAgICAgIDxwPk1ldHJpYyBzdHJpbmc6ICA8c3BhbiBjbGFzcz1cIm1ldHJpY3N0cmluZ1wiPmArYWdlbnRzW3RydXN0bG9nLnRhcmdldC5hZ2VudF1baV0ubWV0cmljX3N0citgPC9zcGFuPjwvcD5cbiAgICAgIDxwPk90aGVyIGFnZW50OiAgPHNwYW4gY2xhc3M9XCJhb3RoZXJhZ2VudFwiPmArYWdlbnRzW3RydXN0bG9nLnRhcmdldC5hZ2VudF1baV0ub3RoZXJfYWdlbnQrYDwvc3Bhbj48L3A+XG4gICAgICA8cD5SZXNvdXJjZSBJRDogIDxzcGFuIGNsYXNzPVwiYXJlc291cmNlaWRcIj5gK2FnZW50c1t0cnVzdGxvZy50YXJnZXQuYWdlbnRdW2ldLnJlc291cmNlX2lkK2A8L3NwYW4+PC9wPlxuICAgICAgPHA+VHJ1c3QgdmFsdWU6ICA8c3BhbiBjbGFzcz1cImF0cnVzdHZhbHVlXCI+YCthZ2VudHNbdHJ1c3Rsb2cudGFyZ2V0LmFnZW50XVtpXS50cnVzdF92YWx1ZStgPC9zcGFuPjwvcD4gICAgICBcbiAgICAgIDwvZGl2PmA7XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gIH1cbiAgXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidHJ1c3Rsb2dcIikuaW5uZXJIVE1MID0gdHJ1c3Rsb2dFbGVtZW50cztcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZ2VudGxvZ1wiKS5pbm5lckhUTUwgPSBcIlwiO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFnZW50bG9nXCIpLmlubmVySFRNTCA9IGFnZW50bG9nRWxlbWVudHM7XG59KTtcblxuY29uc3QgdGV4dCA9IHN2Z1xuICAuc2VsZWN0QWxsKCd0ZXh0JylcbiAgLmRhdGEobm9kZXMpXG4gIC5lbnRlcigpXG4gIC5hcHBlbmQoJ3RleHQnKVxuICAuYXR0cigndGV4dC1hbmNob3InLCAnbWlkZGxlJylcbiAgLmF0dHIoJ2FsaWdubWVudC1iYXNlbGluZScsICdtaWRkbGUnKVxuICAuc3R5bGUoJ3BvaW50ZXItZXZlbnRzJywgJ25vbmUnKVxuICAudGV4dCgobm9kZSkgPT4gbm9kZS5hZ2VudCk7XG5cbnZhciBtTGlua051bSA9IHt9O1xuZm9yICh2YXIgaT0wOyBpPGxpbmtzLmxlbmd0aDsgaSsrKSB7XG4gIGlmIChpICE9IDAgJiZcbiAgICAgIGxpbmtzW2ldLnNvdXJjZS5pZCA9PSBsaW5rc1tpLTFdLnNvdXJjZS5pZCAmJlxuICAgICAgbGlua3NbaV0udGFyZ2V0LmlkID09IGxpbmtzW2ktMV0udGFyZ2V0LmlkKSB7XG4gICAgICAgICAgbGlua3NbaV0ubGlua2luZGV4ID0gbGlua3NbaS0xXS5saW5raW5kZXggKyAxO1xuICAgICAgfVxuICBlbHNlIHtsaW5rc1tpXS5saW5raW5kZXggPSAxO307XG4gIFxuICBpZihtTGlua051bVtsaW5rc1tpXS50YXJnZXQuaWQgKyBcIixcIiArIGxpbmtzW2ldLnNvdXJjZS5pZF0gIT09IHVuZGVmaW5lZCl7XG5cbiAgICBtTGlua051bVtsaW5rc1tpXS50YXJnZXQuaWQgKyBcIixcIiArIGxpbmtzW2ldLnNvdXJjZS5pZF0gPSBsaW5rc1tpXS5saW5raW5kZXg7XG4gIH1cbiAgZWxzZSB7XG4gICAgbUxpbmtOdW1bbGlua3NbaV0uc291cmNlLmlkICsgXCIsXCIgKyBsaW5rc1tpXS50YXJnZXQuaWRdID0gbGlua3NbaV0ubGlua2luZGV4O1xuICB9XG59O1xuXG5zaW11bGF0aW9uLm9uKCd0aWNrJywgKCkgPT4ge1xuICBjaXJjbGVzLmF0dHIoJ2N4JywgKG5vZGUpID0+IG5vZGUueCkuYXR0cignY3knLCAobm9kZSkgPT4gbm9kZS55KTtcbiAgdGV4dC5hdHRyKCd4JywgKG5vZGUpID0+IG5vZGUueCkuYXR0cigneScsIChub2RlKSA9PiBub2RlLnkpO1xuICBsaW5lcy5hdHRyKFwiZFwiLCBsaW5rQXJjKTtcbn0pO1xuXG5mdW5jdGlvbiBsaW5rQXJjKGQpIHtcbiAgdmFyIGR4ID0gZC50YXJnZXQueCAtIGQuc291cmNlLngsXG4gICAgICBkeSA9IGQudGFyZ2V0LnkgLSBkLnNvdXJjZS55LFxuICAgICAgZHIgPSBNYXRoLnNxcnQoZHggKiBkeCArIGR5ICogZHkpO1xuICB2YXIgbFRvdGFsTGlua051bSA9IG1MaW5rTnVtW2Quc291cmNlLmlkICsgXCIsXCIgKyBkLnRhcmdldC5pZF0gfHwgbUxpbmtOdW1bZC50YXJnZXQuaWQgKyBcIixcIiArIGQuc291cmNlLmlkXTtcblxuICBpZihsVG90YWxMaW5rTnVtID4gMClcbiAge1xuICAgICAgZHIgPSBkci8oMSArICgxL2xUb3RhbExpbmtOdW0pICogKGQubGlua2luZGV4IC0gMSkpO1xuICB9XG5cbiAgcmV0dXJuIFwiTVwiICsgZC5zb3VyY2UueCArIFwiLFwiICsgZC5zb3VyY2UueSArIFxuICAgICAgICAgIFwiQVwiICsgZHIgKyBcIixcIiArIGRyICsgXCIgMCAwIDEsXCIgKyBkLnRhcmdldC54ICsgXCIsXCIgKyBkLnRhcmdldC55ICsgXG4gICAgICAgICAgXCJBXCIgKyBkciArIFwiLFwiICsgZHIgKyBcIiAwIDAgMCxcIiArIGQuc291cmNlLnggKyBcIixcIiArIGQuc291cmNlLnk7XHRcbn1cblxudmFyIHpvb21faGFuZGxlciA9IGQzLnpvb20oKVxuICAub24oXCJ6b29tXCIsIHpvb21fYWN0aW9ucyk7XG5cbmZ1bmN0aW9uIHpvb21fYWN0aW9ucygpe1xuICAgY2lyY2xlcy5hdHRyKFwidHJhbnNmb3JtXCIsIGQzLnpvb21UcmFuc2Zvcm0odGhpcykpO1xuICAgbGluZXMuYXR0cihcInRyYW5zZm9ybVwiLCBkMy56b29tVHJhbnNmb3JtKHRoaXMpKTtcbiAgIHRleHQuYXR0cihcInRyYW5zZm9ybVwiLCBkMy56b29tVHJhbnNmb3JtKHRoaXMpKTtcbn1cblxuem9vbV9oYW5kbGVyKHN2Zyk7ICAgIFxuXG4vLyB6b29tSW5cbmQzLnNlbGVjdChcIiN6b29tSW5cIikub24oXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcbiAgZDMuc2VsZWN0KCdzdmcnKVxuICAgIC50cmFuc2l0aW9uKClcbiAgICAuY2FsbCh6b29tX2hhbmRsZXIuc2NhbGVCeSwgMik7XG59KTtcblxuLy8gem9vbU91dFxuZDMuc2VsZWN0KFwiI3pvb21PdXRcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcbiAgZDMuc2VsZWN0KCdzdmcnKVxuICAgIC50cmFuc2l0aW9uKClcbiAgICAuY2FsbCh6b29tX2hhbmRsZXIuc2NhbGVCeSwgMC41KTtcbn0pO1xuXG4vLyByZXNldFpvb21cbmQzLnNlbGVjdChcIiNyZXNldFpvb21cIikub24oXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcbiAgZDMuc2VsZWN0KCdzdmcnKVxuICAgIC50cmFuc2l0aW9uKClcbiAgICAuY2FsbCh6b29tX2hhbmRsZXIuc2NhbGVUbywgMSk7XG59KTtcblxuLy8gY2VudGVyXG5kMy5zZWxlY3QoXCIjY2VudGVyXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XG4gIGQzLnNlbGVjdCgnc3ZnJylcbiAgICAudHJhbnNpdGlvbigpXG4gICAgLmNhbGwoem9vbV9oYW5kbGVyLnRyYW5zbGF0ZVRvLCAwLjUgKiB3aWR0aCwgMC41ICogaGVpZ2h0KTtcbn0pO1xuXG4vLyBwYW5MZWZ0XG5kMy5zZWxlY3QoXCIjcGFuTGVmdFwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xuICBkMy5zZWxlY3QoJ3N2ZycpXG4gICAgLnRyYW5zaXRpb24oKVxuICAgIC5jYWxsKHpvb21faGFuZGxlci50cmFuc2xhdGVCeSwgLTUwLCAwKTtcbn0pO1xuXG4vLyBwYW5SaWdodFxuZDMuc2VsZWN0KFwiI3BhblJpZ2h0XCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XG4gIGQzLnNlbGVjdCgnc3ZnJylcbiAgICAudHJhbnNpdGlvbigpXG4gICAgLmNhbGwoem9vbV9oYW5kbGVyLnRyYW5zbGF0ZUJ5LCA1MCwgMCk7XG59KTsiXSwibmFtZXMiOlsiYWxsYWdlbnRzIiwiaSJdLCJtYXBwaW5ncyI6Ijs7O0VBQU8sTUFBTSxNQUFNLEdBQUc7RUFDdEIsRUFBRSxDQUFDLFNBQVMsQ0FBQztFQUNiLEVBQUUsQ0FBQyxTQUFTLENBQUM7RUFDYixFQUFFLENBQUMsU0FBUyxDQUFDO0VBQ2IsRUFBRSxDQUFDLFNBQVMsQ0FBQztFQUNiLEVBQUUsQ0FBQyxTQUFTLENBQUM7RUFDYixFQUFFLENBQUMsU0FBUyxDQUFDO0VBQ2IsRUFBRSxDQUFDLFNBQVMsQ0FBQztF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LENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztFQUMzQixDQUFDLENBQUMsQ0FBQztBQUNIO0VBQ0EsU0FBUyxPQUFPLENBQUMsQ0FBQyxFQUFFO0VBQ3BCLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0VBQ2xDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztFQUNsQyxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0VBQ3hDLEVBQUUsSUFBSSxhQUFhLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUM3RztFQUNBLEVBQUUsR0FBRyxhQUFhLEdBQUcsQ0FBQztFQUN0QixFQUFFO0VBQ0YsTUFBTSxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxhQUFhLEtBQUssQ0FBQyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzFELEdBQUc7QUFDSDtFQUNBLEVBQUUsT0FBTyxHQUFHLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztFQUM1QyxVQUFVLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxTQUFTLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztFQUN6RSxVQUFVLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxTQUFTLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0VBQzFFLENBQUM7QUFDRDtFQUNBLElBQUksWUFBWSxHQUFHLEVBQUUsQ0FBQyxJQUFJLEVBQUU7RUFDNUIsR0FBRyxFQUFFLENBQUMsTUFBTSxFQUFFLFlBQVksQ0FBQyxDQUFDO0FBQzVCO0VBQ0EsU0FBUyxZQUFZLEVBQUU7RUFDdkIsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7RUFDckQsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7RUFDbkQsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7RUFDbEQsQ0FBQztBQUNEO0VBQ0EsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2xCO0VBQ0E7RUFDQSxFQUFFLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsV0FBVztFQUM1QyxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO0VBQ2xCLEtBQUssVUFBVSxFQUFFO0VBQ2pCLEtBQUssSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUM7RUFDbkMsQ0FBQyxDQUFDLENBQUM7QUFDSDtFQUNBO0VBQ0EsRUFBRSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFdBQVc7RUFDN0MsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztFQUNsQixLQUFLLFVBQVUsRUFBRTtFQUNqQixLQUFLLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0VBQ3JDLENBQUMsQ0FBQyxDQUFDO0FBQ0g7RUFDQTtFQUNBLEVBQUUsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxXQUFXO0VBQy9DLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7RUFDbEIsS0FBSyxVQUFVLEVBQUU7RUFDakIsS0FBSyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQztFQUNuQyxDQUFDLENBQUMsQ0FBQztBQUNIO0VBQ0E7RUFDQSxFQUFFLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsV0FBVztFQUM1QyxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO0VBQ2xCLEtBQUssVUFBVSxFQUFFO0VBQ2pCLEtBQUssSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsR0FBRyxHQUFHLEtBQUssRUFBRSxHQUFHLEdBQUcsTUFBTSxDQUFDLENBQUM7RUFDL0QsQ0FBQyxDQUFDLENBQUM7QUFDSDtFQUNBO0VBQ0EsRUFBRSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFdBQVc7RUFDN0MsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztFQUNsQixLQUFLLFVBQVUsRUFBRTtFQUNqQixLQUFLLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO0VBQzVDLENBQUMsQ0FBQyxDQUFDO0FBQ0g7RUFDQTtFQUNBLEVBQUUsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxXQUFXO0VBQzlDLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7RUFDbEIsS0FBSyxVQUFVLEVBQUU7RUFDakIsS0FBSyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7RUFDM0MsQ0FBQyxDQUFDOzs7OyJ9
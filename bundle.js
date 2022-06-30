(function (d3) {
  'use strict';

  // Generated with https://paletton.com/#uid=75x0u0kigkU8ZuBdTpdmbh6rjc7
  const colors = [
    ['#9D4452', '#E6A6B0', '#BE6B78', '#812836', '#5B0D1A'],
    ['#A76C48', '#F4CAAF', '#C99372', '#884E2A', '#602E0E'],
    ['#2E6B5E', '#719D93', '#498175', '#1B584A', '#093E32'],
    ['#538E3D', '#A6D096', '#75AC61', '#3A7424', '#1F520C'],
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
          }
      ]
     };

  const nodes = [];
  const links = [];

  const MAIN_NODE_SIZE = 25;
  const CHILD_NODE_SIZE = 15;
  const LEAF_NODE_SIZE = 5;
  const DEFAULT_DISTANCE = 60;
  const MAIN_NODE_DISTANCE = 90;
  const LEAF_NODE_DISTANCE = 30;
  const MANY_BODY_STRENGTH = -20;

  let i = 0;

  const addMainNode = (node) => {
    node.size = MAIN_NODE_SIZE;
    node.color = colors[i++][1];
    nodes.push(node);
  };

  const addChildNode = (
    parentNode,
    childNode,
    size = CHILD_NODE_SIZE,
    distance = DEFAULT_DISTANCE
  ) => {
    childNode.size = size;
    childNode.color = parentNode.color;
    nodes.push(childNode);
    links.push({
      source: parentNode,
      target: childNode,
      distance,
      color: parentNode.color,
    });
  };

  const assembleChildNode = (parentNode, id, addnode, reso) => {
      const childNode = { id };
      addChildNode(parentNode, childNode);
      const agents = samples.agents_log[addnode];
    
      for (let i = 0; i < samples.agents_log[addnode].length; i++) {
        if(agents[i].other_agent === parentNode.id && agents[i].resource_id === reso){
          addChildNode(childNode, { id: '' }, LEAF_NODE_SIZE, LEAF_NODE_DISTANCE);
        }
        continue;
      }
  };

  const connectMainNodes = (source, target) => {
    links.push({
      source,
      target,
      distance: MAIN_NODE_DISTANCE,
      color: source.color
    });
  };

  const allagents = Object.keys(samples.agents_log);

  let castp = [];
  allagents.forEach((element, index) => {    
    castp[index] = { id: element };
    addMainNode(castp[index]);
  });

  for (let i = 0; i < samples.trustLogDict.length; i++) {
    
    const first = castp.findIndex(element => element.id === samples.trustLogDict[i].agent);
    const second = castp.findIndex(element => element.id === samples.trustLogDict[i].other_agent);
    
    connectMainNodes(castp[first], castp[second]); // if agent b , and other agent a, then find who's id is same
    
    let str = samples.trustLogDict[i].resource_id;
    assembleChildNode(castp[second], str.charAt(0),castp[first].id, str);
  }

  const svg = d3.select('#container');
  const width = +svg.attr('width');
  const height = +svg.attr('height');
  const centerX = width / 2;
  const centerY = height / 2;

  const simulation = d3.forceSimulation(nodes)
    .force('charge', d3.forceManyBody().strength(MANY_BODY_STRENGTH))
    .force(
      'link',
      d3.forceLink(links).distance((link) => link.distance)
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
    .selectAll('circle')
    .data(nodes)
    .enter()
    .append('circle')
    .attr('fill', (node) => node.color || 'gray')
    .attr('r', (node) => node.size)
    .call(dragInteraction);

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

}(d3));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbImNvbG9ycy5qcyIsImRhdGFzYW1wbGUuanMiLCJkYXRhLmpzIiwiaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gR2VuZXJhdGVkIHdpdGggaHR0cHM6Ly9wYWxldHRvbi5jb20vI3VpZD03NXgwdTBraWdrVThadUJkVHBkbWJoNnJqYzdcbmV4cG9ydCBjb25zdCBjb2xvcnMgPSBbXG4gIFsnIzlENDQ1MicsICcjRTZBNkIwJywgJyNCRTZCNzgnLCAnIzgxMjgzNicsICcjNUIwRDFBJ10sXG4gIFsnI0E3NkM0OCcsICcjRjRDQUFGJywgJyNDOTkzNzInLCAnIzg4NEUyQScsICcjNjAyRTBFJ10sXG4gIFsnIzJFNkI1RScsICcjNzE5RDkzJywgJyM0OTgxNzUnLCAnIzFCNTg0QScsICcjMDkzRTMyJ10sXG4gIFsnIzUzOEUzRCcsICcjQTZEMDk2JywgJyM3NUFDNjEnLCAnIzNBNzQyNCcsICcjMUY1MjBDJ10sXG5dO1xuIiwiZXhwb3J0IGNvbnN0IHNhbXBsZXMgPSB7XG4gICBcImFnZW50c19sb2dcIjoge1xuICAgICAgICBcIkFcIjpbXSxcbiAgICAgICAgXCJCXCI6W1xuICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwiZGF0ZV90aW1lXCI6XCIyMDIyLTA1LTA1IDE0OjIzOjQ1OjU3OTcyNlwiLFxuICAgICAgICAgICAgICBcIm1ldHJpY19zdHJcIjpcImNvbnRlbnRfdHJ1c3QuZGlyZWN0X2V4cGVyaWVuY2VcIixcbiAgICAgICAgICAgICAgXCJvdGhlcl9hZ2VudFwiOlwiQVwiLFxuICAgICAgICAgICAgICBcInJlc291cmNlX2lkXCI6XCJodHRwOi8vZXhhbXBsZS5jb20vUmVkZWNlbnRyYWxpemF0aW9uX29mX3RoZV9XZWJcIixcbiAgICAgICAgICAgICAgXCJ0cnVzdF92YWx1ZVwiOlwiMC4wXCJcbiAgICAgICAgICAgfSxcbiAgICAgICAgICAge1xuICAgICAgICAgICAgICBcImRhdGVfdGltZVwiOlwiMjAyMi0wNS0wNSAxNDoyMzo0NTo1ODg1ODdcIixcbiAgICAgICAgICAgICAgXCJtZXRyaWNfc3RyXCI6XCJjb250ZW50X3RydXN0LnJlY29tbWVuZGF0aW9uXCIsXG4gICAgICAgICAgICAgIFwib3RoZXJfYWdlbnRcIjpcIkFcIixcbiAgICAgICAgICAgICAgXCJyZXNvdXJjZV9pZFwiOlwiaHR0cDovL2V4YW1wbGUuY29tL1JlZGVjZW50cmFsaXphdGlvbl9vZl90aGVfV2ViXCIsXG4gICAgICAgICAgICAgIFwidHJ1c3RfdmFsdWVcIjpcIk5vbmVcIlxuICAgICAgICAgICB9LFxuICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwiZGF0ZV90aW1lXCI6XCIyMDIyLTA1LTA1IDE0OjIzOjQ1OjU5OTEyM1wiLFxuICAgICAgICAgICAgICBcIm1ldHJpY19zdHJcIjpcImNvbnRlbnRfdHJ1c3QucG9wdWxhcml0eVwiLFxuICAgICAgICAgICAgICBcIm90aGVyX2FnZW50XCI6XCJBXCIsXG4gICAgICAgICAgICAgIFwicmVzb3VyY2VfaWRcIjpcImh0dHA6Ly9leGFtcGxlLmNvbS9SZWRlY2VudHJhbGl6YXRpb25fb2ZfdGhlX1dlYlwiLFxuICAgICAgICAgICAgICBcInRydXN0X3ZhbHVlXCI6XCIwLjVcIlxuICAgICAgICAgICB9LFxuICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwiZGF0ZV90aW1lXCI6XCIyMDIyLTA1LTA1IDE0OjIzOjQ1OjYxODcyN1wiLFxuICAgICAgICAgICAgICBcIm1ldHJpY19zdHJcIjpcImNvbnRlbnRfdHJ1c3QuZGlyZWN0X2V4cGVyaWVuY2VcIixcbiAgICAgICAgICAgICAgXCJvdGhlcl9hZ2VudFwiOlwiQVwiLFxuICAgICAgICAgICAgICBcInJlc291cmNlX2lkXCI6XCJodHRwOi8vZXhhbXBsZS5jb20vV2ViX29mX1RoaW5nc1wiLFxuICAgICAgICAgICAgICBcInRydXN0X3ZhbHVlXCI6XCJOb25lXCJcbiAgICAgICAgICAgfSxcbiAgICAgICAgICAge1xuICAgICAgICAgICAgICBcImRhdGVfdGltZVwiOlwiMjAyMi0wNS0wNSAxNDoyMzo0NTo2MjYxMjdcIixcbiAgICAgICAgICAgICAgXCJtZXRyaWNfc3RyXCI6XCJjb250ZW50X3RydXN0LnJlY29tbWVuZGF0aW9uXCIsXG4gICAgICAgICAgICAgIFwib3RoZXJfYWdlbnRcIjpcIkFcIixcbiAgICAgICAgICAgICAgXCJyZXNvdXJjZV9pZFwiOlwiaHR0cDovL2V4YW1wbGUuY29tL1dlYl9vZl9UaGluZ3NcIixcbiAgICAgICAgICAgICAgXCJ0cnVzdF92YWx1ZVwiOlwiTm9uZVwiXG4gICAgICAgICAgIH0sXG4gICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJkYXRlX3RpbWVcIjpcIjIwMjItMDUtMDUgMTQ6MjM6NDU6NjM1MDcyXCIsXG4gICAgICAgICAgICAgIFwibWV0cmljX3N0clwiOlwiY29udGVudF90cnVzdC5wb3B1bGFyaXR5XCIsXG4gICAgICAgICAgICAgIFwib3RoZXJfYWdlbnRcIjpcIkFcIixcbiAgICAgICAgICAgICAgXCJyZXNvdXJjZV9pZFwiOlwiaHR0cDovL2V4YW1wbGUuY29tL1dlYl9vZl9UaGluZ3NcIixcbiAgICAgICAgICAgICAgXCJ0cnVzdF92YWx1ZVwiOlwiMC41XCJcbiAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBcIkNcIjpbXSxcbiAgICAgICAgXCJEXCI6W11cbiAgICAgfSxcbiAgICBcInRydXN0TG9nRGljdFwiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgXCJkYXRlX3RpbWVcIjpcIjIwMjItMDUtMDUgMTQ6MjM6NDU6NjAxOTEzXCIsXG4gICAgICAgICAgIFwiYWdlbnRcIjpcIkJcIixcbiAgICAgICAgICAgXCJvdGhlcl9hZ2VudFwiOlwiQVwiLFxuICAgICAgICAgICBcInJlc291cmNlX2lkXCI6XCJodHRwOi8vZXhhbXBsZS5jb20vUmVkZWNlbnRyYWxpemF0aW9uX29mX3RoZV9XZWJcIixcbiAgICAgICAgICAgXCJ0cnVzdF92YWx1ZVwiOlwiMC4yNVwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgXCJkYXRlX3RpbWVcIjpcIjIwMjItMDUtMDUgMTQ6MjM6NDU6NjM5NTk0XCIsXG4gICAgICAgICAgIFwiYWdlbnRcIjpcIkJcIixcbiAgICAgICAgICAgXCJvdGhlcl9hZ2VudFwiOlwiQVwiLFxuICAgICAgICAgICBcInJlc291cmNlX2lkXCI6XCJodHRwOi8vZXhhbXBsZS5jb20vV2ViX29mX1RoaW5nc1wiLFxuICAgICAgICAgICBcInRydXN0X3ZhbHVlXCI6XCIwLjVcIlxuICAgICAgICB9XG4gICAgXVxuICAgfTtcbiIsImltcG9ydCB7IGNvbG9ycyB9IGZyb20gJy4vY29sb3JzJztcbmltcG9ydCB7IHNhbXBsZXMgfSBmcm9tICcuL2RhdGFzYW1wbGUnO1xuXG5leHBvcnQgY29uc3Qgbm9kZXMgPSBbXTtcbmV4cG9ydCBjb25zdCBsaW5rcyA9IFtdO1xuXG5jb25zdCBNQUlOX05PREVfU0laRSA9IDQwO1xuY29uc3QgQ0hJTERfTk9ERV9TSVpFID0gMTU7XG5jb25zdCBMRUFGX05PREVfU0laRSA9IDU7XG5jb25zdCBERUZBVUxUX0RJU1RBTkNFID0gMjA7XG5jb25zdCBNQUlOX05PREVfRElTVEFOQ0UgPSA5MDtcbmNvbnN0IExFQUZfTk9ERV9ESVNUQU5DRSA9IDMwO1xuZXhwb3J0IGNvbnN0IE1BTllfQk9EWV9TVFJFTkdUSCA9IC0yMDtcblxubGV0IGkgPSAwO1xuXG5jb25zdCBhZGRNYWluTm9kZSA9IChub2RlKSA9PiB7XG4gIG5vZGUuc2l6ZSA9IE1BSU5fTk9ERV9TSVpFO1xuICBub2RlLmNvbG9yID0gY29sb3JzW2krK11bMV07XG4gIG5vZGVzLnB1c2gobm9kZSk7XG59O1xuXG5jb25zdCBhZGRDaGlsZE5vZGUgPSAoXG4gIHBhcmVudE5vZGUsXG4gIGNoaWxkTm9kZSxcbiAgc2l6ZSA9IENISUxEX05PREVfU0laRSxcbiAgZGlzdGFuY2UgPSBERUZBVUxUX0RJU1RBTkNFXG4pID0+IHtcbiAgY2hpbGROb2RlLnNpemUgPSBzaXplO1xuICBjaGlsZE5vZGUuY29sb3IgPSBwYXJlbnROb2RlLmNvbG9yO1xuICBub2Rlcy5wdXNoKGNoaWxkTm9kZSk7XG4gIGxpbmtzLnB1c2goe1xuICAgIHNvdXJjZTogcGFyZW50Tm9kZSxcbiAgICB0YXJnZXQ6IGNoaWxkTm9kZSxcbiAgICBkaXN0YW5jZSxcbiAgICBjb2xvcjogcGFyZW50Tm9kZS5jb2xvcixcbiAgfSk7XG59O1xuXG5jb25zdCBhc3NlbWJsZUNoaWxkTm9kZSA9IChwYXJlbnROb2RlLCBpZCwgYWRkbm9kZSwgcmVzbykgPT4ge1xuICAgIGNvbnN0IGNoaWxkTm9kZSA9IHsgaWQgfTtcbiAgICBhZGRDaGlsZE5vZGUocGFyZW50Tm9kZSwgY2hpbGROb2RlKTtcbiAgICBjb25zdCBhZ2VudHMgPSBzYW1wbGVzLmFnZW50c19sb2dbYWRkbm9kZV07XG4gIFxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2FtcGxlcy5hZ2VudHNfbG9nW2FkZG5vZGVdLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZihhZ2VudHNbaV0ub3RoZXJfYWdlbnQgPT09IHBhcmVudE5vZGUuaWQgJiYgYWdlbnRzW2ldLnJlc291cmNlX2lkID09PSByZXNvKXtcbiAgICAgICAgYWRkQ2hpbGROb2RlKGNoaWxkTm9kZSwgeyBpZDogJycgfSwgTEVBRl9OT0RFX1NJWkUsIExFQUZfTk9ERV9ESVNUQU5DRSk7XG4gICAgICB9XG4gICAgICBjb250aW51ZTtcbiAgICB9XG59O1xuXG5jb25zdCBjb25uZWN0TWFpbk5vZGVzID0gKHNvdXJjZSwgdGFyZ2V0KSA9PiB7XG4gIGxpbmtzLnB1c2goe1xuICAgIHNvdXJjZSxcbiAgICB0YXJnZXQsXG4gICAgZGlzdGFuY2U6IE1BSU5fTk9ERV9ESVNUQU5DRSxcbiAgICBjb2xvcjogc291cmNlLmNvbG9yXG4gIH0pO1xufTtcblxuY29uc3QgYWxsYWdlbnRzID0gT2JqZWN0LmtleXMoc2FtcGxlcy5hZ2VudHNfbG9nKTtcblxubGV0IGNhc3RwID0gW107XG5hbGxhZ2VudHMuZm9yRWFjaCgoZWxlbWVudCwgaW5kZXgpID0+IHsgICAgXG4gIGNhc3RwW2luZGV4XSA9IHsgaWQ6IGVsZW1lbnQgfTtcbiAgYWRkTWFpbk5vZGUoY2FzdHBbaW5kZXhdKTtcbn0pO1xuXG5mb3IgKGxldCBpID0gMDsgaSA8IHNhbXBsZXMudHJ1c3RMb2dEaWN0Lmxlbmd0aDsgaSsrKSB7XG4gIFxuICBjb25zdCBmaXJzdCA9IGNhc3RwLmZpbmRJbmRleChlbGVtZW50ID0+IGVsZW1lbnQuaWQgPT09IHNhbXBsZXMudHJ1c3RMb2dEaWN0W2ldLmFnZW50KTtcbiAgY29uc3Qgc2Vjb25kID0gY2FzdHAuZmluZEluZGV4KGVsZW1lbnQgPT4gZWxlbWVudC5pZCA9PT0gc2FtcGxlcy50cnVzdExvZ0RpY3RbaV0ub3RoZXJfYWdlbnQpO1xuICBcbiAgY29ubmVjdE1haW5Ob2RlcyhjYXN0cFtmaXJzdF0sIGNhc3RwW3NlY29uZF0pOyAvLyBpZiBhZ2VudCBiICwgYW5kIG90aGVyIGFnZW50IGEsIHRoZW4gZmluZCB3aG8ncyBpZCBpcyBzYW1lXG4gIFxuICBsZXQgc3RyID0gc2FtcGxlcy50cnVzdExvZ0RpY3RbaV0ucmVzb3VyY2VfaWQ7XG4gIGFzc2VtYmxlQ2hpbGROb2RlKGNhc3RwW3NlY29uZF0sIHN0ci5jaGFyQXQoMCksY2FzdHBbZmlyc3RdLmlkLCBzdHIpO1xufSIsImltcG9ydCB7XG4gIHNlbGVjdCxcbiAgZm9yY2VTaW11bGF0aW9uLFxuICBmb3JjZU1hbnlCb2R5LFxuICBmb3JjZUxpbmssXG4gIGZvcmNlQ2VudGVyLFxuICBkcmFnLFxufSBmcm9tICdkMyc7XG5cbmltcG9ydCB7IG5vZGVzLCBsaW5rcywgTUFOWV9CT0RZX1NUUkVOR1RIIH0gZnJvbSAnLi9kYXRhJztcblxuY29uc3Qgc3ZnID0gc2VsZWN0KCcjY29udGFpbmVyJyk7XG5jb25zdCB3aWR0aCA9ICtzdmcuYXR0cignd2lkdGgnKTtcbmNvbnN0IGhlaWdodCA9ICtzdmcuYXR0cignaGVpZ2h0Jyk7XG5jb25zdCBjZW50ZXJYID0gd2lkdGggLyAyO1xuY29uc3QgY2VudGVyWSA9IGhlaWdodCAvIDI7XG5cbmNvbnN0IHNpbXVsYXRpb24gPSBmb3JjZVNpbXVsYXRpb24obm9kZXMpXG4gIC5mb3JjZSgnY2hhcmdlJywgZm9yY2VNYW55Qm9keSgpLnN0cmVuZ3RoKE1BTllfQk9EWV9TVFJFTkdUSCkpXG4gIC5mb3JjZShcbiAgICAnbGluaycsXG4gICAgZm9yY2VMaW5rKGxpbmtzKS5kaXN0YW5jZSgobGluaykgPT4gbGluay5kaXN0YW5jZSlcbiAgKVxuICAuZm9yY2UoJ2NlbnRlcicsIGZvcmNlQ2VudGVyKGNlbnRlclgsIGNlbnRlclkpKTtcblxuY29uc3QgZHJhZ0ludGVyYWN0aW9uID0gZHJhZygpLm9uKCdkcmFnJywgKGV2ZW50LCBub2RlKSA9PiB7XG4gIG5vZGUuZnggPSBldmVudC54O1xuICBub2RlLmZ5ID0gZXZlbnQueTtcbiAgc2ltdWxhdGlvbi5hbHBoYSgxKTtcbiAgc2ltdWxhdGlvbi5yZXN0YXJ0KCk7XG59KTtcblxuXG5jb25zdCBsaW5lcyA9IHN2Z1xuICAuc2VsZWN0QWxsKCdsaW5lJylcbiAgLmRhdGEobGlua3MpXG4gIC5lbnRlcigpXG4gIC5hcHBlbmQoJ2xpbmUnKVxuICAuYXR0cignc3Ryb2tlJywgKGxpbmspID0+IGxpbmsuY29sb3IgfHwgJ2JsYWNrJyk7XG5cblxuY29uc3QgY2lyY2xlcyA9IHN2Z1xuICAuc2VsZWN0QWxsKCdjaXJjbGUnKVxuICAuZGF0YShub2RlcylcbiAgLmVudGVyKClcbiAgLmFwcGVuZCgnY2lyY2xlJylcbiAgLmF0dHIoJ2ZpbGwnLCAobm9kZSkgPT4gbm9kZS5jb2xvciB8fCAnZ3JheScpXG4gIC5hdHRyKCdyJywgKG5vZGUpID0+IG5vZGUuc2l6ZSlcbiAgLmNhbGwoZHJhZ0ludGVyYWN0aW9uKTtcblxuY29uc3QgdGV4dCA9IHN2Z1xuICAuc2VsZWN0QWxsKCd0ZXh0JylcbiAgLmRhdGEobm9kZXMpXG4gIC5lbnRlcigpXG4gIC5hcHBlbmQoJ3RleHQnKVxuICAuYXR0cigndGV4dC1hbmNob3InLCAnbWlkZGxlJylcbiAgLmF0dHIoJ2FsaWdubWVudC1iYXNlbGluZScsICdtaWRkbGUnKVxuICAuc3R5bGUoJ3BvaW50ZXItZXZlbnRzJywgJ25vbmUnKVxuICAudGV4dCgobm9kZSkgPT4gbm9kZS5pZCk7XG5cbnNpbXVsYXRpb24ub24oJ3RpY2snLCAoKSA9PiB7XG4gIGNpcmNsZXMuYXR0cignY3gnLCAobm9kZSkgPT4gbm9kZS54KS5hdHRyKCdjeScsIChub2RlKSA9PiBub2RlLnkpO1xuICB0ZXh0LmF0dHIoJ3gnLCAobm9kZSkgPT4gbm9kZS54KS5hdHRyKCd5JywgKG5vZGUpID0+IG5vZGUueSk7XG5cbiAgbGluZXNcbiAgICAuYXR0cigneDEnLCAobGluaykgPT4gbGluay5zb3VyY2UueClcbiAgICAuYXR0cigneTEnLCAobGluaykgPT4gbGluay5zb3VyY2UueSlcbiAgICAuYXR0cigneDInLCAobGluaykgPT4gbGluay50YXJnZXQueClcbiAgICAuYXR0cigneTInLCAobGluaykgPT4gbGluay50YXJnZXQueSk7XG59KTtcbiJdLCJuYW1lcyI6WyJzZWxlY3QiLCJmb3JjZVNpbXVsYXRpb24iLCJmb3JjZU1hbnlCb2R5IiwiZm9yY2VMaW5rIiwiZm9yY2VDZW50ZXIiLCJkcmFnIl0sIm1hcHBpbmdzIjoiOzs7RUFBQTtFQUNPLE1BQU0sTUFBTSxHQUFHO0VBQ3RCLEVBQUUsQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDO0VBQ3pELEVBQUUsQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDO0VBQ3pELEVBQUUsQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDO0VBQ3pELEVBQUUsQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVB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RUFBRTtFQUNWLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQztFQUNuQixHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLEtBQUssSUFBSSxNQUFNLENBQUM7RUFDL0MsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUM7RUFDakMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7QUFDekI7RUFDQSxNQUFNLElBQUksR0FBRyxHQUFHO0VBQ2hCLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQztFQUNwQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7RUFDZCxHQUFHLEtBQUssRUFBRTtFQUNWLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztFQUNqQixHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUUsUUFBUSxDQUFDO0VBQ2hDLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixFQUFFLFFBQVEsQ0FBQztFQUN2QyxHQUFHLEtBQUssQ0FBQyxnQkFBZ0IsRUFBRSxNQUFNLENBQUM7RUFDbEMsR0FBRyxJQUFJLENBQUMsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQzNCO0VBQ0EsVUFBVSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsTUFBTTtFQUM1QixFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwRSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMvRDtFQUNBLEVBQUUsS0FBSztFQUNQLEtBQUssSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztFQUN4QyxLQUFLLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7RUFDeEMsS0FBSyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0VBQ3hDLEtBQUssSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3pDLENBQUMsQ0FBQzs7OzsifQ==
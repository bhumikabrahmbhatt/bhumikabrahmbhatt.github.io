import { colors } from './colors';
import { samples } from './samples';

export const nodes = [];
export const links = [];

const MAIN_NODE_SIZE = 40;
const CHILD_NODE_SIZE = 15;
const LEAF_NODE_SIZE = 5;
const DEFAULT_DISTANCE = 20;
const MAIN_NODE_DISTANCE = 90;
const LEAF_NODE_DISTANCE = 30;
export const MANY_BODY_STRENGTH = -20;

let i = 0;

const addMainNode = (node) => {
  node.size = MAIN_NODE_SIZE;
  node.color = colors[i++][0];
  nodes.push(node);
};

const addChildNode = (
  parentNode,
  childNode,
  selectagent,
  size = CHILD_NODE_SIZE,
  distance = DEFAULT_DISTANCE
) => {
  childNode.size = size;
  childNode.color = parentNode.color;
  childNode.selectedagent = selectagent;
  nodes.push(childNode);
  links.push({
    source: parentNode,
    target: childNode,
    distance,
    color: parentNode.color,
  });
};

const assembleChildNode = (parentNode, id, addnode, reso, selectagent) => { 
  const childNode = { id };
  addChildNode(parentNode, childNode, selectagent);

  const agents = samples.agents_log[addnode];
  for (let i = 0; i < samples.agents_log[addnode].length; i++) {
    if(agents[i].other_agent === parentNode.id && agents[i].resource_id === reso){
      addChildNode(childNode, { id: '' }, agents[i], LEAF_NODE_SIZE , LEAF_NODE_DISTANCE);
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

  connectMainNodes(castp[first], castp[second]);

  let str = samples.trustLogDict[i].resource_id;
  let pp = samples.trustLogDict[i];
  assembleChildNode(castp[second], str.charAt(0),castp[first].id, str, pp);
}
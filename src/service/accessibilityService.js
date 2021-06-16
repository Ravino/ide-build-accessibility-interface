const jsonCycle = require('json-cycle');


const htmlTagService = require('./htmlTagService');
const roleService = require('./roleService');
const ariaService = require('./ariaService');


class AccessibilityService {

  constructor() {
    this.htmlTagService = htmlTagService;
    this.roleService = roleService;
    this.ariaService = ariaService;

    this.accessibilityTree = {};
  }


  treeToGraph(domTree) {}


  puckGraphString() {
    const graphString = jsonCycle.stringify(this.accessibilityTree);
    return graphString;
  }
}


module.exports = AccessibilityService;

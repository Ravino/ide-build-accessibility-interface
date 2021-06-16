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


  treeToGraph(domTree) {

    let result = true;
    try {
      this.accessibilityTree = jsonCycle.parse(jsonCycle.stringify(domTree));
    }
    catch(err) {
      console.log(err);
      result = false;
    }


    return result;
  }


  puckGraphString() {
    let graphString = false;
    try {
      graphString = jsonCycle.stringify(this.accessibilityTree);
    }
    catch(err) {
      console.log(err);
      graphString = false;
    }


    return graphString;
  }
}


module.exports = AccessibilityService;

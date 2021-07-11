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


  async validator(node) {

    if(node.type !== 'tag') {
      return undefined;
    }


    node.accessibility = false;
    const accessTag = await this.htmlTagService.getByNameField('name', node.name);
    console.log(accessTag);
    if(!accessTag) {
      node.accessibility = false;
      return undefined;
    }


    if(!node.attribs.role) {
      node.accessibility = true;
      return undefined;
    }


    const accessRole = await this.roleService.getByNameField('name', node.attribs.role || '');
    if(!accessRole) {
      node.accessibility = false;
      return undefined;
    }


    node.accessibility = true;
    return undefined;
  }


  async check(node = this.accessibilityTree[1]) {

    await this.validator(node);


    if(!node.children) {
      return undefined;
    }


    for(let i = 0; i < node.children.length; i++) {
      await this.check(node.children[i]);
    }



    return undefined;
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

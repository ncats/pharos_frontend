export class PantherClass{
  name: string;
  pcid: string;
  children: PantherClass[] = [];
  parents: string[] = [];

  listMap: Map<string, string[]> = new Map<string, string[]>();

  getPaths(): string[][]{
    const ret = [];
    this.calculateMap();
    for (let key of this.listMap.keys()) {
      ret.push(this.listMap.get(key));
    }
    return ret;
  }

  calculateMap(node: PantherClass = this, path: string[] = [], pathId: string = "-"){
    path.push(node.name);
    if(node.children.length === 0){
      this.listMap.set(pathId, path);
      return;
    }
    for(let i = 0 ; i < node.children.length ; i++){
      this.calculateMap(node.children[i], path.slice(), pathId + i.toString());
    }
  }

  static traslateFromJson(json: {name: string, pcid: string, parents: string[]}[]) : PantherClass[]{
    const pcObjects: PantherClass[] = [];

    json.forEach(pc => {
      const pcObj = new PantherClass();
      pcObj.name = pc.name;
      pcObj.pcid = pc.pcid;
      pcObj.parents = pc.parents;
      pcObjects.push(pcObj);
    });

    pcObjects.forEach(pc => {
      pc.parents.forEach(parent => {
          const pObj = pcObjects.find(pcParent => {
            return pcParent.pcid === parent
          });
          if (pObj) {
            pObj.children.push(pc);
          }else{
            const pObj = new PantherClass();
            pObj.pcid = parent;
            pObj.name = '...';
            pObj.children.push(pc);
            pcObjects.push(pObj);
          }
        }
      );
    });

    return pcObjects.filter(pc => pc.parents.length === 0);
  }
}


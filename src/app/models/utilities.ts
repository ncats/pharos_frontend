export class Helper {
  static parseAssociatedStructure(structureString: string): {ligandSmiles?: string, structureSearchType?: string} {
    const ret: {ligandSmiles?: string, structureSearchType?: string} = {};
    const pieces = structureString.split('!');
    if (pieces.length > 1) {
      pieces.forEach(p => {
        if (p.toLowerCase().substr(0, 3) !== 'sub' && p.toLowerCase().substr(0, 3) !== 'sim') {
          ret.ligandSmiles = p;
        } else {
          ret.structureSearchType = p.toLowerCase().substr(0, 3);
        }
      });
    } else {
      ret.ligandSmiles = structureString;
    }
    return ret;
  }
}

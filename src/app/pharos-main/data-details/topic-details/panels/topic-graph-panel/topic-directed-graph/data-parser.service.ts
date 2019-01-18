import { Injectable } from '@angular/core';
import {from, Observable, of} from "rxjs/index";
import {map, zipAll} from "rxjs/operators";
import {LinkService} from "../../../../../../tools/force-directed-graph/force-directed-graph/graph-component/services/event-tracking/link.service";
import {HttpClient} from "@angular/common/http";
import {GraphDataService} from "../../../../../../tools/force-directed-graph/force-directed-graph/graph-component/services/graph-data.service";
import {mergeAll} from "rxjs/internal/operators";
import {Link} from "../../../../../../tools/force-directed-graph/force-directed-graph/graph-component/models/link";
import {environment} from "../../../../../../../environments/environment.prod";
import {TargetNode} from "../../../../../../models/target-node";
import {DataParserInterface} from "../../../../../../tools/force-directed-graph/interfaces/data-parser-interface";
import {PharosNodeService} from "./pharos-node.service";

interface FileData {
  origin: string;
  data: any;
}

const DATAFILES = '../assets/data/topic-test.json';



@Injectable({
  providedIn: 'root'
})
export class DataParserService implements DataParserInterface {

  dataMap: Map<string, any> = new Map<string, any>();

  constructor(
    private _http: HttpClient,
    private nodeService: PharosNodeService,
    private linkService: LinkService,
    private graphDataService: GraphDataService
  ) {
    console.log(this);
  }



  private _fetchFile(url: string) {
    return this._http.get<any[]>(DATAFILES).subscribe(res => console.log(res));
  }

  LoadData(): any {
    return this._http.get<any[]>(DATAFILES).subscribe(res => this._parseData(res));

   /* return from(DATAFILES.map(file => {
      const fileData: FileData = {origin: file.origin, data: this._fetchFile(file.url)};
      return fileData;
    })).pipe(
      map(res => {
        return res.data.pipe(
          map(response => {
            const data: FileData = {origin: res.origin, data: response};
            return this._parseData(data);
          })
        );
      }),
      zipAll()
    )/!*.subscribe(res => {
      console.log(res);
      return this.dataMap;
    });*!/*/
  }

  _parseData(data: any) {
    console.log(data);
  /*  const nodeObs = of(data.content.map(group => {
      const n: TargetNode = this.nodeService.makeNode(group.target.id, group.target);
     /!* if (node.position) {
        n.x = node.position.x;
        n.y = node.position.y;
      }*!/
      // n.origin = data.origin;
      this.nodeService.setNode(n);
      return n;
    }));

    const circles = [];
    const linkObs = of(data.data.elements.edges.map(edge => {
     /!* const names = edge.data.name.split(' ');
      const source: Protein = this.nodeService.getById(names[0].trim()) as Protein;
      const target: Protein = this.nodeService.getById(names[2].trim()) as Protein;
      if (source.gene !== target.gene) {
        const l = this.linkService.makeLink(edge.data.id, source, target, {properties: edge.data});
        this.linkService.setLink(l);
        return l;*!/
      }
    }));


    const zipped: Observable<any> = from([nodeObs, linkObs]).pipe(zipAll());

    return zipped.subscribe(res => {
      this.dataMap.set(data.origin, {
        nodes: res[0],
        links: res[1].filter(link => link != undefined)
      });
      this.graphDataService.clearGraph();*/
      return data;
   // })

  }


  getData(): Map<string,any> {
    return this.dataMap;
  }
}

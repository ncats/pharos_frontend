import { Component, OnInit } from '@angular/core';
import {DynamicPanelComponent} from '../../../../../tools/dynamic-panel/dynamic-panel.component';
import {takeUntil} from "rxjs/operators";
import * as d3 from 'd3';
import {from} from "rxjs";
import {PharosProperty} from "../../../../../models/pharos-property";


@Component({
  selector: 'pharos-idg-resources-panel',
  templateUrl: './idg-resources-panel.component.html',
  styleUrls: ['./idg-resources-panel.component.scss']
})
export class IdgResourcesPanelComponent extends DynamicPanelComponent implements OnInit {
  fields: PharosProperty[] = [
    new PharosProperty({
      name: 'id',
      label: 'ID',
      externalLink: true
    }),
    new PharosProperty({
      name: 'type',
      label: 'Resource Type',
    }),
    new PharosProperty({
      name: 'description',
      label: 'Description',
    }),
    new PharosProperty({
      name: 'source',
      label: 'Source',
    })
  ];


  species: string[];
  tableArr: any[] = [];

  constructor() {
    super();
  }

  ngOnInit() {
    this._data
    // listen to data as long as term is undefined or null
    // Unsubscribe once term has value
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(x => {
        if (Object.values(this.data).length > 0) {
          this.ngUnsubscribe.next();
          this.tableArr = this.data;
          // this.setterFunction();
        }
      });
    this.mockData();
  }

  getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }

  mockData() {
    const r = this.getRandomInt(0, 5);
    const dat = [];
    from(d3.csv("./assets/antibody.csv")
      .then(data => {
        return data;
      })).subscribe(res => {
      console.log(res);
      console.log(r);
      const antibody = res[r];
      console.log(antibody);
      const id = new PharosProperty({
        term: antibody.ID,
        href: antibody.href, // todo: remove when this is standardized
        //  externalHref: 'targets?facet=' + facet.label.replace( / /g, '+') + '/'+facet.term.replace(/ /g, '+')
      });
      //   count: new Property({intval: 0}),

      const type = new PharosProperty({
        term: 'antibody'
      })

      const description = new PharosProperty({
        term: antibody.host + ' / ' + antibody.clone_ID + ' / ' + antibody.isotype,
      })

      const source = new PharosProperty({
        term: 'order antibody',
        externalHref: 'https://www.antibodiesinc.com/products/navbeta3-na-channel-n396-29'
      });

      this.tableArr.push({id: id, type: type, description: description, source: source});
    });
  }
}


/*
ID: "AB4"
applications: "WB"
clone_ID: "N8B/1"
host: "mouse"
isotype: "IgG1"
target_gene_symbol: "Cacnb2"
target_species: "Mouse"
validation_ID: "valid18"
*/

import {Component, Input, OnInit} from '@angular/core';
import {Target} from "../../../../../models/target";
import {EnvironmentVariablesService} from "../../../../../pharos-services/environment-variables.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'pharos-target-card',
  templateUrl: './target-card.component.html',
  styleUrls: ['./target-card.component.css']
})
export class TargetCardComponent implements OnInit {
  @Input() target?: Target;
  _apiUrl: string;
  knowledge: any;

  constructor(private http: HttpClient,
              private environmentVariablesService: EnvironmentVariablesService) {
    this._apiUrl = this.environmentVariablesService.getRadarPath();

  }

  ngOnInit() {
    if(this.target){
      this.http.get(`${this._apiUrl}${this.target.accession}`).subscribe( res => this.knowledge = res);
    }

  }

}

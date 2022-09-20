import {Component, Input, OnInit} from '@angular/core';
import {DataVersionInfo} from "../../models/dataVersion";
import {TourType} from "../../models/tour-type";

@Component({
  selector: 'pharos-component-header',
  templateUrl: './component-header.component.html',
  styleUrls: ['./component-header.component.scss']
})
export class ComponentHeaderComponent implements OnInit {
  @Input() description: string;
  @Input() field: string;
  @Input() headerText: string;
  @Input() dataVersions: DataVersionInfo[];
  @Input() tourType: TourType;
  @Input() tourTypeVisible = () => true;
  @Input() predictionDetails: any[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}

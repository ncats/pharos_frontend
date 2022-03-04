import {TourType} from './tour-type';

export class UseCaseStep {

}
export class Paragraph extends UseCaseStep {
  text: string;
  constructor(text: string) {
    super();
    this.text = text;
  }
}
export class Task extends UseCaseStep {
  title: string;
  tourType; TourType;
  constructor(title: string, tourName: TourType) {
    super();
    this.title = title;
    this.tourType = tourName;
  }
}

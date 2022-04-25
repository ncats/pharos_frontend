import {TourType} from './tour-type';

export class UseCaseStep {
  exampleText: string;
  link: string;
  constructor(exampleText: string, link: string) {
    this.exampleText = exampleText;
    this.link = link;
  }
}
export class Paragraph extends UseCaseStep {
  text: string;
  constructor(text: string, exampleText?: string, link?: string) {
    super(exampleText, link);
    this.text = text;
  }
}
export class Task extends UseCaseStep {
  title: string;
  tourType; TourType;
  constructor(title: string, tourName: TourType, exampleText?: string, link?: string) {
    super(exampleText, link);
    this.title = title;
    this.tourType = tourName;
  }
}

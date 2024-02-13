import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef, Inject,
  OnDestroy,
  OnInit, PLATFORM_ID,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {TourService} from '../pharos-services/tour.service';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {TourType} from '../models/tour-type';
import {UseCaseData} from './use-case-data';
import {Paragraph, Task} from '../models/use-case-step';
import {CdkScrollable, CdkVirtualScrollViewport, ScrollDispatcher} from '@angular/cdk/scrolling';
import {Subscription} from 'rxjs';
import {CommonModule, isPlatformBrowser, Location} from '@angular/common';
import {UnfurlingMetaService} from '../pharos-services/unfurling-meta.service';
import {JsonldService} from '../pharos-services/jsonld.service';
import {Title} from '@angular/platform-browser';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatCardModule} from '@angular/material/card';
import {MatNavList} from '@angular/material/list';
import {TaskItemComponent} from '../tools/task-item/task-item.component';

@Component({
  standalone: true,
  imports: [CommonModule, FlexLayoutModule, MatCardModule, MatNavList, TaskItemComponent, CdkScrollable],
  selector: 'pharos-use-cases',
  templateUrl: './use-cases.component.html',
  styleUrls: ['./use-cases.component.scss']
})
export class UseCasesComponent implements OnInit, OnDestroy, AfterViewInit {

  constructor(
    private tourService: TourService,
    private router: Router,
    private _route: ActivatedRoute,
    private location: Location,
    private scrollDispatcher: ScrollDispatcher,
    private changeDetector: ChangeDetectorRef,
    private metaService: UnfurlingMetaService,
    private jsonlsService: JsonldService,
    private titleService: Title,
    @Inject(PLATFORM_ID) private platformID: any
  ) { }
  dbSubscription: Subscription;
  activeElement: string;
  clicking = false;
  UseCaseData = UseCaseData;

  @ViewChildren('scrollSection') scrollSections: QueryList<ElementRef>;
  @ViewChild('usecasediv', {static: true}) useCaseDiv: ElementRef;
  @ViewChild(CdkVirtualScrollViewport) viewPort: CdkVirtualScrollViewport;
  useCases: UseCaseData[];

  TourType = TourType;

  isParagraph(obj) {
    return obj instanceof Paragraph;
  }
  isTask(obj) {
    return obj instanceof Task;
  }

  ngOnInit(): void {
    this.useCases = UseCaseData.getUseCases();
    const linkedUseCase = this.useCases.find(c => c.anchor === this._route.snapshot.paramMap?.get('id'));
    this.activeElement = linkedUseCase?.anchor;
    if (linkedUseCase) {
      this.jsonlsService.insertSchema(this.jsonlsService.usecaseSchema(linkedUseCase.anchor), 'structured-data-usecase');
      this.metaService.setMetaData(
        {
          title: 'Pharos Use Case: ' + linkedUseCase.title,
          description: linkedUseCase.blurb
        }
      );
    } else {
      this.metaService.setMetaData(
        {
          title: 'Pharos Use Cases',
          description: UseCaseData.getDescription()
        }
      );
    }
    this.dbSubscription = this.scrollDispatcher.scrolled()
      .subscribe((data: CdkScrollable) => {
        if (data && !this.clicking) {
          const element = data.getElementRef().nativeElement;
          let scrollTop: number = element.scrollTop;
          const clientHeight: number = element.clientHeight;
          if (element.scrollTop === 0) {
            this.updateUrl('');
          } else if (Math.abs(scrollTop + clientHeight - element.scrollHeight) < 5) {
            this.updateUrl(this.useCases[this.useCases.length - 1].anchor);
          }
          else {
            let goodSection = this.scrollSections.first;
            this.scrollSections.forEach(section => {
              if (scrollTop >= 0) {
                goodSection = section;
              }
              const paddingAndMargins = 52;
              scrollTop = scrollTop - section.nativeElement.scrollHeight - paddingAndMargins;
            });
            this.updateUrl(goodSection.nativeElement.id);
          }
          this.changeDetector.detectChanges();
        }
      });
  }

  ngAfterViewInit() {
    const usecase = this._route.snapshot.paramMap?.get('id');
    if (usecase) {
      this.scroll(usecase);
    }
  }

  ngOnDestroy(): void {
    if (this.dbSubscription) {
      this.dbSubscription.unsubscribe();
    }
  }

  startTutorial(tutorial: string) {
    if (tutorial === 'FindRelatedTargets') {
      const navigationExtras: NavigationExtras = {
        queryParams: {
          tutorial
        }
      };
      this.router.navigate(['/targets/gpr20'], navigationExtras);
      return;
    }
    if (tutorial === 'StructureSearchTour') {
      const navigationExtras: NavigationExtras = {
        queryParams: {
          tutorial
        }
      };
      this.router.navigate(['/structure'], navigationExtras);
      return;
    }
    this.tourService.runTutorial(tutorial);
  }

  updateUrl(anchor) {
    if (anchor !== this.activeElement) {
      this.activeElement = anchor;
      const url = this.router.createUrlTree(['usecases', anchor]).toString();
      this.location.go(url);
      if (anchor) {
        const selectedCase = UseCaseData.getUseCases().find(c => c.anchor === anchor);
        this.titleService.setTitle('Pharos : Use Cases - ' + selectedCase.title);
      } else {
        this.titleService.setTitle('Pharos : Use Cases');
      }
    }
    this.clicking = false;
  }

  scroll(anchor) {
    if (isPlatformBrowser(this.platformID)) {
      const section = this.scrollSections.find(section => section.nativeElement.id === anchor);
      const y = this.useCaseDiv.nativeElement.scrollTop + section.nativeElement.getBoundingClientRect().y - 100;
      this.useCaseDiv.nativeElement.scrollTo({top: y});
      this.clicking = true;
      this.updateUrl(anchor);
    }
  }

  isActive(check: string): boolean {
    return this.activeElement === check;
  }
}

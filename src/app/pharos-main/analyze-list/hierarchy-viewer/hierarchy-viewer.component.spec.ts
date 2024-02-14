import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HierarchyViewerComponent} from './hierarchy-viewer.component';
import {ActivatedRoute} from "@angular/router";
import {MOCKACTIVATEDROUTE} from "../../../../../test/mock-activate-route";
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ApolloTestingModule} from 'apollo-angular/testing';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {FIRESTORESTUB} from '../../../../../test/firestore-stub';
import {AngularFireModule} from '@angular/fire/compat';
import {COMMON_CONFIG} from '../../../../../test/test-config';

describe('HierarchyViewerComponent', () => {
    let component: HierarchyViewerComponent;
    let fixture: ComponentFixture<HierarchyViewerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                ApolloTestingModule,
                AngularFireModule.initializeApp(COMMON_CONFIG),
            ],
            providers: [
                {provide: ActivatedRoute, useValue: MOCKACTIVATEDROUTE},
                {provide: AngularFirestore, useValue: FIRESTORESTUB}
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HierarchyViewerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

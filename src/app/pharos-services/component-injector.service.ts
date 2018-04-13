import {ComponentFactoryResolver, Injectable, Injector, Type} from "@angular/core";
import {EnvironmentVariablesService} from "./environment-variables.service";

@Injectable()
export class ComponentInjectorService {
  constructor(private _componentFactoryResolver: ComponentFactoryResolver,
              private _injector: Injector) {
  }

  injectComponent(componentHost: any, componentInstance: Type<any>): Type<any> {
    const componentFactory = this._componentFactoryResolver.resolveComponentFactory(componentInstance);
    const viewContainerRef = componentHost.viewContainerRef;
    viewContainerRef.clear();
    return viewContainerRef.createComponent(componentFactory);
  }

  appendComponent(componentHost: any, componentInstance: Type<any>): Type<any> {
    const componentFactory = this._componentFactoryResolver.resolveComponentFactory(componentInstance);
    const viewContainerRef = componentHost.viewContainerRef;
    return viewContainerRef.createComponent(componentFactory);
  }

  getComponentToken(componentHost: any, token: any): Type<any> {
    return this._injector.get(token);
  }

}

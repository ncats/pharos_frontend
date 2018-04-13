import {ComponentFactoryResolver, Injectable, InjectionToken, Injector, Type} from '@angular/core';

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

  getComponentToken(componentHost: any, token: InjectionToken<any>): Type<any> {
    return this._injector.get<Type<any>>(token);
  }

}

import {ComponentFactoryResolver, Injectable, InjectionToken, Injector, Type} from '@angular/core';

/**
 * dynamically inject a component into an element host
 */
@Injectable()

export class ComponentInjectorService {

  /**
   * initialize services
   * @param {ComponentFactoryResolver} _componentFactoryResolver
   * @param {Injector} _injector
   */
  constructor(private _componentFactoryResolver: ComponentFactoryResolver,
              private _injector: Injector) {}

  /**
   * created component instance,
   * clears component host view container
   * creates component inside container
   * used for refreshing data or new data
   * @param componentHost
   * @param {Type<any>} componentInstance
   * @returns {Type<any>}
   */
  injectComponent(componentHost: any, componentInstance: Type<any>): Type<any> {
    const componentFactory = this._componentFactoryResolver.resolveComponentFactory(componentInstance);
    const viewContainerRef = componentHost.viewContainerRef;
    viewContainerRef.clear();
    return viewContainerRef.createComponent(componentFactory);
  }

  /**
   * created component instance,
   * does no clear component host view container
   * adds component to whatever is inside container
   * used for iterating over lists of components
   * @param componentHost
   * @param {Type<any>} componentInstance
   * @returns {Type<any>}
   */
  appendComponent(componentHost: any, componentInstance: Type<any>): Type<any> {
    const componentFactory = this._componentFactoryResolver.resolveComponentFactory(componentInstance);
    const viewContainerRef = componentHost.viewContainerRef;
    return viewContainerRef.createComponent(componentFactory);
  }

  /**
   * return the component token, which is then passed to the next functions
   * todo: could probably just happen internally instead of round tripping the token
   * @param {InjectionToken<any>} token
   * @returns {Type<any>}
   */
  getComponentToken(token: InjectionToken<any>): Type<any> {
    return this._injector.get<Type<any>>(token);
  }

}

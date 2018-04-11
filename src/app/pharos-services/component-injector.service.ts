import {ComponentFactoryResolver, Injectable, Type} from "@angular/core";
import {EnvironmentVariablesService} from "./environment-variables.service";

@Injectable()
export class ComponentInjectorService {
  constructor(private _componentFactoryResolver: ComponentFactoryResolver/*,
              private _environmentVariablesService: EnvironmentVariablesService*/) {
  }

/*  addDynamicComponent(componentHost: any, path: string[]): any {
    const component = this._environmentVariablesService.getComponents(path[0], path[1]);
    const instance: Type<any> = component;
    const componentFactory = this._componentFactoryResolver.resolveComponentFactory(instance);
    const viewContainerRef = componentHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
    return componentRef;
  }*/

  injectComponent(componentHost: any, componentInstance:Type<any>): Type<any> {
    const componentFactory = this._componentFactoryResolver.resolveComponentFactory(componentInstance);
    const viewContainerRef = componentHost.viewContainerRef;
    viewContainerRef.clear();
    return viewContainerRef.createComponent(componentFactory);
  }
}


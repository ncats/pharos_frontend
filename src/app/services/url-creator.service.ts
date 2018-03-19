import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment.prod";

const URL = environment.apiUrl;

@Injectable()
export class UrlCreatorService {

  constructor() { }


}

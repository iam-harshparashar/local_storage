import { Injectable } from '@angular/core';
import { FirstComponent } from './first/first.component';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public data:any = JSON.parse(localStorage.getItem('formData')) || [];
  index: number = this.data.length;

  constructor() {}

  addFormData(data: any) {
    data['Id']=this.index;
    this.index+=1;
    this.data.push(data);
    localStorage.setItem('formData', JSON.stringify(this.data));
    return this.data;
  }

  addFullData(data: any) {
    localStorage.clear()
    localStorage.setItem('formData', JSON.stringify(data))
  }
  
  OnDelete(data: any) {
    for(let i = 0; i < this.data.length; ++i)
    {
      if (this.data[i].Id === data.Id) {
          this.data.splice(i, 1);
      }
    }
    localStorage.setItem('formData', JSON.stringify(this.data));
    return this.data;
  }
}

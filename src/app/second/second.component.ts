import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import { DataService } from '../data.service';
import { FirstComponent } from '../first/first.component';

@Component({
  providers:[ FirstComponent ],
  selector: 'app-second',
  templateUrl: './second.component.html',
  styleUrls: ['./second.component.css'],
})
export class SecondComponent implements OnInit {
  tempData: any=this.service.data[0];
  data: any = this.service.data;
  @Output() updateForm = new EventEmitter();
  @ViewChild(FirstComponent) firstComponent: FirstComponent;
  OnDelete(user: any){
    this.service.OnDelete(user);
  }

  showForm(data:any){
    this.tempData=data;
    this.updateForm.emit(data);
  }

  constructor( private service: DataService) { }

  ngOnInit(): void {
  }

}

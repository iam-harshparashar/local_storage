import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Validators, FormControl, FormGroup, FormArray } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.css']
})
export class FirstComponent implements OnInit {
  reactiveForm!:FormGroup;
  msg:boolean;
  data: any = this.service.data;
  tempData: any;  
  dataFromSecondCOmponent: any;
  submitButton: string = "Submit";
  onSubmit(){
    if(this.dataFromSecondCOmponent){
      this.data = this.data.forEach((elem: any) => {  
        // console.log(this.dataFromSecondCOmponent.Id, elem.Id);
        
      if(this.dataFromSecondCOmponent.Id === elem.Id){
          elem.FirstName =  this.reactiveForm.value.FirstName,
          elem.MiddleName = this.reactiveForm.value.MiddleName,
          elem.LastName = this.reactiveForm.value.LastName,
          elem.PhoneNumber =  this.reactiveForm.value.PhoneNumber,
          elem.EmailId = this.reactiveForm.value.EmailId,
        console.log(elem);
        return elem
      }
    })
    this.service.addFullData(this.service.data);
    
    this.reactiveForm.reset()
    this.submitButton="Submit";
  } else {
    this.service.addFormData(this.reactiveForm.value);
    this.msg=true;
    this.reactiveForm.reset();
  }
    this.dataFromSecondCOmponent = undefined
  }
  clearLocalStorage(){
    this.reactiveForm.reset();
  }
  ngOnInit(): void {
    this.initForm();
  }
  private initForm(){
    this.reactiveForm =new FormGroup ({
      'Id': new FormControl(''),
      'FirstName': new FormControl('',[ Validators.required,Validators.pattern("^[a-zA-Z]*$")]),
      'MiddleName': new FormControl('',[Validators.pattern("^[a-zA-Z]*$")]),
      'LastName': new FormControl('',[ Validators.required,Validators.pattern("^[a-zA-Z]*$")]),
      'PhoneNumber': new FormControl('',[ Validators.required,Validators.pattern("^[0-9]*$"),Validators.minLength(10),Validators.maxLength(10)]),
      'EmailId': new FormControl('',[ Validators.required,Validators.pattern('^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$')])
      })
    }

  onClear(){
    this.reactiveForm.reset();
  }

  showForm(data: any){
    //console.log(data);
    this.submitButton="Update";
    this.dataFromSecondCOmponent = data
    this.data.forEach((elem: any) => {
      if(data.Id === elem.Id){
        this.reactiveForm.patchValue({
          Id: elem.Id,
          FirstName: elem.FirstName,
          MiddleName: elem.MiddleName,
          LastName: elem.LastName,
          PhoneNumber: elem.PhoneNumber,
          EmailId:elem.EmailId,
        });
      }
    })
  }
  updateFormDataUI(event: any) {    
    this.showForm(event)
  }
  constructor(private service:DataService) { }
}

import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  bankInformationForm!: FormGroup;
  
  constructor (private formBuilder: FormBuilder) {}
  ngOnInit(): void {
     this.initializeForm();
  }
private initializeForm():void {
  this.bankInformationForm = this.formBuilder.group({
      bankCode: ["", Validators.required],
      bankAccountNumber: ["", Validators.required]
  });
 }
}
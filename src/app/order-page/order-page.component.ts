import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-order-page',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,

  ],
  templateUrl: './order-page.component.html',
  styleUrl: './order-page.component.css'
})
export class OrderPageComponent{

  selectedDate: Date | undefined;
  hideSave: boolean = false
  canAddAnotherREQ = false
  secondDetail: boolean = false

  registration: FormGroup;
  clientName = ['Client 1', 'Client 2'];
  jobTitles = ['Job 1', 'Job 2'];
  currencies = ['USD', 'EUR', 'INR'];
  selectedValue: string = this.jobTitles[0];

  constructor(private fb: FormBuilder) {

    this.registration = this.fb.group({
      clientName: [null, [Validators.required]],
      PurchaseOrderType: [null, [Validators.required]],
      num: [null, [Validators.required]],
      rec: [null, [Validators.required]],
      recfrom: [null, [Validators.required]],
      eml: [null, [Validators.required, Validators.email]],
      pos: [null, [Validators.required]],
      poe: [null, [Validators.required]],
      bud: [null, [Validators.required]],
      jobTitle: [null, [Validators.required]],
      jobid: [null, [Validators.required]],
      curr: [null, [Validators.required]],
      talentDetails: this.fb.array([this.createTalentDetail()]),
      checkbox1: [false],
      checkbox2: [false]

    });
  }

  saveDetail() {
    this.registration.disable()
    this.hideSave = true
  }

  resetDetail() {
    this.registration.reset()
    this.hideSave = false
    this.registration.enable()

  }

  removeForm(index: number) {
    this.talentDetails.removeAt(index);
  }

  onPOTypeChange() {
    const poType = this.registration.get('PurchaseOrderType')?.value;
    console.log(poType)
    if (poType === 'Group PO') {
      this.canAddAnotherREQ = true
      this.secondDetail = true
    } else {
      this.canAddAnotherREQ = false
      this.secondDetail = false
    }
  }

  getTalents(index: number): string[] {
    return ['Client Name'];
  }


  get talentDetails(): FormArray {
    return this.registration.get('talentDetails') as FormArray;
  }

  createTalentDetail(): FormGroup {
    return this.fb.group({
      jobTitle: ['', Validators.required],
      jobid: [{ value: '', disabled: true }],
      talents: this.fb.array([])
    });
  }


  onTalentCheckboxChange(event: any, index: number): void {
    const talents = this.talentDetails.at(index).get('talents') as FormArray;
    if (event.target.checked) {
      talents.push(this.fb.control(''));
    } else {
      const i = talents.controls.findIndex(x => x.value === event.target.value);
      talents.removeAt(i);
    }
  }

  isTalentSelected(talent: string, index: number): boolean {
    const talents = this.talentDetails.at(index).get('talents') as FormArray;
    return talents.controls.some(x => x.value === talent);
  }

  onJobTitleChange(index: number): void {
    const talentDetail = this.talentDetails.at(index);
    console.log(talentDetail)
    const jobTitles = talentDetail.get('jobTitle')?.value;
    talentDetail.get('jobid')?.setValue(jobTitles ? 'REQ-' + jobTitles : '');
    console.log(talentDetail.get('jobid'))
  }

  addAnotherREQ(): void {
    this.talentDetails.push(this.createTalentDetail());
  }

  onSubmit() {
    console.log(this.registration.value)
  }
}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountryService } from '../../services/country.service';
import { Region } from '../../interfaces/country.inteface';

@Component({
  templateUrl: './selector-page.component.html'
})
export class SelectorPageComponent {

  public myForm: FormGroup = this.fb.group({
    region: [ '', [ Validators.required ]],
    country: [ '', [ Validators.required ]],
    borders: [ '', [ Validators.required ]],
  })

  constructor(
    private fb: FormBuilder,
    private cs: CountryService
  ){}

  get regions(): Region[]{
    return this.cs.regions;
  }


}

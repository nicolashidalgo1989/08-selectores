import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountryService } from '../../services/country.service';
import { Country, Region, SmallCountry } from '../../interfaces/country.inteface';
import { filter, switchMap, tap } from 'rxjs';

@Component({
  templateUrl: './selector-page.component.html'
})
export class SelectorPageComponent implements OnInit {

  public countriesByRegion: SmallCountry[] = []; 
  public bordersByCountry: SmallCountry[] = []; 

  public myForm: FormGroup = this.fb.group({
    region: [ '', [ Validators.required ]],
    country: [ '', [ Validators.required ]],
    borders: [ '', [ Validators.required ]],
  })

  constructor(
    private fb: FormBuilder,
    private cs: CountryService
  ){}

  ngOnInit(): void {

    this.onRegionChanged();
    this.onCountryChanged();

  }

  get regions(): Region[]{
    return this.cs.regions;
  }

  onRegionChanged(): void {
    this.myForm.get('region')!.valueChanges
      .pipe(
        tap( () => this.myForm.get('country')!.setValue('') ),
        tap( () => this.bordersByCountry = [] ),
        switchMap( region => this.cs.getCountriesByRegion(region) ),
      )
      .subscribe( countries => {
        this.countriesByRegion = countries;
      })
  }

  onCountryChanged():void{
    this.myForm.get('country')!.valueChanges
    .pipe(
      tap( () => this.myForm.get('borders')!.setValue('') ),
      filter( (value:string) => value.length > 0 ),
      switchMap( alphacode => this.cs.getCountriesByAlphaCode(alphacode) ), 
      switchMap( country => this.cs.getCountryBordersByCodes(country.borders) ), 
    )
    .subscribe( countries => { 
      this.bordersByCountry = countries;
    })
  }

}

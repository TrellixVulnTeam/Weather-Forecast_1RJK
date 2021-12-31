import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import countries from '../../../assets/countries.json'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  weatherForm!: FormGroup;
  weatherData: any = [];
  ferenheitTemp: any;
  countries: Array<any> = [];
  weather_icons: Array<any> = [];
  errorMssge: boolean = false;

  countryName: any;
  country: any;

  public d = new Date();
  day: any;
  today: any;
  todayDate: any;
  todayTime: any;

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.prepareForm();
    this.getDay();

    this.countries = countries;
    this.todayDate = this.d.getDate();
    this.todayTime = (this.d.getHours());
  }
  
  getDay(){
    this.day = this.d.getDay();
    if(this.day === 1){
      this.today = "Monday";
    } else if(this.day === 2) {
      this.today = "Tuesday";
    } else if(this.day === 3) {
      this.today = "Wednesday";
    } else if(this.day === 4) {
      this.today = "Thursday";
    } else if(this.day === 5) {
      this.today = "Friday";
    } else if(this.day === 6) {
      this.today = "Saturday";
    } else {
      this.today = "Sunday";
    }
  }

  prepareForm(){
    this.weatherForm = new FormGroup({
      countryName: new FormControl('',Validators.required)
    })
  }

  selectedCountry(){
    this.country = this.countryName.name;
    console.log(this.countryName)
 }

  getWeatherDetails(){
    const { countryName } = this.weatherForm.getRawValue();
    console.log("🚀 ~ file: dashboard.component.ts ~ line 42 ~ DashboardComponent ~ getWeatherDetails ~ countryName", this.country)

    this.apiService.getWeatherDetails(this.country).subscribe(response => {
      this.weatherData = response;
      console.log("🚀 ~ file: dashboard.component.ts ~ line 78 ~ DashboardComponent ~ this.apiService.getWeatherDetails ~ this.weatherData", this.weatherData)
      if(this.weatherData.success === false){
        this.errorMssge = true;
      } else {
        if(this.weatherData){
          this.ferenheitTemp = Math.round((((this.weatherData.current.temperature) * (9/5)) + 32)*100)/100;
          this.errorMssge = false;
        }
      }
    })
  }

}

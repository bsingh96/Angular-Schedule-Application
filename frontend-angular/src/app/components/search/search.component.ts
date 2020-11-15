import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http'
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  mainUrl = 'http://www.localhost:3000'
  storage: any[];
  constructor(private http: HttpClient){

  }

  getSubjects() : void {
    var div = document.getElementById("show");
    div.innerHTML = "";
    var courseCode = (<HTMLInputElement>document.getElementById("courseID")).value;
    var courseNum = (<HTMLInputElement>document.getElementById("courseNumber")).value;
    var courseComp = (<HTMLInputElement>document.getElementById("courseComp")).value
    console.log(courseCode);
    console.log(courseNum + " " + courseComp);
    var link = "/api/courses?"+ "course=" + courseCode +"&courseNum=" + courseNum+ "&courseComponent=" + courseComp;

    this.http.get<any>(this.mainUrl + link).subscribe((data: any) => {
      //console.log(data);
      this.storage = data;
      //console.log(this.storage);
    })
  }
  
  title = 'Lab 4';

  ngOnInit(){
    this.http.get<any>(this.mainUrl + '/api/courses/subject').subscribe(data => {
      //console.log(data);

    var select = document.getElementById("courseID");
    for(let i=0;i<data.length; i++){
        var newOptions = document.createElement('option');
        var optionTexts = document.createTextNode(data[i]);
        newOptions.appendChild(optionTexts);
        select.appendChild(newOptions);
    }
    })
  }

}

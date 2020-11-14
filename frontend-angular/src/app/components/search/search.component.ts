import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http'
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  mainUrl = 'http://www.localhost:3000'
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

    this.http.get<any>(this.mainUrl + link).subscribe(data => {
      if(courseCode == "all_subjects" && courseNum == ""){
        //alert("Unable to display your search results as it exceeds 200 courses. Please refine your search.");
        var header = document.createElement("H2");
        div.setAttribute("class","newdiv1");
        var text = document.createTextNode("Unable to display your search results as it exceeds 100 courses. Please refine your search.");
        header.appendChild(text);
        div.appendChild(header);
        }else if(courseCode !="all_subjects" && courseNum == "" && courseComp != "all_components" ){
          for (let i = 0; i < data.length; i++) {
              div.setAttribute("class","newdiv1")
              var title = document.createElement("H1");
              var description = document.createTextNode(data[i].subject + " " + data[i].catalog_nbr + " : " + data[i].className);
              title.appendChild(description);
              div.appendChild(title);
      
              var information = document.createElement("P");
              var text = document.createTextNode("Course Description: "+data[i].catalog_description);
              information.appendChild(text);
              div.appendChild(information);
              
              var table = document.createElement("table");   
              table.setAttribute("class","table2");
              var heading = table.createTHead();     
              // adding a row for each
              var row_0 = heading.insertRow(0);
              var cell1 = row_0.insertCell(0);
              var cell2 = row_0.insertCell(1);
              var cell3 = row_0.insertCell(2);
              var cell4 = row_0.insertCell(3);
              var cell5 = row_0.insertCell(4);
              var cell6 = row_0.insertCell(5);
              var cell7 = row_0.insertCell(6);
              var cell8 = row_0.insertCell(7);
              var cell9 = row_0.insertCell(8);
  
              
              // appending title of each cell 
              var info = document.createTextNode("Section");
              cell1.appendChild(info);
              var info = document.createTextNode("Component");
              cell2.appendChild(info);
              var info = document.createTextNode("Class Number");
              cell3.appendChild(info);
              var info = document.createTextNode("Days");
              cell4.appendChild(info);
              var info = document.createTextNode("Start Time");
              cell5.appendChild(info);
              var info = document.createTextNode("End Time");
              cell6.appendChild(info);
              var info = document.createTextNode("Campus");
              cell7.appendChild(info);
              var info = document.createTextNode("Instructor");
              cell8.appendChild(info);
              var info = document.createTextNode("Status");
              cell9.appendChild(info);  
  
              // adding a new row for the course information based on 
              var row_1 = table.insertRow(1);
              var cell1 = row_1.insertCell(0);
              var cell2 = row_1.insertCell(1);        
              var cell3 = row_1.insertCell(2);
              var cell4 = row_1.insertCell(3);
              var cell5 = row_1.insertCell(4);
              var cell6 = row_1.insertCell(5);
              var cell7 = row_1.insertCell(6);
              var cell8 = row_1.insertCell(7);
              var cell9 = row_1.insertCell(8);
              if(data[i].course_info[0].ssr_component == "LEC"){
                  cell2.setAttribute("class", "lec")
              }else if(data[i].course_info[0].ssr_component == "TUT"){
                  cell2.setAttribute("class", "tut")
              }else{
                  cell2.setAttribute("class", "lab")
              }
              var info = document.createTextNode(data[i].course_info[0].class_section);
              cell1.appendChild(info);
              var info = document.createTextNode(data[i].course_info[0].ssr_component);
              cell2.appendChild(info);
              cell2.id = data[i].course_info[0].ssr_component;           
              var info = document.createTextNode(data[i].course_info[0].class_nbr);
              cell3.appendChild(info);
              var info = document.createTextNode(data[i].course_info[0].days);
              cell4.appendChild(info);
              var info = document.createTextNode(data[i].course_info[0].start_time);
              cell5.appendChild(info);
              var info = document.createTextNode(data[i].course_info[0].end_time);
              cell6.appendChild(info);
              var info = document.createTextNode(data[i].course_info[0].campus);
              cell7.appendChild(info);
              var info = document.createTextNode(data[i].course_info[0].instructors);
              cell8.appendChild(info);
              var info = document.createTextNode(data[i].course_info[0].enrl_stat);
              cell9.appendChild(info); 
              div.appendChild(table);
          }
      
      
  } 
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

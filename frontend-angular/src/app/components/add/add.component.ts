import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  mainUrl = 'http://www.localhost:3000'
  constructor(private http: HttpClient){

  }
  courses: any[];
  showResults1() : void {
    var div = document.getElementById("show12");
    div.innerHTML = "";
    var courseCode = (<HTMLInputElement>document.getElementById("courseID")).value;
    var courseNum = (<HTMLInputElement>document.getElementById("courseNumber")).value;
    var courseComp = (<HTMLInputElement>document.getElementById("courseComp")).value;
    if(courseCode == "all_subjects" && courseNum == ""){
      //alert("Unable to display your search results as it exceeds 200 courses. Please refine your search.");
      var header = document.createElement("H2");
      div.setAttribute("class","newdiv11");
      var text = document.createTextNode("Unable to display your search results as it exceeds 100 courses. Please refine your search.");
      header.appendChild(text);
      div.appendChild(header);
      return;
      }
    console.log(courseCode);
    console.log(courseNum + " " + courseComp);
    var link = "/api/courses?"+ "course=" + courseCode +"&courseNum=" + courseNum+ "&courseComponent=" + courseComp;

    this.http.get<any>(this.mainUrl + link).subscribe((data: any) => {
      //console.log(data);
      this.courses = data;
      console.log(this.courses);
    })
  }
  // function to validate input from textbox and adding the schedule to the database
  addSchedule() : void{
    const regex = /^[^<>:/?#@!&;]*$/;
    var userInput = (<HTMLInputElement>document.getElementById("scheduleName")).value;
    var input = document.getElementById("scheduleName");
    if(!userInput.match(regex)){
      alert("Invalid Input!");
      window.location.reload();
    return;
    }
    var inputLink = "/api/schedules?"+ "ScheduleName="+userInput;
    
    this.http.put<any>(this.mainUrl+inputLink,userInput).subscribe(()=>{
    });
    
       
   // console.log("added"+userInput)
    alert("Schedule Sucessfully Added !");
    window.location.reload();
  }
  addCourse(course_subject:String,button_id:String,coursename:String){
    var buttonid= button_id;
    var schedule = (<HTMLInputElement>document.getElementById("Schedulenaming")).value;
    var link = "/api/schedule/savedCourse?"+"Schedulenaming="+schedule+"&course_subject="+course_subject+"&button_id="+button_id+"&name="+coursename;
    console.log(link);
    this.http.put<any>(this.mainUrl + link , schedule).subscribe(() => {
     alert("Added " +course_subject+" "+ button_id + " : " + coursename + " to "+ schedule);

    })
    //alert("added");
  }
  ngOnInit(): void {
    
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
    this.http.get<any>(this.mainUrl + '/api/schedule/saved').subscribe(data => {
      //console.log(data);

      var select = document.getElementById("Schedulenaming");
      for(let i=0;i<data.length;i++){
          var newOptions = document.createElement('option');
        //  newOptions.setAttribute("value",result[i].scheduleName);
          var optionTexts = document.createTextNode(data[i].scheduleName);
          newOptions.appendChild(optionTexts);
          select.appendChild(newOptions);
      }
    })
  }
  /*
  showResults():void {
    
    this.http.get<any>(this.mainUrl + link).subscribe(data => {
      if(courseCode == "all_subjects" && courseNum == ""){
        //alert("Unable to display your search results as it exceeds 200 courses. Please refine your search.");
        var header = document.createElement("H2");
        div.setAttribute("class","newdiv1");
        var text = document.createTextNode("Unable to display your search results as it exceeds 100 courses. Please refine your search.");
        header.appendChild(text);
        div.appendChild(header);
        }
      
      
  
    })
  }*/
}


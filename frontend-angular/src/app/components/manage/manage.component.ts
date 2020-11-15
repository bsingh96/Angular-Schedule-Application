import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http'
@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  mainUrl = 'http://www.localhost:3000'
  constructor(private http: HttpClient){
  }
  courses: any[];
  deleteAll() : void {
    var schedule = (<HTMLInputElement>document.getElementById("Schedulenaming")).value;
    console.log(schedule);
    if(schedule == ""){
     alert("There are no schedules available to delete.");
     return;
   }
    this.http.delete<any>(this.mainUrl + '/api/schedule/deleteAll').subscribe(data =>{
      if(data.alert == "sucessfully deleted."){
      alert("Sucessfully deleted all schedules.");
      window.location.reload();
    }else{
        alert("All schedules could not be deleted.");
    }
    })
  }

  deleteSchedule() :void{
 var schedule = (<HTMLInputElement>document.getElementById("Schedulenaming")).value;
 if(schedule == ""){
  alert("There are no schedules available to delete.");
  return;
}
 var link = "/api/schedule/savedCourse/delete?"+"Schedulenaming="+schedule;
 this.http.delete<any>(this.mainUrl + link).subscribe(data =>{
  if(data.alert == "sucessfully deleted."){
  alert("This schedule was sucesfully deleted. ");
  window.location.reload();
}else{
alert("This schedule could not be deleted. Try again.")
}

 })
  
  }
  
  loadSchedule(){
    var div = document.getElementById("show2");
    div.innerHTML = "";
    var div2 = document.getElementById("newDiv43")
    var tag = document.getElementById("titletag");
    var info = document.getElementById("infotag");
    var schedule = (<HTMLInputElement>document.getElementById("Schedulenaming")).value;
    var request = "/api/schedule/find/schedule?"+"scheduleName="+schedule;
    this.http.get<any>(this.mainUrl + request).subscribe(data => {
      console.log(data.alert);
      if(data.length>0){
      this.courses = data;
      console.log(this.courses);
      //div2.setAttribute("class","newdiv13")
      //var x1 = document.createElement("H1");
      var x2 = document.createTextNode(schedule);
      var x4 = document.createTextNode("Displaying " + data.length +" course(s)")
      //var x5 = document.createElement("p");
      tag.appendChild(x2);
      info.appendChild(x4)
      div2.appendChild(x1);
    
    
      }else if(data.alert =="No courses found."){
        div.setAttribute("class","newdiv13")
        var x1 = document.createElement("H1");
        var x2 = document.createTextNode("Courses Not Found!")
        x1.appendChild(x2);
        div.appendChild(x1);
      }

      
    })
  }

  ngOnInit(): void {
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
}

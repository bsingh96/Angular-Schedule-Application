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
  loadSchedules() : void {
    //var div = document.getElementById("show2");
    //div.innerHTML = "";
    //div.setAttribute("class","newdiv13");
    var div = document.getElementById("show2");
    div.innerHTML = "";
    div.setAttribute("class","newdiv13");
    var schedule = (<HTMLInputElement>document.getElementById("Schedulenaming")).value;
    var request = "/api/schedule/find/schedule?"+"scheduleName="+schedule;
    this.http.get<any>(this.mainUrl + request).subscribe(data =>{
    alert(JSON.stringify(data));
    
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

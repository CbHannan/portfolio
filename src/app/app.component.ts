import { Component, HostListener, ElementRef, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  model: any = {};


  constructor(public el: ElementRef, private http: Http) {

  }
  ngOnInit() {
    let audioPlayer = <HTMLVideoElement>document.getElementById('myVideo');


    var isPlaying = audioPlayer.currentTime > 0 && !audioPlayer.paused && !audioPlayer.ended
      && audioPlayer.readyState > 2;

    if (!isPlaying) {
      audioPlayer.play();
    }
  }
  scrollToContact() {
    var contact = document.getElementById('boxThree');
    contact.scrollIntoView({
      block: 'end',
      behavior: 'smooth'
    });
  }
  scrollToTech() {
    var tech = document.getElementById('techCard');
    console.log("tech " + tech);
    tech.scrollIntoView({
      block: 'end',
      behavior: 'smooth'
    });
  }
  scrollToProjects() {
    var projects = document.getElementById('projectsCard');
    projects.scrollIntoView({
      block: 'end',
      behavior: 'smooth'
    });
  }
  scrollToTop() {
    var top = document.getElementById('boxOne');
    top.scrollIntoView({
      block: 'end',
      behavior: 'smooth'
    });
  }
  scrollToEducation() {
    var education = document.getElementById('educationCard');
    education.scrollIntoView({
      block: 'center',
      behavior: 'smooth'
    });
  }
  openForum() {
    var params = [
      'height=' + screen.height,
      'width=' + screen.width,
      'fullscreen=yes'
    ].join(',');


    var popup = window.open('https://agile-sierra-84612.herokuapp.com/home', 'popup_window', params);
    popup.moveTo(0, 0);
  }
  sendMessage() {
    console.log("received send message with name: " + this.model.name + " email: " + this.model.email + " message: " + this.model.message);

   


    this.http.post('/api/message', this.model).subscribe(data => {
      console.log(data);
      console.log("success");
      this.clearModel();
    }, error => {
        console.log("error");
      
    });
  }
  clearModel(){
    this.model.name = ' ';
    this.model.email = ' ';
    this.model.message = ' ';
  }
  @HostListener('window:scroll', [])
  checkScroll() {
    // var offsets = document.getElementById('projects').getBoundingClientRect();
    var top = document.getElementById('boxOne').offsetHeight;
    // var top = offsets.top;
    const scrollPosition = window.scrollY;
    var header = document.getElementById("jumbotron");
    var info = document.getElementById("routerWrap");
    var pIcon = document.getElementById("pIcon");
    var tIcon = document.getElementById("tIcon");
    var eIcon = document.getElementById("eIcon");
    var cIcon = document.getElementById("cIcon");

    var education = document.getElementById("education");
    var projects = document.getElementById("projects");
    var tech = document.getElementById("tech");
    var contactMe = document.getElementById("contactMe");

    var personalInfo = document.getElementById("personalInfo");
    var nameWrap = document.getElementById("nameWrap");
    var stickyName = document.getElementById("stickyName");
    var pCol = document.getElementById("pCol");
    var tCol = document.getElementById("tCol");
    var eCol = document.getElementById("eCol");
    var cCol = document.getElementById("cCol");

    var boxThreePos = document.getElementById("boxThree").getBoundingClientRect();
    var tPosition = document.getElementById('techCard').getBoundingClientRect();
    var ePosition = document.getElementById('educationCard').getBoundingClientRect();
    var pPosition = document.getElementById('projectsCard').getBoundingClientRect();
    var cPosition = document.getElementById('boxThree').getBoundingClientRect();


    if (scrollPosition >= 200) {
      header.classList.add("sticky");
      header.classList.add("w3-animate-top");
      header.classList.remove("w3-animate-opacity");
      eIcon.classList.remove("fa-3x");
      tIcon.classList.remove("fa-3x");
      pIcon.classList.remove("fa-3x");
      cIcon.classList.remove("fa-3x");

     
      contactMe.classList.remove("bgPanel");
      contactMe.classList.remove("text-white");

     

      eIcon.classList.add("noBottomMarg");
      tIcon.classList.add("noBottomMarg");
      pIcon.classList.add("noBottomMarg");
      cIcon.classList.add("noBottomMarg");

      eCol.classList.add("removeTransition");
      tCol.classList.add("removeTransition");
      pCol.classList.add("removeTransition");
      cCol.classList.add("removeTransition");

      education.classList.add("menuSmall");
      tech.classList.add("menuSmall");
      projects.classList.add("menuSmall");
      contactMe.classList.add("menuSmall");

      personalInfo.classList.remove("personalInfo");
      nameWrap.classList.add("noDisplay");
      nameWrap.classList.add("staticPosition");
      stickyName.classList.remove("noDisplay");

    } else {
      header.classList.remove("sticky");
      header.classList.remove("w3-animate-top");
      header.classList.add("w3-animate-opacity");
      eIcon.classList.add("fa-3x");
      tIcon.classList.add("fa-3x");
      pIcon.classList.add("fa-3x");
      cIcon.classList.add("fa-3x");

      
      contactMe.classList.add("bgPanel");
      contactMe.classList.add("text-white");


    

      eIcon.classList.remove("noBottomMarg");
      tIcon.classList.remove("noBottomMarg");
      pIcon.classList.remove("noBottomMarg");
      cIcon.classList.remove("noBottomMarg");

      eCol.classList.remove("removeTransition");
      tCol.classList.remove("removeTransition");
      pCol.classList.remove("removeTransition");
      cCol.classList.remove("removeTransition");

     

      education.classList.remove("menuSmall");
      tech.classList.remove("menuSmall");
      projects.classList.remove("menuSmall");
      contactMe.classList.remove("menuSmall");

      personalInfo.classList.add("personalInfo");
      nameWrap.classList.remove("noDisplay");
      nameWrap.classList.remove("staticPosition");
      stickyName.classList.add("noDisplay");
    }
    
    var ePo = (ePosition.top + window.scrollY - 80);
    var tPo = (tPosition.top + window.scrollY -80);
    var pPo = (pPosition.top + window.scrollY - 80);
    var cPo = (cPosition.top + window.scrollY - 80);

    var b3Po = (boxThreePos.top + window.scrollY)

    if (scrollPosition >= ePo && scrollPosition < tPo) {
      education.classList.add("textUnderline");     
    }
    else {
      education.classList.remove("textUnderline");   
    }
    if (scrollPosition >= tPo && scrollPosition < pPo) {
      tech.classList.add("textUnderline");
    }
    else {
      tech.classList.remove("textUnderline");
    }
    if (scrollPosition >= pPo && scrollPosition < b3Po) {
      projects.classList.add("textUnderline");
    }
    else {
      projects.classList.remove("textUnderline");
    }
    if (scrollPosition >= cPo) {
      contactMe.classList.add("textUnderline");
    }
    else {
      contactMe.classList.remove("textUnderline");
    }
  }
}

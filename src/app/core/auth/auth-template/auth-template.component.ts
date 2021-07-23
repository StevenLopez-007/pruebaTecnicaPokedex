import { Component, HostListener, Input, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { environment } from '../../../../environments/environment.prod';

@Component({
  selector: 'app-auth-template',
  templateUrl: './auth-template.component.html',
  styleUrls: ['./auth-template.component.css']
})
export class AuthTemplateComponent implements OnInit {
  @Input() linkSpan:string;
  @Input() nameSpan:string;
  nameApp:string = environment.name;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  @HostListener('window:onresize')
  breakpoint(){
    return window.innerWidth;
  }

  loginWithGoogle(){
    this.authService.loginWithGoogle();
  }

  loginWithFacebook(){
    this.authService.loginWithFacebook();
  }

}

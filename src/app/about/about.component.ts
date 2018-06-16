import { Component, OnInit } from '@angular/core';
// Gives access to the route parameters like /:id
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DataService } from '../data.service';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  goals: any;

  // Dependency injection happens within constructor()
  constructor(private route: ActivatedRoute, private router: Router, private _data: DataService) {
    this.route.params.subscribe(res => console.log(res.id));
  }

  ngOnInit() {
    this._data.goal.subscribe(res => this.goals = res);
  }

  // Callback that navigates to the home page
  sendMeHome() {
    this.router.navigate(['']);
  }

}

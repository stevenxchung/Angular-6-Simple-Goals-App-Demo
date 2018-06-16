import { Component, OnInit } from '@angular/core';
// Import animations
import {
  trigger,
  style,
  transition,
  animate,
  keyframes,
  query,
  stagger
} from '@angular/animations';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('goals', [
        transition('* => *', [
            query(':enter', style({ opacity: 0}), {optional: true}),

            // Animation when adding an element to the list
            query(':enter', stagger('300ms', [
              animate('.6s ease-in', keyframes([
                style({opacity: 0, transform: 'translateY(-75%)', offset: 0}),
                style({opacity: .5, transform: 'translateY(35px)', offset: .3}),
                style({opacity: 1, transform: 'translateY(0)', offset: 1}),

              ]))
            ]), {optional: true}),

            // Animation when removing an element from the list
            query(':leave', stagger('300ms', [
              animate('.6s ease-in', keyframes([
                style({opacity: 1, transform: 'translateY(0)', offset: 0}),
                style({opacity: .5, transform: 'translateY(35px)', offset: .3}),
                style({opacity: 0, transform: 'translateY(-75%)', offset: 1}),

              ]))
            ]), {optional: true})
        ])
    ])
  ]
})

export class HomeComponent implements OnInit {

  itemCount: number;
  btnText: string = 'Add an item';
  goalText: string = 'My first life goal';
  goals = [];

  // Create instances through dependency injection
  constructor(private _data: DataService) { }

  ngOnInit() {
    this.itemCount = this.goals.length;
    this._data.goal.subscribe(res => this.goals = res);
    this._data.changeGoal(this.goals);
  }

  // Add element to the list
  addItem() {
    this.goals.push(this.goalText);
    this.goalText = '';
    this.itemCount = this.goals.length;
    this._data.changeGoal(this.goals);
  }

  // Remove and item from the list
  removeItem(i) {
    this.goals.splice(i, 1);
    this._data.changeGoal(this.goals);
  }

}

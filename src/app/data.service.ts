import { Injectable } from '@angular/core';
// Allow data sharing between components
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable()

export class DataService {

  private goals = new BehaviorSubject<any>(['The initial goal', 'Another silly life goal']);
  goal = this.goals.asObservable();

  constructor() { }

  changeGoal(goal) {
    this.goals.next(goal)
  }

}

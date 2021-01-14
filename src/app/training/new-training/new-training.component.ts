import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import {  map } from 'rxjs/operators'
import { Observable,Subscription } from 'rxjs';
import { Exercise } from 'src/app/model/exercise.model';
import { TrainingService } from 'src/app/service/training.service';
import { UIService } from 'src/app/shared/ui.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
exercises: Exercise[];
private exerciseSubscription: Subscription;

  constructor(private trainingService: TrainingService, private uiService: UIService) { }

  isLoading = true;
  private loadingSubs: Subscription;

  ngOnInit(): void {
    this.loadingSubs = this.uiService.loadingStateChanged.subscribe(isloadingState=> {
      this.isLoading = isloadingState;
    })
    this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(exercies => (this.exercises = exercies));
   this.trainingService.fetchAvailableExercises();
  }
  onStartNewWorkout(form: NgForm){
    this.trainingService.startExercise(form.value.exercise);
  }
  ngOnDestroy(){
    this.exerciseSubscription.unsubscribe();
    this.loadingSubs.unsubscribe();
  }
}

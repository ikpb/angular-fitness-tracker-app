import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Exercise } from 'src/app/model/exercise.model';
import { TrainingService } from 'src/app/service/training.service';


@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
exercises: Exercise[]=[];
  constructor(private trainingService: TrainingService) { }

  ngOnInit(): void {
    this.exercises = this.trainingService.getAvailableExercises();;
  }
  onStartNewWorkout(form: NgForm){
    this.trainingService.startExercise(form.value.exercise);
  }
}

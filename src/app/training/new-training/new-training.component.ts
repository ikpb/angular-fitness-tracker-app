import { Component, OnInit, EventEmitter,Output } from '@angular/core';
import { Exercise } from 'src/app/model/exercise.model';
import { TrainingService } from 'src/app/service/training.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
@Output() workOutInProgress = new EventEmitter<void>();
exercises: Exercise[]=[];
  constructor(private trainingService: TrainingService) { }

  ngOnInit(): void {
    this.exercises = this.trainingService.getAvailableExercises();;
  }
  onStartNewWorkout(){
    this.workOutInProgress.emit();
  }
}

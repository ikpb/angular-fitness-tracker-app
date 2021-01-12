import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
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
  constructor(private trainingService: TrainingService, private db:AngularFirestore) { }

  ngOnInit(): void {
    this.db.collection('availableExercises').valueChanges().subscribe(result=>{
      console.log(result);
    })
  }
  onStartNewWorkout(form: NgForm){
    this.trainingService.startExercise(form.value.exercise);
  }
}

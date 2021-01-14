import { Exercise } from "../model/exercise.model";
import { Subject, Subscription } from "rxjs";
import { map } from 'rxjs/operators'
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from "@angular/core";
import { UIService } from 'src/app/shared/ui.service';


@Injectable()
export class TrainingService{
    exerciseChanged = new Subject<Exercise>();
    exercisesChanged = new Subject<Exercise[]>();
    finishedExercisesChanged = new Subject<Exercise[]>();
   private availableExercises: Exercise[] =[];
    private runningExercise: Exercise;
    private fbSubs: Subscription[]=[];

    constructor(private db:AngularFirestore, private uiService: UIService){}

    fetchAvailableExercises(){
        this.uiService.loadingStateChanged.next(true)
      this.fbSubs.push(this.db
        .collection('availableExercises')
        .snapshotChanges()
        .pipe(
          map(docArray =>{
            return docArray.map( doc =>{ 
              return {
                id: doc.payload.doc.id,
                name: doc.payload.doc.data()['name'],
                duration: doc.payload.doc.data()['duration'],
                calories: doc.payload.doc.data()['calories']
        };
      });
    })
    ).subscribe((exercises: Exercise[])=>{
        this.availableExercises = exercises;
        this.exercisesChanged.next([...this.availableExercises]);
        this.uiService.loadingStateChanged.next(false)
    })
      )}
    startExercise(selectedId: string){
        this.runningExercise = this.availableExercises.find(ex=> ex.id ===selectedId);
        this.exerciseChanged.next({...this.runningExercise});
    }

    completeExercise(){
        this.addDataToDatabase({...this.runningExercise, date: new Date(),state:'completed'})
        this.runningExercise = null;
        this.exerciseChanged.next(null);
    }
    cancelExercise(progress: number){
        this.addDataToDatabase({...this.runningExercise, 
            duration: this.runningExercise.duration*(progress/100),
            calories: this.runningExercise.calories*(progress/100),
            date: new Date(),
            state:'cancelled'});
        this.runningExercise = null;
        this.exerciseChanged.next(null);
    }
    getRunningExercise(){
        return{...this.runningExercise};
    }
    fetchPastExercies(){
        this.uiService.loadingStateChanged.next(true)
        this.fbSubs.push(this.db.collection('finishedExercises')
        .valueChanges()
        .subscribe((exercises: Exercise[])=> {
            this.finishedExercisesChanged.next(exercises);
            this.uiService.loadingStateChanged.next(true)
        }));
    }
    private addDataToDatabase(exercise: Exercise){
        this.db.collection('finishedExercises').add(exercise);
    }
    cancelSubscriptions(){
        this.fbSubs.forEach(sub=> sub.unsubscribe());
    }
}
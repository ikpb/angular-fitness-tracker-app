import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Exercise } from 'src/app/model/exercise.model';
import { TrainingService } from 'src/app/service/training.service';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit, AfterViewInit {
  displayedColumns =['date','name','duration','calories','state']
  dataSource = new MatTableDataSource<Exercise>();

  @ViewChild(MatSort) sort: MatSort;

  constructor(private trainingService: TrainingService) { }

  ngOnInit(): void {
    this.dataSource.data = this.trainingService.getPastExercies();
  }
  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
  }
  doFilter(filterValue:string){
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

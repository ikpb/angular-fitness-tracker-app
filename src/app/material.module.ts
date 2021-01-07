import { NgModule } from "@angular/core";
import { MatSliderModule } from '@angular/material/slider'
import { MatButtonModule } from '@angular/material/button'
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatIconModule} from '@angular/material/icon'
import {MatInputModule} from '@angular/material/input'
import {MatDatepickerModule} from '@angular/material/datepicker'
import {MatNativeDateModule} from '@angular/material/core'
import {MatCheckboxModule} from '@angular/material/checkbox'
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';




@NgModule({
    imports:[
        MatSliderModule, 
        MatButtonModule, 
        MatInputModule, 
        MatFormFieldModule, 
        MatIconModule, 
        MatDatepickerModule, 
        MatNativeDateModule, 
        MatCheckboxModule,
        MatSidenavModule,
        MatToolbarModule,
    MatListModule],
    exports:[
        MatSliderModule, 
        MatButtonModule, 
        MatInputModule, 
        MatFormFieldModule, 
        MatIconModule, 
        MatDatepickerModule, 
        MatNativeDateModule, 
        MatCheckboxModule,
        MatSidenavModule,
        MatToolbarModule,
    MatListModule]
})
export class MaterialModule{

}
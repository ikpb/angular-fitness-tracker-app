import { NgModule } from "@angular/core";
import { MatSliderModule } from '@angular/material/slider'
import { MatButtonModule } from '@angular/material/button'

@NgModule({
    imports:[MatSliderModule, MatButtonModule],
    exports:[MatSliderModule, MatButtonModule]
})
export class MaterialModule{

}
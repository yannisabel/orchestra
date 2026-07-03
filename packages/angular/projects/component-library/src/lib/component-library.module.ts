import { APP_INITIALIZER, NgModule } from "@angular/core"
import { defineCustomElements } from "@orchestra-kit/core/loader"

@NgModule({
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: () => defineCustomElements,
      multi: true,
    },
  ],
})
export class ComponentLibraryModule {}

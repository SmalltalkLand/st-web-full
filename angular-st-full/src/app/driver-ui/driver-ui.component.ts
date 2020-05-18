import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-driver-ui',
  templateUrl: './driver-ui.component.html',
  styleUrls: ['./driver-ui.component.scss']
})
export class DriverUiComponent implements OnInit {
  @ViewChild('myHead') myHead: TemplateRef<any>;
  private portalHostHead: DomPortalHost;
  private num: number;
  constructor(     private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private appRef: ApplicationRef,
    private viewContainerRef: ViewContainerRef) { }

  ngOnInit(): void {
    this.num = Math.random();
    this.portalHostHead = new DomPortalHost(
      document.querySelector('#ngHeadInsert'),
      this.componentFactoryResolver,
      this.appRef,
      this.injector
    );

    // Create a template portal
    const templatePortal = new TemplatePortal(
      this.myHead,
      this.viewContainerRef,
      );

    // Attach portal to host
    this.portalHostHead.attach(templatePortal);
  }
  onHalo(evt:any): void{


  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
declare let bootstrap: any;

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})

export class PopupComponent implements OnInit {

  // https://stackoverflow.com/questions/44053227/how-to-emit-an-event-from-parent-to-child

  @Input() show: Observable<string>;
  @Input() title: string = "wildCART";
  @Input() body: string = "";
  @Input() size: string = "";
  @Input() icon: string = "";
  @Output() close = new EventEmitter<Event>();

  private eventsSubscriptionShow: Subscription;

  myPopup: any;
  strMsg:string = "";

  constructor() { }

  ngOnInit() {
    this.eventsSubscriptionShow = this.show.subscribe((str:string) => this.showModal(str));
  }

  ngOnDestroy() {
    this.eventsSubscriptionShow.unsubscribe();
  }

  showModal = (str:string) => {
    this.strMsg = str;
    this.myPopup = new bootstrap.Modal(document.getElementById('myPopup'), {
      keyboard: false
    })
    var myPopupEl = document.getElementById('myPopup');
    myPopupEl.addEventListener('hidden.bs.modal', (event): void => {
      this.close.emit(event);
    })
    this.myPopup.show()
  }

}

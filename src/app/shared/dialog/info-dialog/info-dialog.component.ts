import { Component, OnInit, ElementRef, ViewChild, Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
declare var $;

@Component({
  selector: 'app-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.css']
})

export class InfoDialogComponent {

  title: String;
  message: String;

  constructor(private bsModalRef: BsModalRef) { }

  afterClosed(event) {

  }


}

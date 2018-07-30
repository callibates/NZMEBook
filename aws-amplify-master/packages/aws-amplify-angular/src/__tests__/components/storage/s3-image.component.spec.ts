import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { AmplifyService } from '../../../providers/amplify.service'
import { S3ImageComponent } from '../../../components/storage/s3-image.component'


describe('S3ImageComponent: ', () => {

  let component: S3ImageComponent;
  let service: AmplifyService;

  beforeEach(() => { 
    service = new AmplifyService();
    component = new S3ImageComponent(service);
  });

  afterEach(() => {
    service = null;
    component = null;
  });


  it('...should be created', () => {
    expect(component).toBeTruthy();
  });

});
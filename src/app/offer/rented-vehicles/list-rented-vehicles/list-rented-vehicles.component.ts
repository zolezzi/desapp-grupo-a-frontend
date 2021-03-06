import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UserResourceApiService } from '../../../shared/services/user-resource-api.service';
import { RentResourceApiService } from '../../../shared/services/rent-resource-api.service';
import { VehicleResourceApiService } from '../../../shared/services/vehicle-resource-api.service';
import { PublicationResourceApiService } from '../../../shared/services/publication-resource-api.service';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-list-rented-vehicles',
  templateUrl: './list-rented-vehicles.component.html',
  styleUrls: ['./list-rented-vehicles.component.scss']
})
export class ListRentedVehiclesComponent implements OnInit {

  rents:Array<any> = [];
  router:any;
  userCurrent: any = {};
  filter: any = {};

  constructor(protected route: ActivatedRoute, router:Router, protected userResourceApiService:UserResourceApiService,
    protected vehicleResourceApiService:VehicleResourceApiService, protected publicationResourceApiService:PublicationResourceApiService,
    protected localStorageService:LocalStorageService, protected rentResourceApiService:RentResourceApiService) { }

  ngOnInit() {

    this.userCurrent = this.localStorageService.retrieve('userCurrent');

    this.rentResourceApiService.findAllRentsByVehicleOwner(this.userCurrent.id).subscribe(results => {

      this.rents = results;

    });

  }

  findAll(){
    this.rentResourceApiService.findAllRentsByVehicleOwner(this.userCurrent.id).subscribe(results => {

      this.rents = results;

    });
  }

  confirm(rent:any){
    this.rentResourceApiService.confirmWithdraw(rent.id, this.userCurrent.id).subscribe(result => {
      this.findAll();
    });
  }

  delete(rent:any){
    this.rentResourceApiService.cancelRent(rent).subscribe(result => {
      this.findAll();
    });
  }

}

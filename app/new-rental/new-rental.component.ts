import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService, UserService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'new-rental.component.html'
})

export class NewRentalComponent {
	model: any = {};
	loading = false;

	constructor(
		private router: Router,
		private userService: UserService,
		private alertService: AlertService) { }

	addNewRental() {
		this.loading = true;
        this.userService.addRental(this.model)
        .subscribe(
            data => {
                this.alertService.success('Rental added successfully', true);
                this.router.navigate(['/']);
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
    }
}
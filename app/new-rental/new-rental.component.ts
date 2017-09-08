import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService, UserService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'new-rental.component.html'
})

export class NewRentalComponent {
    @ViewChild('fileInput') fileInput;

	model: any = {};
	loading = false;

	constructor(
		private router: Router,
		private userService: UserService,
		private alertService: AlertService) { }

	addNewRental() {
        let fileBrowser = this.fileInput.nativeElement;
        if (fileBrowser.files && fileBrowser.files[0]) {
    		this.loading = true;
            var reader = new FileReader();
            reader.onload =this._handleReaderLoaded.bind(this);
            reader.readAsBinaryString(fileBrowser.files[0]);
            this.userService.addRental(this.model)
            .subscribe(data => {
                this.alertService.success('Rental added successfully', true);
                this.router.navigate(['/']);
            }, error => {
                this.alertService.error(error);
                this.loading = false;
            });
        }else{
            this.alertService.error('Please select image');
        }
    }

  _handleReaderLoaded(readerEvt) {
     var binaryString = readerEvt.target.result;
        this.model['image'] = btoa(binaryString);
    }
}
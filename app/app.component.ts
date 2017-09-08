import { Component } from '@angular/core';
import { AuthenticationService } from './_services/index';
@Component({
    moduleId: module.id,
    selector: 'app',
    templateUrl: 'app.component.html'
})

export class AppComponent {
	auth = false;
	constructor(authService: AuthenticationService){
		if(localStorage.getItem('currentUser')) this.auth = true;
		authService.auth.subscribe(auth => console.log('auth ---> ', this.auth = auth;));
	}
}
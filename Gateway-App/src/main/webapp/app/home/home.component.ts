import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';

import {LoginModalService} from 'app/core/login/login-modal.service';
import {AccountService} from 'app/core/auth/account.service';
import {Account} from 'app/core/user/account.model';
import {faParking, faBook} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  account: Account | null = null;
  authSubscription?: Subscription;
  faParking = faParking;
  faBook = faBook;

  constructor(private accountService: AccountService, private loginModalService: LoginModalService) {
  }

  myFunc(): void {
    alert('function called');
  }

  ngOnInit(): void {
    this.authSubscription = this.accountService.getAuthenticationState().subscribe(account => (this.account = account));
  }

  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }

  login(): void {
    this.loginModalService.open();
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}

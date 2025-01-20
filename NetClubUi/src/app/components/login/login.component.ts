import { Component, Injectable, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { UserLogin, Email } from '../../shared/models/user.model';
import { AuthService } from '../../shared/services/auth.service';
import { USER_KEY } from '../../shared/contants/data-model';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CoreService } from '../../shared/services/core.service';
import Swal from 'sweetalert2';

@Injectable()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginUser: UserLogin = new UserLogin();
  welcomeMsg: any = null;
  loginError: string | null = null;
  emailmodel: Email = new Email();
  loginSuccess: boolean = false;

  constructor(private router: Router, private auth: AuthService, private route: ActivatedRoute, private coreService: CoreService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const email = params.get('email');
      if (email) {
        this.loginUser.email = email!;
        this.emailmodel.email = email;
        this.emailmodel.canEditEmail = false;
        this.auth.emailCheck.next(this.emailmodel);
      }
    });
    this.auth.emailObs$.subscribe((emailmodel: Email) => {
      this.emailmodel = emailmodel;
      this.loginUser.email = emailmodel.email;
    });
  }

  async LogIn(user: UserLogin) {
    this.coreService.isLoading.next(true);
    try {
      const msg: any = await this.auth.login(user).pipe(first()).toPromise();
      this.coreService.isLoading.next(false);
      this.welcomeMsg = msg;
      if (msg !== 'Invalid Password' && msg !== 'Invalid Userid') {
      //   Swal.fire({
      //     icon: 'success',
      //     title: 'You successfully logged in',
      //     html: "I will close in <b></b> seconds.",
      //     timer: 3 * 1000, // 30 seconds
      //     timerProgressBar: true,
      //     didOpen: () => {
      //       const b = Swal.getHtmlContainer()?.querySelector('b');
      //   if (b) {
      //     const interval = setInterval(() => {
      //       const timeLeft = Swal.getTimerLeft();
      //       if (timeLeft !== null && timeLeft !== undefined) {
      //         const secondsLeft = Math.ceil(timeLeft / 1000);
      //         b.textContent = secondsLeft.toString();
      //         if (secondsLeft <= 0) {
      //           clearInterval(interval);
      //         }
      //       }
      //     }, 1000);
      //   }
      // },
      // willClose: () => {
      //   this.router.navigate(['/home']);
      // }
      //   });
      } else {
        this.loginError = msg;
        Swal.fire('Oops...', 'Invalid email or password', 'error');
      }
    } catch (err: any) {
      this.coreService.isLoading.next(false);
      this.loginError = err.message || 'An error occurred.';
      Swal.fire('Oops...', 'Something went wrong, please try again', 'error');
    }
  }
}

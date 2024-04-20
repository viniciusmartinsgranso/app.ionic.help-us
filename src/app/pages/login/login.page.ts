import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginPayload } from '../../models/payloads/login.payload';
import { RegisterPayload } from '../../models/payloads/register.payload';
import { HelperService } from '../../services/helper';
import { UserService } from '../../services/user.service';
import { CustomValidators } from '../../utils/validators';
import isValidEmail = CustomValidators.isValidEmail;
import isValidPassword = CustomValidators.isValidPassword;
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  constructor(
  ) { }

  public readonly router: Router = inject(Router);

  private readonly helperService: HelperService = inject(HelperService);

  private readonly authService: AuthService = inject(AuthService);

  public loginPayload: LoginPayload = {
    id: 0,
    email: '',
    password: '',
    city: '',
    name: '',
  };

  public isLoading = false;

  public showPasswordLogin: boolean = false;

  public async login(): Promise<void> {
    if (!this.canLogin()) return;

    this.isLoading = true;

    const [ canLogin, message ] = await this.authService.login(this.loginPayload.email, this.loginPayload.password);

    this.isLoading = false;

    if (!canLogin)
      return void this.helperService.showToast(message);

    await this.helperService.showToast('Sucesso!', );
    await this.router.navigateByUrl('/home');
  }

  public canLogin(): boolean {
    return isValidEmail(this.loginPayload.email) && isValidPassword(this.loginPayload.password);
  }

  public async invitedLogin(): Promise<void> {
    // const lastItem = JSON.parse(localStorage.getItem('users'));
    // if (!lastItem) {
    //   this.invitedUser.id = 0;
    // }
    // else {
    //   this.invitedUser.id = lastItem[lastItem.length - 1].id + 1;
    // }
    //
    // this.userService.invitedLogin(this.invitedUser);
    // await this.helperService.showToast('Você entrou no modo convidado e suas informações de usuário serão padrões.', 1000);
    // await this.router.navigate(['/home']);
  }

}

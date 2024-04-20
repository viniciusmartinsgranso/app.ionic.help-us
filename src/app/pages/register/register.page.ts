import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterPayload } from '../../models/payloads/register.payload';
import { HelperService } from '../../services/helper';
import { UserService } from '../../services/user.service';
import { CustomValidators } from '../../utils/validators';
import isValidEmail = CustomValidators.isValidEmail;
import isValidPassword = CustomValidators.isValidPassword;
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

  protected readonly router: Router = inject(Router);

  private readonly helper: HelperService = inject(HelperService);

  private readonly userService: UserService = inject(UserService);

  private readonly authService: AuthService = inject(AuthService);

  public registerPayload: RegisterPayload = {
    name: '',
    email: '',
    city: '',
    password: '',
    confirmPassword: '',
  };

  public isLoading: boolean = false;

  public showPasswordRegister: boolean = false;

  public showConfirmPasswordRegister: boolean = false;

  public async register(): Promise<void> {
    if(!this.canRegister()) return;
    this.isLoading = true;

    const [ canCreate, messageCreate] = await this.userService.create(this.registerPayload);

    this.isLoading = false;

    if (!canCreate)
      return void this.helper.showToast(messageCreate);

    const [ canLogin, message ] = await this.authService.login(this.registerPayload.email, this.registerPayload.password);

    this.isLoading = false;

    if (!canLogin)
      return void this.helper.showToast('Ocorreu um erro, tente logar novamente na página de login.');

    await this.helper.showToast(messageCreate);
    await this.router.navigate(['/home']);
  }

  public canRegister(): boolean {
    return isValidEmail(this.registerPayload.email) && isValidPassword(this.registerPayload.password) && isValidPassword(this.registerPayload.confirmPassword) && this.registerPayload.name.length > 3 && this.registerPayload.city.length > 3 && this.registerPayload.password === this.registerPayload.confirmPassword;
  }

}

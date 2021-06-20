import { AbstractRegistrationAuthorizationService } from './abstractRegistrationAuthorizationService';


export class RegistrationService extends AbstractRegistrationAuthorizationService {

  public validateFirstname(firstname: string): boolean {
    return true;
  }


  public validateLastname(lastname: string): boolean {
    return true;
  }
}

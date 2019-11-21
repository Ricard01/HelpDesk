import { FormControl } from '@angular/forms';
import { timer } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { UserService } from '../../pages/user/user.service';

export const userNameValidator = (userService: UserService, time: number = 500) => {
  return (input: FormControl) => {
    return timer(time).pipe(
      switchMap(() => userService.checkUserName(input.value)),
      map(res => {
        return res === true ? {userExist: true} : false;
      })
    );
  };
};

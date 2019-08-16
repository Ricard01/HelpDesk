import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/core/_services/auth.service';
import { map } from 'rxjs/operators';
import { User } from '../../pages/user/user.model';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  baseUrl = environment.apiUrl + 'users/';
  constructor(private http: HttpClient, private authService: AuthService) {}

  okuploadImg(uploadData) {
    const url = this.baseUrl + this.authService.user.id + '/photos';

    this.http
      .post(url, uploadData, {
        // reportProgress: true,
        // observe: 'events'
      })
      .subscribe(events => {
        console.log(events);
      });
  }

  uploadImg(uploadData) {
    const url = this.baseUrl + this.authService.user.id + '/photos';

    return this.http.post(url, uploadData, {});
    // .subscribe(events => {

       // console.log(events);
      // this.authService.changeMemberPhoto();
       // this.authService.currentUser.photoUrl = photo.url;
       // localStorage.setItem('user',JSON.stringify(this.authService.currentUser)
       // );

   // });
  }

  // this.uploader.onSuccessItem = (item, response, status, headers) => {
  //   if (response) {
  //     const res: Photo = JSON.parse(response);
  //     const photo = {
  //       id: res.id,
  //       url: res.url,
  //       dateAdded: res.dateAdded,
  //       description: res.description,
  //       isMain: res.isMain,
  //       isApproved: res.isApproved
  //     };
  //     this.photos.push(photo);
  //     if (photo.isMain) {
  //       this.authService.changeMemberPhoto(photo.url);
  //       this.authService.currentUser.photoUrl = photo.url;
  //       localStorage.setItem('user', JSON.stringify(this.authService.currentUser));
  //     }
  //   }
  // };
}

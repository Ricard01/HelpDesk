import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/core/_services/auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  baseUrl = environment.apiUrl + 'users/';
  constructor(private http: HttpClient, private authService: AuthService) {}

  public uploadImage(image: File) {
    const url = this.baseUrl + this.authService.user.id + '/photos';
    const formData = new FormData();
    formData.append('image', image);

    return this.http.post(url, formData).pipe(
      map((resp: any) => {
        return resp;
      })
    );
  }

  public onUpload(uploadData: FormData) {
    const url = this.baseUrl + this.authService.user.id + '/photos';
    return this.http.post(url, uploadData).pipe(
      map((resp: any) => {
        console.log(resp);
      })
    );
  }
}

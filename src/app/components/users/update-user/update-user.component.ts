import { ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { mimeType } from '../../../shared/models/mime-type.validator';
import { Subscription } from 'rxjs';
import { User } from '../../../shared/models/user.model';
import { UserService } from '../../../shared/services/user.service';

interface State {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit, OnDestroy {

  public enteredFirstName = '';
  public enteredLastName = '';
  public enteredUsername = '';
  public enteredStreet = '';
  public enteredCity = '';
  public enteredState = '';
  public enteredZip = '';
  public enteredPhone = '';
  public enteredMobile = '';

  public isLoading = false;

  public form: FormGroup;
  public imagePreview: string;

  private mode = 'create';
  private userId: string;

  public user: User;

  private authStatusSubs: Subscription;

  public states: State[] = [
    { value: "AL", viewValue: "Alabama" },
    { value: "AK", viewValue: "Alaska" },
    { value: "AZ", viewValue: "Arizona" },
    { value: "AR", viewValue: "Arkansas" },
    { value: "CA", viewValue:  "California"},
    { value: "CO", viewValue: "Colorodo" },
    { value: "CT", viewValue: "Connecticut" },
    { value: "DE", viewValue: "Deleware" },
    { value: "FL", viewValue: "Florida" },
    { value: "GA", viewValue: "Georgia" },
    { value: "HI", viewValue: "Hawaii" },
    { value: "ID", viewValue: "Idaho" },
    { value: "IL", viewValue: "Illinoise" },
    { value: "IN", viewValue: "Indiana" },
    { value: "IA", viewValue: "Iowa" },
    { value: "KS", viewValue: "Kansas" },
    { value: "KY", viewValue: "Kentucky" },
    { value: "LA", viewValue: "Louisiana" },
    { value: "ME", viewValue: "Maine" },
    { value: "MD", viewValue: "Maryland" },
    { value: "MA", viewValue: "Massacheusettes" },
    { value: "MI", viewValue: "Michigan" },
    { value: "MN", viewValue: "Minnisota" },
    { value: "MS", viewValue: "Mississippi" },
    { value: "MO", viewValue: "Missouri" },
    { value: "MT", viewValue: "Montana" },
    { value: "NE", viewValue: "Nebraska" },
    { value: "NV", viewValue: "Nevada" },
    { value: "NH", viewValue: "New Hampshire" },
    { value: "NJ", viewValue: "New Jersey" },
    { value: "NM", viewValue: "New Mexico" },
    { value: "NY", viewValue: "New York" },
    { value: "NC", viewValue: "North Carolina" },
    { value: "ND", viewValue: "North Dakota" },
    { value: "OH", viewValue: "Ohio" },
    { value: "OK", viewValue: "Oklahoma" },
    { value: "OR", viewValue: "Oregon" },
    { value: "PA", viewValue: "Pennsylvania" },
    { value: "RI", viewValue: "Rhode Island" },
    { value: "SC", viewValue: "South Carolina" },
    { value: "SD", viewValue: "South Dakota" },
    { value: "TN", viewValue: "Tennessee" },
    { value: "TX", viewValue: "Texas" },
    { value: "UT", viewValue: "Utah" },
    { value: "VT", viewValue: "Vermont" },
    { value: "VA", viewValue: "Virginia" },
    { value: "WA", viewValue: "Washington" },
    { value: "WV", viewValue: "West Virginia" },
    { value: "WI", viewValue: "Wisconsin" },
    { value: "WY", viewValue: "Wyoming" }
  ];
selectedState = this.states[2].value;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.authStatusSubs = this.authService.getAuthStatusListener()
    .subscribe(authStatus => {
      this.isLoading = false;
    });
    this.form = new FormGroup({
      'first_name': new FormControl(null,
        { validators: [ Validators.required, Validators.minLength(3) ] }),
      'last_name': new FormControl(null,
        { validators: [ Validators.required, Validators.minLength(3) ] }),
      'user_email': new FormControl(null,
        { validators: [ Validators.required]}),
      'user_name': new FormControl(null,
        { validators: [ Validators.required, Validators.minLength(3) ] }),
      'user_street': new FormControl(null,
        { validators: [ Validators.required, Validators.minLength(3) ] }),
      'user_city': new FormControl(null,
        { validators: [ Validators.required, Validators.minLength(3) ] }),
      'user_state': new FormControl(null,
        { validators: [ Validators.required, Validators.minLength(2) ] }),
      'user_zip': new FormControl(null,
        { validators: [ Validators.required, Validators.minLength(3) ] }),
      'user_phone': new FormControl(null,
        { validators: [ Validators.required, Validators.minLength(10) ] }),
      'user_mobile': new FormControl(null,
        { validators: [ Validators.required, Validators.minLength(10) ] }),
      'image': new FormControl(null,
        { validators: [ Validators.required ], asyncValidators: [mimeType]})
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('userId')) {
        this.mode = 'edit';
        this.userId = paramMap.get('userId');
        this.isLoading = true;
        this.userService.getUser(this.userId).subscribe(userData => {
          this.isLoading = false;
          this.user = {
            id: userData._id,
            first_name: userData.first_name,
            last_name: userData.last_name,
            user_email: userData.user_email,
            user_name: userData.user_name,
            user_street: userData.user_street,
            user_city: userData.user_city,
            user_state: userData.user_state,
            user_zip: userData.user_zip,
            user_phone: userData.user_phone,
            user_mobile: userData.user_mobile,
            imagePath: userData.imagePath,
            creator: userData.creator
          };
          this.form.setValue({
            'first_name': this.user.first_name,
            'last_name': this.user.last_name,
            'user_email': this.user.user_email,
            'user_name': this.user.user_name,
            'user_street': this.user.user_street,
            'user_city': this.user.user_city,
            'user_state': this.user.user_state,
            'user_zip': this.user.user_zip,
            'user_phone': this.user.user_phone,
            'user_mobile': this.user.user_mobile,
            'image': this.user.imagePath
          });
        });
      } else {
        this.mode = 'create';
        this.userId = '';
      }
    });
  }

  onPickedImage(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();
    // console.log(file);
    // console.log(this.form);
    //convert the image to a data url
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSaveUser() {
    if(this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if(this.mode === 'create') {
      this.userService.addUser(
        this.form.value.first_name,
        this.form.value.last_name,
        this.form.value.user_email,
        this.form.value.user_name,
        this.form.value.user_street,
        this.form.value.user_city,
        this.form.value.user_state,
        this.form.value.user_zip,
        this.form.value.user_phone,
        this.form.value.user_mobile,
        this.form.value.image
      );
    } else {
      this.userService.updateUser(
        this.userId,
        this.form.value.first_name,
        this.form.value.last_name,
        this.form.value.user_email,
        this.form.value.user_name,
        this.form.value.user_street,
        this.form.value.user_city,
        this.form.value.user_state,
        this.form.value.user_zip,
        this.form.value.user_phone,
        this.form.value.user_mobile,
        this.form.value.image,
        this.form.value.creator
      )
    }
    this.form.reset();
  }

  ngOnDestroy() {
    this.authStatusSubs.unsubscribe();
  }

}

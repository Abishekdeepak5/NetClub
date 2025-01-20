import { Component, NgModule, OnInit } from '@angular/core';
import {  FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';     
import { Inject } from '@angular/core';
import { Email, UserModel } from '../../shared/models/user.model';
import { AuthService } from '../../shared/services/auth.service';
import Swal from 'sweetalert2';
// import {parsePhoneNumberFromString,  CountryCode,getCountryCallingCode } from 'libphonenumber-js';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit{
  registerUser: UserModel = new UserModel();
  errorMessage:string = ""  ;
  jsonData:any;
  emailmodel:Email=new Email();
  
  constructor(private fb:FormBuilder,private auth:AuthService){}
  ngOnInit(): void {
    this.auth.emailObs$.subscribe((emailmodel:Email)=>{
      this.emailmodel=emailmodel;
      // this.registerForm.get('email')?.setValue("")=emailmodel.email;
      this.registerForm.get('email')?.setValue(emailmodel.email);
    });
  }
  
  isConfirmpasswordError = (control:any) => {
    const password = control.get('password');
    const confirmpassword = control.get('confirmpassword');
    
    if (password && confirmpassword && password.value !== confirmpassword.value) {
      return { 'passwordMismatch': true };
    }
  
    return null;
  };
  registerForm = this.fb.group({
    first_name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
    last_name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
    // email: ['', [Validators.required, Validators.pattern(/@(?:gmail|outlook)\.com$/)]],
    email: ['', [Validators.required, Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmpassword: ['', Validators.required],
    // phone_number:['', Validators.required],
    phoneNumber:['',Validators.required],
    gender:['',Validators.required],
    dob:['',Validators.required],
  }, { validators: this.isConfirmpasswordError });
  
  
  get first_name(){return this.registerForm.controls['first_name'];}
  get last_name(){return this.registerForm.controls['last_name'];}
  get email(){return this.registerForm.controls['email'];}
  get password(){return this.registerForm.controls['password'];}
  get confirmpassword(){return this.registerForm.controls['confirmpassword'];}
  // get phone_number(){return this.registerForm.controls['phone_number'];}
  get gender(){return this.registerForm.controls['gender'];}
  get dob(){return this.registerForm.controls['dob'];}
  get phoneNumber(){return this.registerForm.controls['phoneNumber'];}
  gendervaue:any;
  // phoneNumber: string = '';
  showPhoneNumberError: boolean = false;
  checkInput(){
    console.log(this.registerForm.get('dob')?.value);
    // console.log(this.registerForm.get('first_name')?.value);
    this.gendervaue=this.registerForm.get('dob')?.value;
  }
  phoneNum:any;
  formatPhoneNumber(event: any) {
    let phoneNumber = event.target.value.replace(/\D/g, ''); // Remove non-digit characters
    if (phoneNumber.length > 3) {
      // Insert hyphen after the third character
      phoneNumber = phoneNumber.substring(0, 3) + '-' + phoneNumber.substring(3);
    }
    
    // Check if phoneNumber is not empty and is greater than 7 characters
    if (phoneNumber.length > 7) {
      // Insert hyphen after the sixth character
      phoneNumber = phoneNumber.substring(0, 7) + '-' + phoneNumber.substring(7);
    }
    event.target.value = phoneNumber;
    this.phoneNum=phoneNumber;
    // Check if the phone number is not empty and show/hide the error message accordingly
    this.showPhoneNumberError = phoneNumber.length > 0 && phoneNumber.replace(/\D/g, '').length !== 10;

  }
  onRegister() {
    if (!this.registerForm.valid) {
      // If the form is invalid, display a popup alert
      alert('Please fill in all required fields correctly.');
      return;
    }
    this.validateEmail();

  // If email is invalid, return without registering the user
      if (!this.email.valid) {
       return;
  }
  
    // Check if email is provided and ends with @gmail.com
    //console.log(localStorage.getItem('auth-user'));
    this.registerUser = {
      id: 0,
      user_name: `${this.registerForm.get('first_name')?.value} ${this.registerForm.get('last_name')?.value}`,
      first_name: `${this.registerForm.get('first_name')?.value}`,
      last_name: `${this.registerForm.get('last_name')?.value}`,
      email: `${this.registerForm.get('email')?.value}`,
      password: `${this.registerForm.get('password')?.value}`,
      phone_number: `${this.registerForm.get('phoneNumber')?.value?.replace(/\D/g, '')}`,
      gender: `${this.registerForm.get('gender')?.value}`,
      date_of_birth: new Date(`${this.registerForm.get('dob')?.value}`),
      isSuccess: false,
      message: [],
      token: '',
    };
    console.log(this.registerUser);
    this.auth.register(this.registerUser).pipe(first()).subscribe(
      (data: any)=>{
        this.jsonData=data;
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Registered Successfully",
          showConfirmButton: true,
          confirmButtonText: 'Yes, go ahead.',
          showCancelButton:true
        });
        console.log(data);
      },
      (err: { message: string; })=>{
        this.errorMessage = err.message;
        Swal.fire('Oops...', 'Something went wrong, please try again', 'error');
      });      
  }
  validateEmail() {
    const email = this.registerForm.get('email');
    if (email && email.invalid && email.dirty) {
      // If the email is invalid and has been touched, display the alert box
      alert('Please provide a valid Gmail address (ending with @gmail.com/@outlook.com)');
    }
  }

}


export class UserModel{
    id:number=0;
    user_name:string='';
    first_name:string='';
    last_name:string='';
    email:string='';
    password:string='';
    phone_number:string='';
    gender:string='';
    date_of_birth: Date = new Date();
    isSuccess:boolean=false;
    message:string[]=[];
    token:string='';
}
export class UserLogin{
    email:string='';
    password:string='';
}
export class Email{
    email:string='';
    canEditEmail:boolean=true;
}
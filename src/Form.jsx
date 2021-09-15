import React from 'react';
const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
const validPasswordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
const validPhoneNoRegex = RegExp(/^(?=.*\d).{10,}$/);
export default class Form extends React.Component {
    constructor(props){
        super(props);
        this.state={
            username:"",
            email:"",
            password:"",
            confirmPassword:"",
            phone:"",
            errors: {  
                username:'',
                email:'',
                password:'',
                confirmPassword:'',
                phone:''          
            },
            formValid: false
        }
    }
    validateForm(){
        this.setState({formValid : this.state.errors["username"] === "" && 
    this.state.errors["email"]==="" && this.state.errors.password==="" && this.state.errors.confirmPassword==="" && this.state.errors.phone==="" && this.state.username !== "" &&
this.state.email !=="" && this.state.password !== "" && this.state.confirmPassword !== "" && this.state.phone !== ""})
    }
    handleChange = (e) =>{
        const targetName = e.target.name;
        let targetValue = e.target.value;
        let errors = this.state.errors;
        switch(targetName){
            case 'username':
                errors.username=(targetValue.length<6 || targetValue.length>20)?
                'User Name should contain min of 6 characters and maximum of 20 characters'
                :'';
                break;
            case 'email':
                errors.email= validEmailRegex.test(targetValue)?
                '':'Invalid Email!';
                break;
            case 'password':
                errors.password = validPasswordRegex.test(targetValue)?
                '':'Password must contain atleast one lowercase, uppercase, digit, special character and should be of minimum 8 length';
                break;
            case 'confirmPassword':
                errors.confirmPassword = targetValue !== this.state.password?
                'passwords didnt match':'';
                break;
            case 'phone':
                errors.phone = validPhoneNoRegex.test(targetValue)
                ? '':'Phone Number is Invalid';
                break;

        }
        this.setState({
            [targetName]: targetValue
        },this.validateForm);
    }




    render() {  
        const{username, email, password, confirmPassword, phone, errors,formValid} = this.state;    
        return (
            <form className="signUpForm">
                <h2>Sign Up</h2>
                
                <div>
                    <label>User Name : </label>
                    <input type="text" placeholder="Name" name="username" value={username} onChange={this.handleChange}/>
                    <span>
                        {errors && (<p className ="error">{errors["username"]}</p>)}
                    </span>
                </div>
                <div>
                    <label>Email :</label>
                    <input type="text" placeholder="Email" name="email" value = {email} onChange={this.handleChange}/>
                    <span>
                        {errors && (<p className ="error">{errors["email"]}</p>)}
                    </span>
                </div>
                <div>
                    <label>Password :</label>
                    <input type="password" placeholder="password" name="password" value={password} onChange={this.handleChange} /> 
                    <span>
                        {errors && (<p className ="error">{errors["password"]}</p>)}
                    </span>
                </div>
                <div>
                    <label>Confirm Password :</label>
                    <input type="text" placeholder="Enter password again" name="confirmPassword" value={confirmPassword} onChange={this.handleChange}/>
                    <span>
                        {errors && (<p className ="error">{errors["confirmPassword"]}</p>)}
                    </span>
                </div>
                <div>
                    <label>Phone Number :</label>
                    {/* <select name="countryCode">
                        <option value="+91">+91</option>
                        <option value="+92">+92</option>
                        <option value="+93">+93</option>
                    </select> */}
                    <input type="text" placeholder="Phone Number" name="phone" value={phone} onChange={this.handleChange} />
                    <span>
                        {errors && (<p className ="error">{errors["phone"]}</p>)}
                    </span>
                </div>
                <button type="submit" disabled={!this.state.formValid}>Register</button>
            </form>
        );
    }
}
export interface PasswordCheck {
    lengthCheck: boolean;
    numberCheck: boolean;
    lowerCaseCheck: boolean;
    upperCaseCheck: boolean;
    specialCharCheck: boolean;
}

export function checkPassword(password: string): PasswordCheck {
    // At least 8 characters
    var lengthCheck = password.length >= 8;

    // At least one number
    var numberCheck = /\d/.test(password);

    // At least one lowercase letter
    var lowerCaseCheck = /[a-z]/.test(password);

    // At least one uppercase letter
    var upperCaseCheck = /[A-Z]/.test(password);

    // At least one special character
    var specialCharCheck = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(
        password
    );

    return {
        lengthCheck,
        numberCheck,
        lowerCaseCheck,
        upperCaseCheck,
        specialCharCheck,
    };
}

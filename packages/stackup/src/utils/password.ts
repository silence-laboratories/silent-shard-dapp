export function checkPassword(password: string) {
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

    // Check all conditions
    if (
        lengthCheck &&
        numberCheck &&
        lowerCaseCheck &&
        upperCaseCheck &&
        specialCharCheck
    ) {
        return true;
    } else {
        return false;
    }
}

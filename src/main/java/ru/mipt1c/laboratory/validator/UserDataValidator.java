package ru.mipt1c.laboratory.validator;

import ru.mipt1c.laboratory.model.UserInfo;
import ru.mipt1c.laboratory.validator.utils.RequestValidationUtils;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

public class UserDataValidator implements Validator {

    @Override
    public boolean supports(Class<?> clazz) {
        return UserInfo.class.isAssignableFrom(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        UserInfo userInfo = (UserInfo) target;

        String firstName = userInfo.getFirstName();
        if (firstName == null || firstName.trim().isEmpty()) {
            errors.rejectValue("firstName", "error_severe.user.firstName.invalid");
        }

        String lastName = userInfo.getLastName();
        if (lastName == null || lastName.trim().isEmpty()) {
            errors.rejectValue("lastName", "error_severe.user.lastName.invalid");
        }

        String email = userInfo.getEmail();
        if (email == null || email.trim().isEmpty()) {
            errors.rejectValue("email", "error_severe.user.email.invalid");
        } else if(!RequestValidationUtils.validateEmail(email)) {
            errors.rejectValue("email", "error_severe.user.email.format.invalid");
        }
    }

}

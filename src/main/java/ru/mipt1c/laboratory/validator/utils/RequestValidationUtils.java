package ru.mipt1c.laboratory.validator.utils;

import org.springframework.context.support.ReloadableResourceBundleMessageSource;
import ru.mipt1c.laboratory.model.asynch.json.AsynchResponseJson;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import ru.mipt1c.laboratory.utils.WildcardResourceBundleMessageSource;

import java.util.Locale;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Component
public class RequestValidationUtils {

    private static final Logger LOGGER = Logger.getLogger(RequestValidationUtils.class);

    @Autowired
    private WildcardResourceBundleMessageSource messageSource;

    private static final Pattern VALID_EMAIL_ADDRESS_REGEX =
            Pattern.compile("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,6}$", Pattern.CASE_INSENSITIVE);


    /**
     * Validate email address.
     *
     * @param emailStr Given email address.
     * @return True, if given string is valid email.
     */
    public static boolean validateEmail(String emailStr) {
        Matcher matcher = VALID_EMAIL_ADDRESS_REGEX.matcher(emailStr);
        return matcher.find();
    }

    /**
     * Checks if provided binding result has errors and initializes response json appropriately.
     *
     * @param bindingResult Request binding result.
     * @param locale        Locale for error message lookup.
     * @return One of the following:
     * 1) AsynchResponseJson with response code RESPONSE_CODE_REQUEST_VALIDATION_ERROR_SEVERE and response
     * message RESPONSE_MSG_REQUEST_VALIDATION_ERROR_SEVERE when validation contains any severe error which is not
     * intended to be handled in client side. All severe field and global errors will be registered as response params
     * in response json object.
     * 2) AsynchResponseJson with response code RESPONSE_CODE_REQUEST_VALIDATION_ERROR and response
     * message RESPONSE_MSG_REQUEST_VALIDATION_ERROR when validation does not contain any severe error but
     * contains non-severe errors intended to be handled in client side. All field and global errors will be registered
     * as response params in response json object.
     * 3) null when validation does not contain any error.
     */
    public AsynchResponseJson initResponseJsonForValidationErrors(BindingResult bindingResult, Locale locale) {
        boolean severeErrorExists = false;

        if (bindingResult.hasErrors()) {
            AsynchResponseJson responseJsonWithSevereErrors =
                    new AsynchResponseJson(AsynchResponseJson.RESPONSE_CODE_REQUEST_VALIDATION_ERROR_SEVERE);
            AsynchResponseJson responseJsonWithNonSevereErrors =
                    new AsynchResponseJson(AsynchResponseJson.RESPONSE_CODE_REQUEST_VALIDATION_ERROR);

            for (ObjectError error : bindingResult.getAllErrors()) {
                String errorMessage = messageSource.getMessage(error, locale);
                if (error.getCode().contains("error_severe") || error.getCode().contains("globalerror_severe")) {
                    severeErrorExists = true;
                    responseJsonWithSevereErrors.addResponseParam(error.getCode(), errorMessage);
                } else {
                    responseJsonWithNonSevereErrors.addResponseParam(error.getCode(), errorMessage);
                }
                LOGGER.error(String.format("Request contains validation error - %s", errorMessage));
            }

            return severeErrorExists ? responseJsonWithSevereErrors : responseJsonWithNonSevereErrors;
        } else {
            return null;
        }
    }
}

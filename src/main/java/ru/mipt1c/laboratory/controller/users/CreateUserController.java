package ru.mipt1c.laboratory.controller.users;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.ServletRequestDataBinder;
import org.springframework.web.bind.annotation.*;
import ru.mipt1c.laboratory.model.UserInfo;
import ru.mipt1c.laboratory.model.asynch.json.AsynchResponseJson;
import ru.mipt1c.laboratory.service.UserService;
import ru.mipt1c.laboratory.utils.WildcardResourceBundleMessageSource;
import ru.mipt1c.laboratory.validator.UserDataValidator;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(value = "/users")
public class CreateUserController {

    private static final Logger LOGGER = Logger.getLogger(CreateUserController.class);

    @Autowired
    UserService userService;

    @Autowired
    UserDataValidator userDataValidator;

    @Autowired
    private WildcardResourceBundleMessageSource messageSource;

    @InitBinder
    protected void initBinder(HttpServletRequest request, ServletRequestDataBinder binder) {
        binder.setValidator(userDataValidator);
    }


    @RequestMapping(method = RequestMethod.POST)
    public AsynchResponseJson createNewUserHandler(@RequestBody @Valid UserInfo userInfoBean, BindingResult bindingResult,
                                                          HttpServletRequest request) {

        AsynchResponseJson responseJson;

        if (bindingResult.hasErrors()) {
            if (bindingResult.hasFieldErrors()) {
                LOGGER.error("User data validation field error");
                responseJson = new AsynchResponseJson(AsynchResponseJson.RESPONSE_CODE_INVALID_INPUT);

                List<FieldError> fieldErrors = bindingResult.getFieldErrors();
                for (FieldError fieldError : fieldErrors) {
                    String fieldName = fieldError.getField();
                    responseJson.addResponseParam(fieldName, messageSource.getMessage(fieldError, request.getLocale()));
                }
            }
            else {
                LOGGER.error("User data validation global error");
                responseJson = new AsynchResponseJson(AsynchResponseJson.RESPONSE_CODE_GENERAL_ERROR, "User data validation global error");
            }
        }
        else{
            LOGGER.info("Creating a new user with '" + userInfoBean.getEmail() + "' email.");

            Integer userId = userService.createUser(userInfoBean.fetchUserDto());
            responseJson = new AsynchResponseJson();
            responseJson.addResponseParam("userId", userId);
        }

        return responseJson;
    }

}
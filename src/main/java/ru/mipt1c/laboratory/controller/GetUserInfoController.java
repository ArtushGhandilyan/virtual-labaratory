package ru.mipt1c.laboratory.controller;

import ru.mipt1c.laboratory.model.asynch.json.AsynchResponseJson;
import ru.mipt1c.laboratory.security.LaboratoryUserDetails;
import ru.mipt1c.laboratory.utils.RequestUtils;
import org.apache.log4j.Logger;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping(value = "/user-info")
public class GetUserInfoController {

    private static final Logger LOGGER = Logger.getLogger(GetUserInfoController.class);

    @RequestMapping(method = RequestMethod.GET)
    public void getUserInfo(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        LaboratoryUserDetails userDetails = (LaboratoryUserDetails) authentication.getPrincipal();

        AsynchResponseJson authenticationSuccessResponseJson = new AsynchResponseJson(AsynchResponseJson.RESPONSE_CODE_SUCCESS);
        authenticationSuccessResponseJson.addResponseParam("userId", userDetails.getUserId());
        authenticationSuccessResponseJson.addResponseParam("email", userDetails.getUserEmail());
        authenticationSuccessResponseJson.addResponseParam("firstName", userDetails.getFirstName());
        authenticationSuccessResponseJson.addResponseParam("lastName", userDetails.getLastName());
        authenticationSuccessResponseJson.addResponseParam("isGuest", userDetails.isGuest());
        authenticationSuccessResponseJson.addResponseParam("isEnabled", userDetails.isEnabled());
        authenticationSuccessResponseJson.addResponseParam("permissions", userDetails.getGrantedAuthority());

        RequestUtils.populateWithJSON(response, authenticationSuccessResponseJson);
    }
}

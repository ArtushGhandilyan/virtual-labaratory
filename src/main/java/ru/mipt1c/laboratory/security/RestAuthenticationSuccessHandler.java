package ru.mipt1c.laboratory.security;

import ru.mipt1c.laboratory.model.asynch.json.AsynchResponseJson;
import ru.mipt1c.laboratory.utils.RequestUtils;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class RestAuthenticationSuccessHandler implements AuthenticationSuccessHandler {
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        LaboratoryUserDetails userDetails = (LaboratoryUserDetails) authentication.getPrincipal();

        AsynchResponseJson authenticationSuccessResponseJson = new AsynchResponseJson(AsynchResponseJson.RESPONSE_CODE_SUCCESS);
        authenticationSuccessResponseJson.addResponseParam("userId", userDetails.getUserId());
        authenticationSuccessResponseJson.addResponseParam("email", userDetails.getUserEmail());
        authenticationSuccessResponseJson.addResponseParam("firstName", userDetails.getFirstName());
        authenticationSuccessResponseJson.addResponseParam("lastName", userDetails.getLastName());
        authenticationSuccessResponseJson.addResponseParam("isEnabled", userDetails.isEnabled());
        authenticationSuccessResponseJson.addResponseParam("isGuest", userDetails.isGuest());
        authenticationSuccessResponseJson.addResponseParam("permissions", userDetails.getGrantedAuthority());

        RequestUtils.populateWithJSON(response, authenticationSuccessResponseJson);
    }
}
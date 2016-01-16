package ru.mipt1c.laboratory.security;

import ru.mipt1c.laboratory.model.asynch.json.AsynchResponseJson;
import ru.mipt1c.laboratory.utils.RequestUtils;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class RestAuthenticationFailureHandler implements AuthenticationFailureHandler {

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
        AsynchResponseJson authenticationFailureResponseJson =
                new AsynchResponseJson(AsynchResponseJson.RESPONSE_CODE_GENERAL_ERROR, exception.getMessage());
        RequestUtils.populateWithJSON(response, authenticationFailureResponseJson);
    }
}
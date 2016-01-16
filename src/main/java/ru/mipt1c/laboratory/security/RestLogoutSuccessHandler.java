package ru.mipt1c.laboratory.security;

import ru.mipt1c.laboratory.model.asynch.json.AsynchResponseJson;
import ru.mipt1c.laboratory.utils.RequestUtils;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


public class RestLogoutSuccessHandler implements LogoutSuccessHandler {

    @Override
    public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        AsynchResponseJson logoutSuccessResponseJson = new AsynchResponseJson(AsynchResponseJson.RESPONSE_CODE_SUCCESS);
        RequestUtils.populateWithJSON(response, logoutSuccessResponseJson);
    }
}
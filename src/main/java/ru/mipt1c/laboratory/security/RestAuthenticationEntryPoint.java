package ru.mipt1c.laboratory.security;

import ru.mipt1c.laboratory.utils.RequestUtils;
import org.apache.log4j.Logger;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.Http403ForbiddenEntryPoint;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class RestAuthenticationEntryPoint extends Http403ForbiddenEntryPoint {
    private static final Logger LOGGER = Logger.getLogger(RestAuthenticationEntryPoint.class);

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException arg2) throws IOException, ServletException {
        if (LOGGER.isDebugEnabled()) {
            LOGGER.debug("Pre-authenticated entry point called. Rejecting access");
        }

        // Request has invalid session id => Session is expired.
        // Send 403 response with SESSION_EXPIRE FLAG.
        if(request.getRequestedSessionId() != null && !request.isRequestedSessionIdValid()) {
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
            RequestUtils.populateWithJSON(response, RequestUtils.SESSION_EXPIRED_FLAG);
            return;
        }

        // User is not authenticated.
        // Send response 403 with NOT AUTHENTICATED FLAG.
        response.setStatus(HttpServletResponse.SC_FORBIDDEN);
        RequestUtils.populateWithJSON(response, RequestUtils.NOT_AUTHENTICATED_FLAG);
    }
}

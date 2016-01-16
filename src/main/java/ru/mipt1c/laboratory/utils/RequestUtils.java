package ru.mipt1c.laboratory.utils;

import com.fasterxml.jackson.databind.ObjectMapper;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Provides http request utility methods.
 */
public class RequestUtils {

    public static final Integer ACCESS_DENIED_FLAG = 0;
    public static final Integer SESSION_EXPIRED_FLAG = 1;
    public static final Integer NOT_AUTHENTICATED_FLAG = 2;

    public static void populateWithJSON(HttpServletResponse response, Object object) {
        ObjectMapper objectMapper = new ObjectMapper();
        if(object != null) {
            response.setContentType("text/x-json;charset=UTF-8");
            response.setHeader("Cache-Control", "no-cache");
            try {
                objectMapper.writeValue(response.getWriter(), object);
            } catch (IOException e) {
                // IOException in populateWithJSON
            }
        }
    }
}
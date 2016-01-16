package ru.mipt1c.laboratory.model.asynch.json;

import java.util.HashMap;
import java.util.Map;

/**
 * Contains information about asynchronous response.
 */
public class AsynchResponseJson {

    /**
     * Contains available response codes.
     */
    public static final int RESPONSE_CODE_SUCCESS = 0;
    public static final int RESPONSE_CODE_GENERAL_ERROR = 1;
    public static final int RESPONSE_CODE_ACCESS_DENIED = 2;
    public static final int RESPONSE_CODE_INVALID_INPUT = 40;
    public static final int RESPONSE_CODE_TOO_MANY_MATCHES = 41;
    public static final int RESPONSE_CODE_REQUEST_IS_OUT_OF_DATE = 42;
    public static final int RESPONSE_CODE_REQUEST_VALIDATION_ERROR = 50;
    public static final int RESPONSE_CODE_REQUEST_VALIDATION_ERROR_SEVERE = 51;

    /**
     * Contains available response messages.
     */
    public static final String RESPONSE_MSG_INVALID_INPUT = "Sorry, invalid input was provided.";
    public static final String RESPONSE_MSG_ACCESS_DENIED = "You don't have access to perform this action.";
    public static final String RESPONSE_MSG_GENERAL_ERROR = "General error.";
    public static final String RESPONSE_MSG_REQUEST_IS_OUT_OF_DATE = "The request is out of date.";
    public static final String RESPONSE_MSG_REQUEST_VALIDATION_ERROR = "Request contains validation errors, which should be handled on client side.";
    public static final String RESPONSE_MSG_REQUEST_VALIDATION_ERROR_SEVERE = "Request contains severe validation errors which can't be recovered.";


    /**
     * Contains response code.
     */
    private int responseCode;

    /**
     * Contains response message.
     */
    private String responseMessage;

    /**
     * Contains response parameters map.
     */
    private Map<String, Object> responseParamsMap;


    /**
     * Creates successful json action response.
     */
    public AsynchResponseJson() {
        this.responseCode = RESPONSE_CODE_SUCCESS;
        this.responseParamsMap = new HashMap<String, Object>();
    }

    /**
     * Creates successful json action response with specified response message.
     */
    public AsynchResponseJson(String successMessage) {
        this.responseCode = RESPONSE_CODE_SUCCESS;
        this.responseParamsMap = new HashMap<String, Object>();
        this.responseMessage = successMessage;
    }

    /**
     * Creates Json action response with specified response code.
     */
    public AsynchResponseJson(int responseCode) {
        this.responseCode = responseCode;
        this.responseParamsMap = new HashMap<String, Object>();
        setResponseMessage(responseCode);
    }

    /**
     * Creates Json action response with specified response code and message.
     */
    public AsynchResponseJson(int responseCode, String newResponseMessage) {
        this.responseCode = responseCode;
        this.responseParamsMap = new HashMap<String, Object>();
        this.responseMessage = newResponseMessage;
    }




    /**
     * Returns response params map.
     * @return Map      Map from param name to value.
     */
    public Map<String, Object> getResponseParamsMap() {
        return responseParamsMap;
    }

    /**
     * Add response param with provided name and value.
     * @param paramName         Param name.
     * @param paramValue        Param value.
     */
    public void addResponseParam(String paramName, Object paramValue) {
        responseParamsMap.put(paramName, paramValue);
    }

    /**
     * Returns response code.
     * @return
     */
    public int getResponseCode() {
        return responseCode;
    }

    /**
     * Returns response message.
     * @return
     */
    public String getResponseMessage() {
        return responseMessage;
    }
    
    private void setResponseMessage(int responseCode) {
        switch (responseCode) {
            case RESPONSE_CODE_SUCCESS:
                this.responseMessage = "Action Success!";
                break;
            case RESPONSE_CODE_GENERAL_ERROR:
                this.responseMessage = RESPONSE_MSG_GENERAL_ERROR;
                break;
            case RESPONSE_CODE_ACCESS_DENIED:
                this.responseMessage = RESPONSE_MSG_ACCESS_DENIED;
                break;
            case RESPONSE_CODE_INVALID_INPUT:
                this.responseMessage = RESPONSE_MSG_INVALID_INPUT;
                break;
            case RESPONSE_CODE_REQUEST_IS_OUT_OF_DATE:
                this.responseMessage = RESPONSE_MSG_REQUEST_IS_OUT_OF_DATE;
                break;
            case RESPONSE_CODE_REQUEST_VALIDATION_ERROR:
                this.responseMessage = RESPONSE_MSG_REQUEST_VALIDATION_ERROR;
                break;
            case RESPONSE_CODE_REQUEST_VALIDATION_ERROR_SEVERE:
                this.responseMessage = RESPONSE_MSG_REQUEST_VALIDATION_ERROR_SEVERE;
                break;
            default:
                this.responseMessage = RESPONSE_MSG_GENERAL_ERROR;
                break;
        }
    }


}

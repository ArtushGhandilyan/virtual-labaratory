(function() {
    'use strict';

    angular
        .module('laboratory')
        .factory('customHttpInterceptor', customHttpInterceptor);

    customHttpInterceptor.$inject = ['$q', '$log', 'eventService', 'EventTypes', 'ResponseCodes'];

    function customHttpInterceptor($q, $log, eventService, EventTypes, ResponseCodes) {
        return {
            response: response,
            responseError: responseError
        };

        function responseError(error) {
            switch (error.status) {
                case 403:
                    var flag = error.data;
                    var event = flag == '1' ? EventTypes.SESSION_EXPIRED :
                                flag == '2' ? EventTypes.NOT_AUTHENTICATED :
                                              EventTypes.ACCESS_DENIED;

                    eventService.sendEvent(event);
                    break;
                case 500:
                    eventService.sendEvent(EventTypes.GENERAL_ERROR);
                    break;
            }

            return $q.reject(error);
        }

        function response(response) {
            if (angular.isDefined(response.data)) {
                var responseCode = response.data.responseCode;

                if(angular.isDefined(responseCode) && responseCode != ResponseCodes.SUCCESS) {
                    if (responseCode == ResponseCodes.REQUEST_VALIDATION_ERROR_SEVERE) {
                        logRequestValidationErrors(response.data.responseParamsMap);
                    }

                    if(responseCode == ResponseCodes.REQUEST_VALIDATION_ERROR_SEVERE ||
                        responseCode == ResponseCodes.GENERAL_ERROR) {
                        eventService.sendEvent(EventTypes.GENERAL_ERROR, response.data.responseMessage);
                    }

                    // *** calling $q.reject to pass through to error callback
                    return $q.reject(response);
                }

            }

            return response;
        }

        function logRequestValidationErrors(responseParamsMap) {
            if (angular.isDefined(responseParamsMap)) {
                $log.debug("!!! START OF REQUEST VALIDATION ERRORS !!!");
                Object.keys(responseParamsMap).forEach(function(key, index) {
                    $log.debug(responseParamsMap[key]);
                });
                $log.debug("!!! END OF REQUEST VALIDATION ERRORS !!!");
            }
        }
    }
})();
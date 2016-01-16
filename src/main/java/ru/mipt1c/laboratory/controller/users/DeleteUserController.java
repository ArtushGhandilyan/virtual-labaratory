package ru.mipt1c.laboratory.controller.users;

import ru.mipt1c.laboratory.model.asynch.json.AsynchResponseJson;
import ru.mipt1c.laboratory.service.UserService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping(value = "/users/{userId}")
public class DeleteUserController {

    private static final Logger LOGGER = Logger.getLogger(DeleteUserController.class);

    @Autowired
    UserService userService;

    @RequestMapping(method = RequestMethod.DELETE)
    public AsynchResponseJson deleteUser(@PathVariable int userId) {
        LOGGER.info("Removing user with " + userId + " id.");
        userService.removeUser(userId);
        return new AsynchResponseJson();
    }

}
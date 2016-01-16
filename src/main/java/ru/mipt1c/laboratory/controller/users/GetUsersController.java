package ru.mipt1c.laboratory.controller.users;


import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import ru.mipt1c.laboratory.db.dto.UserDto;
import ru.mipt1c.laboratory.model.UserInfo;
import ru.mipt1c.laboratory.service.UserService;

import java.util.ArrayList;
import java.util.List;

/**
 * Get users list.
 */

@RestController
@RequestMapping(value = "/users")
public class GetUsersController {

    private static final Logger LOGGER = Logger.getLogger(GetUsersController.class);

    @Autowired
    UserService userService;

    @RequestMapping(method = RequestMethod.GET)
    public List<UserInfo> getUsersInfoBeanList() {
        List<UserInfo> userInfoList = new ArrayList<UserInfo>();
        List<UserDto> userDtos = userService.getUsersList();

        for (UserDto userDto : userDtos) {
            userInfoList.add(new UserInfo(userDto));
        }

        return userInfoList;
    }
}

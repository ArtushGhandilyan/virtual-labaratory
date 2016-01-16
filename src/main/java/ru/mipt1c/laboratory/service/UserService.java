package ru.mipt1c.laboratory.service;

import ru.mipt1c.laboratory.db.UserDBManager;
import ru.mipt1c.laboratory.db.dto.UserDto;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.encoding.MessageDigestPasswordEncoder;
import org.springframework.security.authentication.encoding.ShaPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.mipt1c.laboratory.model.asynch.json.AsynchResponseJson;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class UserService {

    private static Logger LOGGER = Logger.getLogger(UserService.class);

    @Autowired
    UserDBManager userDBManager;

    /**
     * Get user info by provided email.
     * @param email             Specified email.
     * @return                  Fetched user, or null, if user does not exists.
     */
    public UserDto loadUser(String email) {
        UserDto userDto = userDBManager.fetchUserByEmail(email);

        if (userDto != null) {
            return userDto;
        } else {
            LOGGER.debug("User by email \"" + email + "\" is not available");
            return null;
        }
    }

    /**
     * Get all user list.
     * @return  List of UserDto objects
     */
    public List<UserDto> getUsersList() {
        return userDBManager.fetchUsersList();
    }

    /**
     * Creates new user with provided info in the system.
     * @param userDto                    User info.
     * @return                           Created User id.
     */
    public Integer createUser(UserDto userDto) {
        userDto.setIsEnabled(true);
        return userDBManager.createUser(userDto);
    }

    /**
     * Removes user from the system.
     * @param userId                User identifier.
     */
    public void removeUser(Integer userId) {
        userDBManager.removeUser(userId);
    }

    /**
     * Update user.
     * @param userDto user dto object to update.
     */
    public void updateUser(UserDto userDto) {
        userDBManager.updateUser(userDto);
    }
}

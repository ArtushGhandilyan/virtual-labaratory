package ru.mipt1c.laboratory.db;

import ru.mipt1c.laboratory.db.dao.UserDAO;
import ru.mipt1c.laboratory.db.dto.UserCondition;
import ru.mipt1c.laboratory.db.dto.UserDto;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UserDBManager {

    private static Logger LOGGER = Logger.getLogger(UserDBManager.class);

    @Autowired
    UserDAO userDAO;

    /**
     * Loads user from DB by email.
     * @param email           contains user email.
     * @return UserDto object correspond to the user by given email.
     */
    public UserDto fetchUserByEmail(String email) {
        UserDto user = null;

        UserCondition condition = new UserCondition();
        UserCondition.Criteria criteria = condition.createCriteria();
        criteria.andEmailEqualTo(email);

        List<UserDto> usersList = userDAO.selectByExample(condition);
        if ( usersList != null ) {
            if ( usersList.size() == 1 ) {
                user = usersList.get(0);
            } else if ( usersList.size() > 1 ) {
                LOGGER.warn("WARNING: There are more than one user in the DB for email: " + email);
            }
        }

        return user;
    }

    /**
     * Load user information from user table using
     * specified userId.
     * @param userId    User Identifier
     * @return UserDto  Contains load user info
     */
    public UserDto fetchUserByUserId(Integer userId) {
        return userDAO.selectByPrimaryKey(userId);
    }

    /**
     * Fetches users list from DB.
     * @return List of UserDto objects.
     */
    public List<UserDto> fetchUsersList() {
        return userDAO.selectByExample(null);
    }

    /**
     * Inserts new user row into user table.
     * @param userDto  User info.
     * @return  Generated user id.
     */
    public Integer createUser(UserDto userDto) {
        userDAO.insertSelective(userDto);
        return userDto.getId();
    }

    /**
     * Updates user info in `user` table.
     * @param userDto           Provided user new info.
     */
    public void updateUser(UserDto userDto) {
        userDAO.updateByPrimaryKeySelective(userDto);
    }

    /**
     * Removes user from `user` table.
     * @param userId            User identifier.
     */
    public void removeUser(Integer userId) {
        userDAO.deleteByPrimaryKey(userId);
    }
}

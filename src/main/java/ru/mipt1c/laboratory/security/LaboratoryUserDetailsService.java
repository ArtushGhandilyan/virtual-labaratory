package ru.mipt1c.laboratory.security;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import ru.mipt1c.laboratory.db.dto.UserDto;
import ru.mipt1c.laboratory.model.UserInfo;
import ru.mipt1c.laboratory.service.PermissionService;
import ru.mipt1c.laboratory.service.UserService;

import java.util.ArrayList;
import java.util.List;

@Service
public class LaboratoryUserDetailsService implements UserDetailsService {

    private static Logger LOGGER = Logger.getLogger(LaboratoryUserDetailsService.class);

    @Autowired
    private UserService userService;

    @Autowired
    private PermissionService permissionService;

    @Override
    public LaboratoryUserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException, DataAccessException {

        StringBuilder errorMessage = new StringBuilder();

        UserDto userInfo = userService.loadUser(username);
        if (userInfo == null) {
            errorMessage.append("User not found for specified userEmail: ").append(username);

            LOGGER.debug(errorMessage);
            throw new UsernameNotFoundException(errorMessage.toString());
        }

        LaboratoryUserDetails userDetails = fillUserDetails(userInfo);

        if (LOGGER.isDebugEnabled()) {
            LOGGER.debug("Login Attempt by email \"" + username);
        }

        return userDetails;
    }

    /**
     * Set user details into LaboratoryUserDetails object.
     * @param userDto                         User dto info.
     * @return LaboratoryUserDetails object.
     */
    private LaboratoryUserDetails fillUserDetails(UserDto userDto) {
        LaboratoryUserDetails userDetails = new LaboratoryUserDetails();

        List<GrantedAuthority> rpGAList = new ArrayList<GrantedAuthority>();
        List<String> permissions = permissionService.getPermissionsByRoleId(userDto.getRoleId());
        for (String permission : permissions) {
            rpGAList.add(new SimpleGrantedAuthority(permission));
        }
        rpGAList.add(new SimpleGrantedAuthority("LOGGED_ON_USER"));

        userDetails.setUserId(userDto.getId());
        userDetails.setEnabled(userDto.getIsEnabled());
        userDetails.setPassword(userDto.getPassword());
        userDetails.setAuthorities(rpGAList);
        userDetails.setUsername(userDto.getEmail());
        userDetails.setFirstName(userDto.getFirstName());
        userDetails.setLastName(userDto.getLastName());

        return userDetails;
    }
}

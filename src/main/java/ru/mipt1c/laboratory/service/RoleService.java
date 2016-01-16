package ru.mipt1c.laboratory.service;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.mipt1c.laboratory.db.RoleDBManager;
import ru.mipt1c.laboratory.db.UserDBManager;
import ru.mipt1c.laboratory.db.dto.RoleDto;
import ru.mipt1c.laboratory.db.dto.UserDto;

import java.util.List;

@Service
public class RoleService {

    private static Logger LOGGER = Logger.getLogger(RoleService.class);

    @Autowired
    RoleDBManager roleDBManager;


    /**
     * Get all roles list.
     * @return  List of RoleDto objects
     */
    public List<RoleDto> getRolesList() {
        return roleDBManager.fetchRolesList();
    }
}

package ru.mipt1c.laboratory.controller.roles;


import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import ru.mipt1c.laboratory.db.dto.RoleDto;
import ru.mipt1c.laboratory.service.RoleService;

import java.util.List;

/**
 * Get roles list.
 */

@RestController
@RequestMapping(value = "/roles")
public class GetRolesController {

    private static final Logger LOGGER = Logger.getLogger(GetRolesController.class);

    @Autowired
    RoleService roleService;

    @RequestMapping(method = RequestMethod.GET)
    public List<RoleDto> getAllRolesList() {
        return roleService.getRolesList();
    }
}

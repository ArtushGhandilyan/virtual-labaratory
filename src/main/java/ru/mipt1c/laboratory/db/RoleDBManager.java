package ru.mipt1c.laboratory.db;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import ru.mipt1c.laboratory.db.dao.PermissionDAO;
import ru.mipt1c.laboratory.db.dao.RoleDAO;
import ru.mipt1c.laboratory.db.dao.RolePermissionDAO;
import ru.mipt1c.laboratory.db.dao.UserDAO;
import ru.mipt1c.laboratory.db.dto.*;

import java.util.List;

@Repository
public class RoleDBManager {

    private static Logger LOGGER = Logger.getLogger(RoleDBManager.class);

    @Autowired
    RoleDAO roleDAO;

    @Autowired
    PermissionDAO permissionDAO;

    @Autowired
    RolePermissionDAO rolePermissionDAO;


    public List<RolePermissionPk> fetchPermissionsByRoleId(int roleId) {
        RolePermissionCondition condition = new RolePermissionCondition();
        RolePermissionCondition.Criteria criteria = condition.createCriteria();
        criteria.andRoleIdEqualTo(roleId);
        return rolePermissionDAO.selectByExample(condition);
    }

    public List<PermissionDto> fetchPermissions(List<Integer> permissionIds) {
        PermissionCondition condition = new PermissionCondition();
        PermissionCondition.Criteria criteria = condition.createCriteria();
        criteria.andIdIn(permissionIds);
        return permissionDAO.selectByExample(condition);
    }

    public List<RoleDto> fetchRolesList() {
        return roleDAO.selectByExample(null);
    }
}

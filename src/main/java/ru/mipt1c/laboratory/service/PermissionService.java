package ru.mipt1c.laboratory.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.mipt1c.laboratory.db.RoleDBManager;
import ru.mipt1c.laboratory.db.dto.PermissionDto;
import ru.mipt1c.laboratory.db.dto.RolePermissionPk;

import java.util.ArrayList;
import java.util.List;

@Service
public class PermissionService {

    @Autowired
    RoleDBManager roleDBManager;

    public List<String> getPermissionsByRoleId(int roleId) {
        List<RolePermissionPk> rolePermissionPks = roleDBManager.fetchPermissionsByRoleId(roleId);

        List<Integer> permissionIds = new ArrayList<>(rolePermissionPks.size());
        for (RolePermissionPk rolePermissionPk : rolePermissionPks) {
            permissionIds.add(rolePermissionPk.getPermissionId());
        }

        List<String> permissions = new ArrayList<>();

        if(permissionIds.size() != 0) {
            List<PermissionDto> permissionDtos = roleDBManager.fetchPermissions(permissionIds);
            for (PermissionDto permissionDto : permissionDtos) {
                permissions.add(permissionDto.getName());
            }
        }

        return permissions;
    }
}

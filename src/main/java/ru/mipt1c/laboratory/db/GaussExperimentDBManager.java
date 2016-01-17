package ru.mipt1c.laboratory.db;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import ru.mipt1c.laboratory.db.dao.GaussExperimentFilesDAO;
import ru.mipt1c.laboratory.db.dao.PermissionDAO;
import ru.mipt1c.laboratory.db.dao.RoleDAO;
import ru.mipt1c.laboratory.db.dao.RolePermissionDAO;
import ru.mipt1c.laboratory.db.dto.*;

import java.util.List;

@Repository
public class GaussExperimentDBManager {

    private static Logger LOGGER = Logger.getLogger(GaussExperimentDBManager.class);

    @Autowired
    private GaussExperimentFilesDAO gaussExperimentFilesDAO;

    public int insertFile(GaussExperimentFilesDto dto) {
        gaussExperimentFilesDAO.insert(dto);
        return dto.getId();
    }

    public List<GaussExperimentFilesDto> fetchFiles(GaussExperimentFilesCondition condition) {
        return gaussExperimentFilesDAO.selectByExample(condition);
    }

    public void deleteFile(int fileId) {
        gaussExperimentFilesDAO.deleteByPrimaryKey(fileId);
    }
}

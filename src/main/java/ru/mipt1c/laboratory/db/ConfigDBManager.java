package ru.mipt1c.laboratory.db;

import ru.mipt1c.laboratory.db.dao.ConfigPropertyDAO;
import ru.mipt1c.laboratory.db.dto.ConfigPropertyCondition;
import ru.mipt1c.laboratory.db.dto.ConfigPropertyDto;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;

import java.util.Arrays;
import java.util.List;

public class ConfigDBManager {
    private DataSourceTransactionManager transactionManager;
    private ConfigPropertyDAO configPropertyDao;

    public void setConfigPropertyDao(ConfigPropertyDAO configPropertyDao) {
        this.configPropertyDao = configPropertyDao;
    }
	public void setTransactionManager(DataSourceTransactionManager transactionManager) {
		this.transactionManager = transactionManager;
	}


    /**
     * Loads all available configuration properties from config_property table.
     *
     * @return List<ConfigPropertyDto>  Contains list of configuration properties.
     */
    public List<ConfigPropertyDto> loadAllConfigProperties() {
        return configPropertyDao.selectByExample(new ConfigPropertyCondition());
    }


	/**
	 * Loads configuration properties from config_property table by specified names.
	 * @param propertyNames             Contains array of configuration property names.
	 * @return List<ConfigPropertyDto>  Contains list of configuration properties.
	 */
	public List<ConfigPropertyDto> loadConfigProperties(String[] propertyNames) {
		ConfigPropertyCondition configPropertyCondition = new ConfigPropertyCondition();
		ConfigPropertyCondition.Criteria propertyNamesIn = configPropertyCondition.createCriteria();
		propertyNamesIn.andPropertyNameIn(Arrays.asList(propertyNames));
		return configPropertyDao.selectByExample(configPropertyCondition);
	}



}

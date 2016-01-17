package ru.mipt1c.laboratory.service;

import ru.mipt1c.laboratory.db.ConfigDBManager;
import ru.mipt1c.laboratory.db.dto.ConfigPropertyDto;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ConfigProvider {
	
    private static final String GAUSS_FILES_BASE_FOLDER_PATH = "gauss_files_base_folder_path";

    private static final Map<String, String> configurationMap = new HashMap<String, String>();

    /**
     * Application context path being set by ApplicationAttributesTracker when app context is being loaded/refreshed.
     */
    private static String applicationContextPath = "";

    public static String getApplicationContextPath() {
        return applicationContextPath;
    }

    public static void setApplicationContextPath(String applicationContextPath) {
        ConfigProvider.applicationContextPath = applicationContextPath;
    }

    /**
	 * Loads configurable from db and initializes properties.
     *
	 * @param configDBManager   Contains configuration db manager.
	 */
	public ConfigProvider(ConfigDBManager configDBManager) {
		List<ConfigPropertyDto> configProps = configDBManager.loadAllConfigProperties();
		initializeProperties(configProps);
	}

	/**
	 * Initializes properties with provided values.
	 * @param configProps       Contains configuration properties.
	 */
	private void initializeProperties(List<ConfigPropertyDto> configProps) {
		for (ConfigPropertyDto configProp : configProps) {
            configurationMap.put(configProp.getPropertyName(), configProp.getPropertyValue());
		}
	}

    public static String getGaussFilesBaseFolderPath() {
        return configurationMap.get(GAUSS_FILES_BASE_FOLDER_PATH);
    }
}

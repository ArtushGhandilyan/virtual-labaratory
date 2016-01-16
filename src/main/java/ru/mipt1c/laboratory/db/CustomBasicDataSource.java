package ru.mipt1c.laboratory.db;

import org.apache.commons.dbcp2.BasicDataSource;

import java.sql.DriverManager;
import java.sql.SQLException;

/**
 * De-registers the driver when application is being reloaded.
 * Solution to prevent possible memory leak, since java container does not properly manage DBCP in case it is added on
 * web app level (does not loaded with container's libs).
 */
public class CustomBasicDataSource extends BasicDataSource {
    @Override
    public synchronized void close() throws SQLException {
        DriverManager.deregisterDriver(DriverManager.getDriver(getUrl()));
        super.close();
    }
}
package com.example.adsboard.config;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import net.sf.log4jdbc.sql.jdbcapi.DataSourceSpy;

@Configuration
public class AdsConfig {

    @Autowired
    DataSourceProperties dataSourceProperties;

    @Bean(name = "realDataSource")
    @ConfigurationProperties(prefix = "spring.datasource")
    DataSource realDataSource() {
        DataSource dataSource = DataSourceBuilder
                .create(this.dataSourceProperties.getClassLoader())
                .url(this.dataSourceProperties.getUrl()) // Correct parenthesis
                .username(this.dataSourceProperties.getUsername())
                .password(this.dataSourceProperties.getPassword())
                .build();
        return dataSource;
    }

    @Bean(name = "primaryDataSource")
    @Primary
    DataSource dataSource() {
        return new DataSourceSpy(realDataSource()); // Assuming you want to wrap with DataSourceSpy
    }
}

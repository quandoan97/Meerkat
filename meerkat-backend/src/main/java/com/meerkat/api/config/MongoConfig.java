package com.meerkat.api.config;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.AbstractMongoClientConfiguration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@Configuration
@EnableMongoRepositories(basePackages = "com.meerkat.api.repositories")
public class MongoConfig extends AbstractMongoClientConfiguration {

    @Value("${spring.data.mongodb.uri}")
    private String uri;

//    @Override
//    protected String getDatabaseName() {
//        return "heroku_jc64731z";
//    }

    @Override
    protected String getDatabaseName(){
        return "meerkat";
    }

    @Override
    public MongoClient mongoClient() {
        return MongoClients.create(uri);
    }
}

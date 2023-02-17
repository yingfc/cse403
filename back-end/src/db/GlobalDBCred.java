package db;

import io.github.cdimascio.dotenv.Dotenv;

public interface GlobalDBCred {
    String JDBC_DRIVER = "com.mysql.cj.jdbc.Driver";
    String DB_URL = getDbUrl();
    // Database credential
    String USER = getDbUser();
    String PASS = getDbKey();     // ask @yingfc for password

    static String getDbUrl() {
        Dotenv dotenv = Dotenv.configure().load();
        return dotenv.get("DB_URL");
    }

    static String getDbKey() {
        Dotenv dotenv = Dotenv.configure().load();
        return dotenv.get("DB_PASSWORD");
    }

    static String getDbUser() {
        Dotenv dotenv = Dotenv.configure().load();
        return dotenv.get("DB_USER");
    }
}


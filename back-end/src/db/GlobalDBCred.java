package db;

public interface GlobalDBCred {
    String JDBC_DRIVER = "com.mysql.cj.jdbc.Driver";
    String DB_URL = "jdbc:mysql://34.145.35.221/dubmap_backend?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC";

    // Database credential
    String USER = "root";
    String PASS = "";     // ask @yingfc for password
}

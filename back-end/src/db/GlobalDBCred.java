package db;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;

public interface GlobalDBCred {
    String JDBC_DRIVER = "com.mysql.cj.jdbc.Driver";
    String DB_URL = "jdbc:mysql://34.145.35.221/dubmap_backend?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC";

    // Database credential
    String USER = "root";
    String PASS = getDbKey();     // ask @yingfc for password

    static String getDbKey() {
        try {
            File f = new File("back-end/local.properties");
            Scanner scan = new Scanner(f);
            if (scan.hasNext()) {
                String res = scan.next();
                return res;
            }
        } catch (FileNotFoundException e) {
            System.out.println("file not found");
            e.printStackTrace();
        }
        return "";
    }
}


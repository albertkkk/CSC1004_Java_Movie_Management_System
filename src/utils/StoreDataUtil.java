package utils;

import domain.Movie;
import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.BeanListHandler;
import org.apache.log4j.Level;
import org.apache.log4j.Logger;
import org.apache.log4j.PropertyConfigurator;
import web.servlet.client.LoginServlet;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @ClassName: StoreDataUtil.java
 * @Description: 用于服务器启动时，向数据库中查询特定数据并保存的一个类
 * @author:
 */
public class StoreDataUtil {
    private Map<String, List<Movie>> movies = new HashMap<String, List<Movie>>();
    static Logger logger = Logger.getLogger(LoginServlet.class);


    private StoreDataUtil() {
        logger.setLevel(Level.WARN);
    }

    private static class HolderClass {
        private final static StoreDataUtil instance = new StoreDataUtil();
    }

    public static StoreDataUtil getInstance() {
        return HolderClass.instance;
    }
}

package utils;

import com.mchange.v2.c3p0.ComboPooledDataSource;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;

/**
 * 数据源工具
 */
public class DataSourceUtils {
    /**
     * 创建数据源（c3p0)
     */
    private static DataSource dataSource = new ComboPooledDataSource();
    /**
     * ThreadLocal: 可以为每个线程创建一个副本。每个线程可以访问自己内部的副本
     */
    private static ThreadLocal<Connection> tl = new ThreadLocal<Connection>();

    public static DataSource getDataSource() {
        return dataSource;
    }

    /**
     * 当 DBUtils需要手动控制事务时，调用该方法获得一个连接
     *
     * @return
     * @throws SQLException
     */
    public static Connection getConnection() throws SQLException {
        // 获得一个连接
        Connection con = tl.get();
        // 判断是否第一次取连接，第一次取连接时，ThreadLocal中没有连接
        if (con == null) {
            // 如果是第一次取连接，则这个连接为空，创建一个连接
            con = dataSource.getConnection();
            tl.set(con);
        }
        return con;
    }

    /**
     * 开启事务
     *
     * @throws SQLException
     */
    public static void startTransaction() throws SQLException {
        Connection con = getConnection();
        if (con != null) {
            // 开启事务,true表示自动提交事务
            con.setAutoCommit(false);
        }
    }

    /**
     * 提交事务
     *
     * @throws SQLException
     */
    public static void commitTransaction() throws SQLException {
        Connection con = getConnection();
        if (con != null) {
            con.commit();

        }
    }

    /**
     * 事务回滚
     *
     * @throws SQLException
     */
    public static void rollback() throws SQLException {
        Connection con = getConnection();
        if (con != null) {
            con.rollback();
        }
    }

    /**
     * 从 ThreadLocal中释放并且关闭Connection,并结束事务
     *
     * @throws SQLException
     */
    public static void close() throws SQLException {
        Connection connection = getConnection();
        if (connection != null) {
            // 清空ThreadLocal
            tl.remove();
            // 关闭连接
            connection.close();
            connection = null;
        }
    }

}

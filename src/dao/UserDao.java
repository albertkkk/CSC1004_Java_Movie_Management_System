package dao;

import domain.User;
import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.BeanHandler;
import utils.DataSourceUtils;

import java.sql.SQLException;

/**
 * @ClassName: UserDao.java
 * @Description: 用于操纵数据库，对 user表进行增删改查
 */
public class UserDao {

    /**
     * @return User
     * @throws SQLException 参数
     * @throws SQLException
     * @Description: 根据用户名和密码查找用户
     */
    public User findUserByUsernameAndPassword(String username, String password) throws SQLException {
        String sql = "select * from users where username=? and password=?";
        QueryRunner runner = new QueryRunner(DataSourceUtils.getDataSource());
        return runner.query(sql, new BeanHandler<User>(User.class), username, password);
    }

    /**
     * @param user 被添加的用户对象
     * @throws SQLException 参数
     * @Description: 添加用户
     */
    public void addUser(User user) throws SQLException {
        String sql = "insert into users(username,password,email,gender,address) values(?,?,?,?,?)";
        QueryRunner runner = new QueryRunner(DataSourceUtils.getDataSource());
        int row = runner.update(sql, user.getUsername(), user.getPassword(), user.getEmail(),user.getGender(),user.getAddress());
        if (row == 0) {
            throw new RuntimeException();
        }
    }

    /**
     * @param user 更新的用户信息
     * @Description:更新用户信息
     */
    public void updateUser(User user) throws SQLException {
        String sql = "UPDATE users SET introduce = ?, password = ? WHERE id = ?";
        QueryRunner runner = new QueryRunner(DataSourceUtils.getDataSource());
        runner.update(sql, user.getIntroduce(), user.getPassword(), user.getId());
    }

    /**
     * 根据用户名查找用户
     *
     * @param userName 用户名
     * @throws SQLException
     */
    public User findUserByUserName(String userName) throws SQLException {
        String sql = "select * from users where userName = ?";
        QueryRunner runner = new QueryRunner(DataSourceUtils.getDataSource());
        return runner.query(sql, new BeanHandler<>(User.class), userName);
    }

}

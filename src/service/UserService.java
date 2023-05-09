package service;

import dao.UserDao;
import domain.User;
import utils.BlackBox;

import java.sql.SQLException;

/**
 * @ClassName: UserService.java
 * @Description: 与用户相关的业务逻辑层
 * @author:
 */
public class UserService {

    private UserDao dao = new UserDao();

    /**
     * @return
     * @Description: 登录操作
     */
    public User login(String username, String password) throws Exception {
        try {
            // 根据登录时表单输入的用户名和密码，查找用户
			User user = dao.findUserByUsernameAndPassword(username, password);

            // 如果找到，还需要确定用户是否为激活用户
            if (user != null) {
                return user;
            }

            throw new Exception("用户名或密码错误");
        } catch (Exception e) {
            e.printStackTrace();
            throw new Exception("登录失败，请检查用户名或密码是否有误！！");
        }
    }

    public void register(User user) throws Exception {
        try {
            // 调用 dao完成注册操作
            dao.addUser(user);

        } catch (SQLException e) {
            e.printStackTrace();
            throw new Exception("注册失败！用户名已存在！");
        }
    }

    public void updateUser(User user) throws Exception {
        try {
            dao.updateUser(user);
        } catch (SQLException e) {
            e.printStackTrace();
            throw new Exception("更新用户信息失败!");
        }
    }

    public User findUserByUserName(String userName) throws SQLException {
        return dao.findUserByUserName(userName);
    }
}

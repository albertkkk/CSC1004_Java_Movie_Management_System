package domain;

import java.util.Date;

/**
 * @ClassName: User.java
 * @Description: 用户实体类
 * @author:
 */
public class User {
    /**
     * 用户id
     */
    private int id;
    /**
     * 用户名
     */
    private String username;
    /**
     * 用户密码
     */
    private String password;
    /**
     * 用户性别
     */
    private String gender;
    /**
     * 用户邮箱
     */
    private String email;
    /**
     * 用户地址
     */
    private String address;
    /**
     * 用户手机号
     */
    private String telephone;
    /**
     * 自我简介
     */
    private String introduce;
//    /**
//     * 注册时的激活码
//     */
//    private String activeCode;
    /**
     * 用户状态 1表示激活 0表示未激活
     */
    private int state;
//    /**
//     * 用户角色：普通角色，管理员，VIP
//     */
    private String role;
    /**
     * 用户注册时间
     */
    private Date registTime;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getGender() {
        return gender;
    }
    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getAddress(){
        return address;}
    public void setAddress(String address) {
        this.address = address;}

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getIntroduce() {
        return introduce;
    }

    public void setIntroduce(String introduce) {
        this.introduce = introduce;
    }

//    public String getActiveCode() {
//        return activeCode;
//    }

//    public void setActiveCode(String activeCode) {
//        this.activeCode = activeCode;
//    }

    public int getState() {
        return state;
    }

    public void setState(int state) {
        this.state = state;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Date getRegistTime() {
        return registTime;
    }

    public void setRegistTime(Date registTime) {
        this.registTime = registTime;
    }

    @Override
    public String toString() {
        return "User [id=" + id + ", username=" + username + ", password=" + password + ", gender=" + gender
                + ", email=" + email + ", telephone=" + telephone + ", introduce=" + introduce + ", activeCode="
                +  ", state=" + state + ", role=" + ", registTime=" + registTime + "]";
    }

}

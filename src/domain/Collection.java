package domain;

import java.util.Date;

/**
 * @ClassName: Collection.java
 * @Description: 对应数据库的collection表，记录用户喜欢的电影
 * @author:
 * @version: V1.0
 */
public class Collection {
    /**
     * 用户名
     */
    private String userName;
    /**
     * 用户喜欢的电影名
     */
    private int movieId;

    /**
     * 添加收藏记录的时间
     */
    private Date addTime;

    public Date getAddTime() {
        return addTime;
    }

    public void setAddTime(Date addTime) {
        this.addTime = addTime;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public int getMovieId() {
        return movieId;
    }

    public void setMovieId(int movieId) {
        this.movieId = movieId;
    }
}

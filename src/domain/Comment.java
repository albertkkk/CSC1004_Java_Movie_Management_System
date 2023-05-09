package domain;

import java.util.Date;

/**
 * @ClassName: Comment.java
 * @Description: 对应与数据库中的评论表(comments)，记录用户与电影之间的评论关系
 * @author:
 * @version: V1.0
 */
public class Comment {
    /**
     * 用户名
     */
    private String userName;
    /**
     * 用户评论的电影id
     */
    private int movieId;
    /**
     * 用户评论的电影name
     */
    private String movieName;

    public String getMovieName() {
        return movieName;
    }

    public void setMovieName(String movieName) {
        this.movieName = movieName;
    }

    /**
     * 用户对电影的评论
     */
    private String description;

    private Date addTime;

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    private int score;

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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}

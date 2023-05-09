package service;

import dao.CommentDao;
import domain.Comment;
import domain.MovieScore;

import java.sql.SQLException;
import java.util.List;

/**
 * @ClassName: CommentService
 * @Description: 有关评论的业务操作
 * @author:
 **/
public class CommentService {
    private final CommentDao dao = new CommentDao();

    /**
     * 添加一条评论
     *
     * @param comment 评论对象
     * @author
     * @date
     */
    public void addComment(Comment comment) throws SQLException {
        dao.addComment(comment);
    }

    /**
     * 查找对应电影名的所有评论
     *
     * @param movieId 电影名
     * @return java.util.List<domain.Comment>
     * @author
     */
    public List<Comment> findCommentsByMovieId(String movieId) throws SQLException {
        return dao.findCommentsByMovieId(movieId);
    }
    public MovieScore findScoreByMovieId(String movieId) throws SQLException {
        return dao.findScoreByMovieId(movieId);
    }

}

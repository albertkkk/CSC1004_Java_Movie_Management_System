package web.servlet.management;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import domain.Movie;
import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import service.MovieService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.lang.reflect.InvocationTargetException;
import java.sql.SQLException;
import java.util.*;

/**
 * 处理后台管理界面传来的ajax请求
 */
@WebServlet(urlPatterns = "/managementAjax")
public class ManagementAjaxServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        if (request.getSession().getAttribute("user") == null) {
            response.sendRedirect("loginAndRegister.jsp");
        }
        String choose = request.getParameter("choose");
        if (choose == null) {
            return;
        }
        Map<String, String[]> parameterMap = new HashMap<>(request.getParameterMap());
        parameterMap.remove("choose");
        for (String[] v :
                parameterMap.values()) {
            System.out.println("---" + Arrays.toString(v));
        }
        String movieId = request.getParameter("movieId");
        String movieName = request.getParameter("movieName");
        String score = request.getParameter("score");
        String director = request.getParameter("director");
        String scriptWriter = request.getParameter("scriptWriter");
        String actor = request.getParameter("actor");
        String year = request.getParameter("year");
        String country = request.getParameter("country");
        String language = request.getParameter("language");
        String length = request.getParameter("length");
        String description = request.getParameter("description");
        String url = request.getParameter("url");
        String type = request.getParameter("type");


        String originName = request.getParameter("originName");

        PrintWriter writer = response.getWriter();
        MovieService service = new MovieService();
        System.out.println("choose--->" + choose);
        switch (choose) {
            case "online":
                writer.write(request.getServletContext().getAttribute("onlineNumber").toString());
                break;
            case "all":
                JSONArray jsonArray = JSONArray.parseArray(JSON.toJSONString(request.getServletContext().getAttribute("userList")));
                String result = jsonArray.toJSONString();
                writer.write(result);
                break;
            case "delete":
                System.out.println("删除操作。。。。");
                try {
                    service.deleteMovieById(movieId);
                    writer.write("OK");
                } catch (SQLException e) {
                    e.printStackTrace();
                }
                break;
            case "modify":
                try {
                    Movie movie = service.findMovieById(movieId);
                    movie.setId(Integer.parseInt(movieId));
                    movie.setName(movieName);
                    movie.setYears(year);
                    movie.setScore(Integer.parseInt(score));
                    movie.setCountry(country);
                    movie.setType(type);

                    service.updateMovie(movie, originName);
                    writer.write("OK");
                } catch (SQLException e) {
                    e.printStackTrace();
                }
                break;
            case "insert":
                System.out.println("插入操作。。。");
                // 创建 DiskFileItemFactory 工厂对象
                DiskFileItemFactory factory = new DiskFileItemFactory();
                // 设置文件缓存目录，如果该目录不存在则新创建一个
                File f = new File("images");
                if (!f.exists()) {
                    f.mkdirs();
                }
                // 设置文件的缓存路径
                factory.setRepository(f);
                // 创建 ServletFileUpload对象
                ServletFileUpload fileUpload = new ServletFileUpload(factory);
                // 设置字符编码
                fileUpload.setHeaderEncoding("utf-8");
                // 解析 request,得到上传文件的 FileItem对象
                try {
                    Movie m = new Movie();
                    List<FileItem> fileItems = fileUpload.parseRequest(request);
                    // 遍历集合
                    for (FileItem fileItem : fileItems) {
                        // 判断是否为普通字段
                        if (fileItem.isFormField()) {
                            // 获得字段名和字段值
                            String name = fileItem.getFieldName();
                            if (!"".equals(fileItem.getString())) {
                                String value = fileItem.getString("utf-8");
                                System.out.println(name + "-------------->" + value);
                                // 将对应属性的值封装进去
                                BeanUtils.setProperty(m, name, value);
                            }
                        } else {
                            // 获取上传的文件名
                            String fileName = fileItem.getName();
                            System.out.println("上传图片名：----->" + fileName);
                            // 处理上传文件
                            if (fileName != null && !"".equals(fileName)) {
                                // 截取出文件名
                                fileName = fileName.substring(fileName.lastIndexOf("\\") + 1);
                                // 文件名需要唯一
                                fileName = UUID.randomUUID().toString() + "_" + fileName;
                                // 在服务器创建同名文件
                                String webPath = "upload/";
                                // 将服务器中文件夹路径与文件名组合成完整的服务端路径
                                String filePath = getServletContext().getRealPath("/" + webPath + fileName);
                                BeanUtils.setProperty(m, "image", webPath + fileName);
                                System.out.println("上传路径:--->" + filePath);
                                // 创建文件
                                File file = new File(filePath);
                                file.getParentFile().mkdirs();
                                file.createNewFile();
                                // 获得上传文件流
                                InputStream in = fileItem.getInputStream();
                                // 使用 FileOutputStream 打开服务器端的上传文件
                                FileOutputStream out = new FileOutputStream(file);
                                // 流的对拷
                                byte[] buffer = new byte[1024];
                                int len;
                                // 开始读取上传文件的字符，并将其输出到服务器端的上传文件输出流中
                                while ((len = in.read(buffer)) > 0) {
                                    out.write(buffer, 0, len);
                                }
                                // 关闭流
                                in.close();
                                out.close();
                                // 删除临时文件
                                fileItem.delete();
                                System.out.println("上传文件成功");

                            }
                        }
                    }
                    m.setId(service.getMaxMovieId() + 1);
                    service.addMovie(m);
                    response.sendRedirect("movieManagement");
                } catch (FileUploadException | IllegalAccessException | InvocationTargetException | SQLException e) {
                    e.printStackTrace();
                }

                break;
            default:
                break;
        }
        writer.close();
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request, response);
    }
}

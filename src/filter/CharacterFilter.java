package filter;

import org.apache.log4j.Logger;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.UnsupportedEncodingException;

/**
 * 控制全站编码的过滤器
 */
@WebFilter(filterName = "CharacterFilter", urlPatterns = "*.do")
public class CharacterFilter implements Filter {
    static Logger logger = Logger.getLogger(CharacterFilter.class);
    @Override
    public void destroy() {
    }

    @Override
    public void doFilter(ServletRequest req, ServletResponse resp, FilterChain chain) throws ServletException, IOException {
        HttpServletRequest request = (HttpServletRequest) req;
        HttpServletResponse response = (HttpServletResponse) resp;
        // 拦截所有请求 解决全站中文乱码
        // 指定 request 和 response 的编码
        // 只对消息体有效
        request.setCharacterEncoding("utf-8");
        response.setCharacterEncoding("utf-8");
        response.setContentType("text/html;charset=utf-8");
        // 对 request进行包装
        CharacterRequest characterRequest = new CharacterRequest(request);
        StringBuffer server = request.getRequestURL();
        if (server.toString().contains(".css") || server.toString().contains(".js")
                || server.toString().contains(".png") || server.toString().contains(".do")
                || server.toString().contains(".jpg")) {
            //如果发现是css或者js文件，直接放行
            chain.doFilter(request, response);
        }else{
            chain.doFilter(characterRequest, response);
        }
    }

    @Override
    public void init(FilterConfig config) throws ServletException {

    }

}

/**
 * 继承 默认包装类 HttpServletRequestWrapper
 */
class CharacterRequest extends HttpServletRequestWrapper {
    private HttpServletRequest request;

    CharacterRequest(HttpServletRequest request) {
        super(request);
        this.request = request;
    }
    // 重写 getParameter()方法

    @Override
    public String getParameter(String name) {
        // 调用被包装对象的 getParameter()方法，获得请求参数
        String value = super.getParameter(name);
        if (null == value) {
            return null;
        }
        // 判断请求方式
        String method = super.getMethod();
        if ("get".equalsIgnoreCase(method)) {
            try {
                value = new String(value.getBytes(), "utf-8");
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }
        }
        // 解决乱码后返回结果
        return value;
    }
}

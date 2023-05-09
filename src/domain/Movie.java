package domain;

/**
 * @ClassName: Movie.java
 * @Description: 电影实体类
 * @author:
 * @version: V1.0
 */
public class Movie implements Comparable<Movie> {
    /**
     * 电影id
     */
    private int id;
    /**
     * 电影名字
     */
    private String name;
    /**
     * 电影种类
     */
    private String type;
    /**
     * 电影简介
     */
    private String des;
    /**
     * 电影地址
     */
    private String url;
    /**
     * 电影时长
     */
    private String length;
    /**
     * 电影上映日期
     */
    private String years;
    /**
     * 电影出产国
     */
    private String country;
    /**
     * 电影评分
     */
    private int score;

    /**
     * 电影导演
     */
    private String director;

    /**
     * 电影编剧
     */
    private String scriptwriter;
    /**
     * 电影演员
     */
    private String actor;
    /**
     * 电影语言
     */
    private String languages;

    /**
     * 电影图片地址
     */
    private String image;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }


    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getDes() {
        return des;
    }

    public void setDes(String des) {
        this.des = des;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getLength() {
        return length;
    }

    public void setLength(String length) {
        this.length = length;
    }

    public String getYears() {
        return years;
    }

    public void setYears(String year) {
        this.years = year;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public String getDirector() {
        return director;
    }

    public void setDirector(String director) {
        this.director = director;
    }

    public String getScriptwriter() {
        return scriptwriter;
    }

    public void setScriptwriter(String scriptwriter) {
        this.scriptwriter = scriptwriter;
    }

    public String getActor() {
        return actor;
    }

    public void setActor(String actor) {
        this.actor = actor;
    }

    public String getLanguages() {
        return languages;
    }

    public void setLanguages(String languages) {
        this.languages = languages;
    }

    @Override
    public String toString() {
        return "Movie{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", type='" + type + '\'' +
                ", des='" + des + '\'' +
                ", url='" + url + '\'' +
                ", length='" + length + '\'' +
                ", years='" + years + '\'' +
                ", country='" + country + '\'' +
                ", score=" + score +
                ", director='" + director + '\'' +
                ", scriptwriter='" + scriptwriter + '\'' +
                ", actor='" + actor + '\'' +
                ", languages='" + languages + '\'' +
                ", image='" + image + '\'' +
                '}';
    }

    /**
     * 以电影的年份来排序
     *
     * @param o 比较的电影对象
     * @return 返回数值
     */
    @Override
    public int compareTo(Movie o) {
        int thisYear = Integer.parseInt(this.getYears());
        int oYear = Integer.parseInt(o.getYears());
        if (thisYear < oYear) {
            return 1;
        }
        if (thisYear == oYear) {
            return 0;
        }
        return -1;
    }


}

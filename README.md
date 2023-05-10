# CSC1004_Java_Movie_Management_System
Tutorial for Java Project

Student name: Yulun Wu
Student ID: 122090589
Github: https://github.com/albertkkk/CSC1004_Java_Movie_Management_System
 
 
-------------Brief introduction:------------

Firstly, I use wed application. Therefore, before running this code, please configured：Tomcet9.0.74 and JDK9.0.4.
In this project, I have learnt Javascript, wed(something about front end), MySQL, JDBC, Ajax, using of Tomcat and JavaEE(something of backend).

This project contains following features: 
1.	User and Manager Systems
2.	Login System
3.	Java GUI
4.	Registration system
5.	Pictures Uploading
6.	Web Application

Running the code and testing features:

Open the mysql and run the program
 
Without login, you cannot watch the information of movies. First click “我的账户”
For user:
registry your account
 
log in to your account registry above and you can click the movie you like.
If you put the wrong account or password, it will mentioned you and you can’t login the system.
 
In this page, you can see basic information of movie.
You can go to the wedside if you click “在线播放“，you can have a comment or a score to movie when you click “评论”. You can see all the comment and score given from user.
All the information of comment and score will be recorded in MySQL
 
For admin:
If you login by using admin’s account
 
it will firstly come to the movie management page. You can add, remove and modify movie. You can see the score and comments from users. Click the images at top left corner twice. You can go to the movie page. And you have same ability to comment and score movie
 

---------------The brief introduction of code and how do I implement the features:----------------
The impletment of program:
for the working project of project:First, front-end, web(html,css,Javascript,elt) push the datas to the server side(java jsp), and server side push the datas to database(MySQL)
for the process of finish the project:First, design the database side, then plan the server side, and finally achieve the front-end effect


For the “dao” file: it implements the operations of database. Such as add user, ,movie, comment, score elt. Data layer, calling the database (adding, deleting, modifying, and querying the database)
For “service” file: functions logic layer, perform some functions logic validation, and may call the data layer

For “utils” file: Business logic layer, perform some business logic validation, and may call the data layer

For “domain” file: I put all the class in it so that I can easily find each part of the code, which control different functions.

For “ wed servlet” file(basic introduction):
Servlet: server applet
When the server receives a request from the client browser, it will parse the request URL path and obtain the resource path of the accessed Servlet
2. Check the web.xml file to see if there is a corresponding label body content.
3. If so, find the corresponding full class name
4. Tomcat will load the bytecode file into memory and create its objects
5. Call its method
Servlet implementation class: Usually inherits the javax. servlet. HTTP. HttpServlet class and replicates the doGet and doPost methods.
The doGet() method is used to process get requests.
The doPost() method is used to process post requests

For “web” file:
Css and javasript is the part of the GUI and Java service pages
(decoration, page framework elt)
Java service pages
In this file, the images and some package used to decorate the gui are concluded.

That is all for the introduction of project. I do hope you can enjoy it!!! 

 

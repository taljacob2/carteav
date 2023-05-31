# carteav - cinemas

## Run Via Docker Compose

> ### Prerequisite
> Install [docker desktop](https://docs.docker.com/desktop/).

  - To run the application:

    ```
    docker-compose up --build -d
    ```
    
    The application opens at http://localhost:3001

    > **NOTE:** The first initialization of the database may take about 10 seconds.

  - To stop the application:

    ```
    docker-compose down
    ```

## Connection Details

|Title|Detail|
|:---|:---|
|SQL Server Type:|MySQL|
|SQL Server UI:|http://localhost:8061/|
|SQL Server Name:|`db`|
|SQL Server Username:|`root`|
|SQL Server Password:|`123456`|
|SQL Server Database:|`cinemadb`|

### Special Notes

The administrator **username** is `admin`, and it is the only administrator user,
which is able to **approve / decline** a purchase.

You can login to the `admin` user through the login page.

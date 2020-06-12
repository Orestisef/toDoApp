# Description 

This is a simple ToDo application using React as frontend and Drupal8 backend. 

## Dependencies

- Composer tool : This tool used to install the Drupal site and some dependencies.
- Drupal8 : Use it as a Backend service.
- custom_api module : This is a custom api module that serves as an endpoint. This is locaded in `web\modules\custom_api`
- React toDo App module : This is a custom module to embed the React todo app on Drupal as a block.  This is locaded in `web\modules\react_todo`

# How to install

1. Git clone this repo
2. Create a database with `utf8_general_ci` format. Remember the db credentials (dbname username password)
3. Copy `web\sites\example.setting.local.php` to `web\sites\default\setting.local.php`.
4. Copy the following to the end of the file.

```
    $databases['default']['default'] = array (
    'database' => '{dbname}',
    'username' => '{dbusername}',
    'password' => '{dbpass}',
    'prefix' => '',
    'host' => 'localhost',
    'port' => '3306',
    'namespace' => 'Drupal\\Core\\Database\\Driver\\mysql',
    'driver' => 'mysql',
    );
```
5. Import `initial\backup-2020-06-11T19-27-40.mysql.gz` to the database.
6. Run `composer install`.
7. Load page. Make sure to load the web folder otherwise the page won't be loaded successfully.
    If everything is fine you will see the following..
    
    ![alt text](https://github.com/Orestisef/toDoApp/blob/master/toDoApp.gif "Demo" ) 

curl --location --request POST "127.0.0.1:8000/api/persona" --header "Content-Type: application/json" --data-raw "{
    \"id\": \"a18e32e6-db09-4324-8189-3781d27a1b8c\",
    \"nombre\": \"Danilo1\",
    \"email\": \"danilo1@danilo.com\",
    \"movil\": \"666555444\",
    \"dni\": \"45555522L\",
    \"codigo_rfid\": \"76464764674767\",
    \"imagen\": \"https://www.images.com/danilo1\",
    \"rol\": \"profesor\",
    \"usuario\": \"danilo1\",
    \"password\": \"danilo1\",
    \"estado\": \"alta\",
    \"token_sesion\": \"\"
}"
curl --location --request POST "127.0.0.1:8000/api/persona" --header "Content-Type: application/json" --data-raw "{
    \"id\": \"962a447f-17d6-4bb6-98a9-3c0b1fc407b8\",
    \"nombre\": \"Danilo2\",
    \"email\": \"danilo2@danilo.com\",
    \"movil\": \"666555444\",
    \"dni\": \"45555523L\",
    \"codigo_rfid\": \"76464764674768\",
    \"imagen\": \"https://www.images.com/danilo2\",
    \"rol\": \"alumno\",
    \"usuario\": \"danilo2\",
    \"password\": \"danilo2\",
    \"estado\": \"alta\",
    \"token_sesion\": \"\"
}"
curl --location --request POST "127.0.0.1:8000/api/persona" --header "Content-Type: application/json" --data-raw "{
    \"id\": \"166f05e0-935f-4714-9b21-b241c3b722f0\",
    \"nombre\": \"Danilo3\",
    \"email\": \"danilo3@danilo.com\",
    \"movil\": \"666555444\",
    \"dni\": \"45555524L\",
    \"codigo_rfid\": \"76464764674769\",
    \"imagen\": \"https://www.images.com/danilo3\",
    \"rol\": \"alumno\",
    \"usuario\": \"danilo3\",
    \"password\": \"danilo3\",
    \"estado\": \"alta\",
    \"token_sesion\": \"\"
}"
curl --location --request POST "127.0.0.1:8000/api/objeto" --header "Content-Type: application/json" --data-raw "{
    \"id\": \"6ddab13b-bb69-456b-8095-3e3e0e00029f\",
    \"nombre\": \"Objeto 1\",
    \"descripcion\": \"Descripción del objeto 1\",
    \"familia\": \"\",
    \"categoria\": \"\",
    \"subcategoria\": \"\",
    \"numero_serie\": \"1\",
    \"estado_en_almacen\": \"en deposito\",
    \"propietario\": \"a18e32e6-db09-4324-8189-3781d27a1b8c\",
    \"localizacion\": \"zona1\",
    \"codigo_rfid\": \"1\",
    \"imagen\": \"\",
    \"estado_objeto\": \"nuevo\"
}"
curl --location --request POST "127.0.0.1:8000/api/objeto" --header "Content-Type: application/json" --data-raw "{
    \"id\": \"d8ef6526-0371-4fb1-9728-9aa9b7f6e5c4\",
    \"nombre\": \"Objeto 2\",
    \"descripcion\": \"Descripción del objeto 2\",
    \"familia\": \"\",
    \"categoria\": \"\",
    \"subcategoria\": \"\",
    \"numero_serie\": \"2\",
    \"estado_en_almacen\": \"en deposito\",
    \"propietario\": \"a18e32e6-db09-4324-8189-3781d27a1b8c\",
    \"localizacion\": \"zona1\",
    \"codigo_rfid\": \"2\",
    \"imagen\": \"\",
    \"estado_objeto\": \"nuevo\"
}"
curl --location --request POST "127.0.0.1:8000/api/objeto" --header "Content-Type: application/json" --data-raw "{
    \"id\": \"b90f22d7-fab1-45bb-8a64-38a5edd7cd85\",
    \"nombre\": \"Objeto 3\",
    \"descripcion\": \"Descripción del objeto 3\",
    \"familia\": \"\",
    \"categoria\": \"\",
    \"subcategoria\": \"\",
    \"numero_serie\": \"3\",
    \"estado_en_almacen\": \"en deposito\",
    \"propietario\": \"a18e32e6-db09-4324-8189-3781d27a1b8c\",
    \"localizacion\": \"zona1\",
    \"codigo_rfid\": \"3\",
    \"imagen\": \"\",
    \"estado_objeto\": \"nuevo\"
}"
curl --location --request POST "127.0.0.1:8000/api/detector" --header "Content-Type: application/json" --data-raw "{
    \"id\": \"70f5436d-ab30-4e0b-9bf3-ab65cb5e13c4\",
    \"descripcion\": \"Detector 1\",
    \"localizacion\": \"zona1\"
}"
curl --location --request POST "127.0.0.1:8000/api/accion" --header "Content-Type: application/json" --data-raw "{
    \"id\": \"ae29b30f-0260-41de-9767-ea8d82a16c13\",
    \"tipo\": \"ingreso\",
    \"persona\": \"a18e32e6-db09-4324-8189-3781d27a1b8c\",
    \"objeto\": \"6ddab13b-bb69-456b-8095-3e3e0e00029f\",
    \"detector\": \"70f5436d-ab30-4e0b-9bf3-ab65cb5e13c4\"
}"
curl --location --request POST "127.0.0.1:8000/api/accion" --header "Content-Type: application/json" --data-raw "{
    \"id\": \"5f910cca-1777-4efa-a257-b548becc6c5d\",
    \"tipo\": \"salida\",
    \"persona\": \"a18e32e6-db09-4324-8189-3781d27a1b8c\",
    \"objeto\": \"6ddab13b-bb69-456b-8095-3e3e0e00029f\",
    \"detector\": \"70f5436d-ab30-4e0b-9bf3-ab65cb5e13c4\"
}"
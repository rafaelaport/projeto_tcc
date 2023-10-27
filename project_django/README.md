# To do

- [x] Create a docker compose to make more simple the execution of the app
- [x] Create a User model to user owners of the devices and for administrators
- [x] Create a functionality to log in and log out for the user
- [x] Create a Devices model for their owners
  - [x] Create a detail page for each device
    - [x] Solve problem with update page, name of fields are in English and the field user are enable
    - [x] Create field to activate or deactivate device
    - [x] Create function to take measurement on page of device detail - force
      - [x] Create a field to save the range of period to measurement
  - [x] Create a chart with last month's measurements
  - [ ] Create function to take measurement by period setted by device owner - automatic
- [x] Create a integration with Marmeid Diagram to Show a Process of installation
- [x] Create a integration with Marmeid Diagram to Show a Process of create device's user

----> superuser credentials = e-mail + 123456

# First execution

## Precondition

1. Python 3.10 or higher or Anaconda Community.
2. Docker and Docker-Compose.

## Steps

1. Chose a directory and create a new folder with any name;
2. Open de terminal and type the follow code:

- Conda

  ``` bash
  conda create --prefix ./env python=3.10 
  ```

- Python

  ```bash
  python -m venv ./venv
  ```

3. Active the enviroment

- Conda

  ```bash
  conda activate ./env
  ```

- Python

  ```bash
  source ./venv/bin/activate
  ```

4. Install the djang librarie

```bash
pip instal django
```

5. Create a Project django

```bash
django-admin startproject <project_name> .
# Use '.' at the final line of code to create a project at the same folder, if you want to create a new folder remove the dot.
```

6. Running the project

```bash
python manage.py runserver
```

7. Checking if is Running

- Open your browser and type 127.0.0.1/8000 or localhost:8000, if on the page appear Django with a rocket means that all was done correctly.

# Second and further runs

## Only you sure that the image docker exists

1. Go to the folder that there is the docker-compose file.
2. Runs the follow code in the terminal:

```bash
docker-compose up --build
```

# Fixing problems with

## Table Custom User not exists

If the error message "django.db.utils.OperationalError: no such table: users_customuser" appear when you are trying to execute "python manage.py runserver", run the follow command to solve it:

```bash
python manage.py migrate --run-syncdb
```

# Technologies used

- [Ionic](https://ionic.io/ionicons)
- [Bootstrap 5](https://getbootstrap.com/docs/5.3/getting-started/introduction/)
- [Django](https://www.djangoproject.com/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

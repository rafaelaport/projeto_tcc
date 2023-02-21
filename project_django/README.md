# To do
- [x] Create a docker compose to make more simple the execution of the app
- [ ] Create a User model to user owners of the devices and for administrators
- [ ] Create a functionality to log in and log out for the user
- [ ] Create a Devices model for their owners
- [ ] Create a integration with Marmeid Diagram to Show a Process of instalation
- [ ] Create a integration with Marmeid Diagram to Show a Process of create device's user

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
  python -m venv ./env
  ```
3. Active the enviroment
  - Conda
  ```bash
  conda activate ./env
  ```
  - Python
  ```bash
  source ./env/bin/activate
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
## Only you sure that the image docker exists.
1. Go to the folder that there is the docker-compose file.
2. Runs the follow code in the terminal:
```bash
docker-compose up --build
```

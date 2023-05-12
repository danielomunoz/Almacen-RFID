#! /bin/sh

cd ./backend
deactivate
rm -rf backendev
pip3 install virtualenv
python3 -m virtualenv backendev
source ~/.bashrc
source ./backendev/bin/activate
pip3 install -r requirements.txt
python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py runserver 0.0.0.0:8000
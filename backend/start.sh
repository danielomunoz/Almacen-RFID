#! /bin/sh

deactivate
rm -rf backendev
pip3 install virtualenv
python3 -m virtualenv backendev
source ~/.bashrc
source ./backendev/bin/activate
pip3 install -r requirements.txt
cp ./util/favicon.ico ./backendev/lib/python3.8/site-packages/rest_framework/static/
echo '{% block style %}' >> ./backendev/lib/python3.8/site-packages/rest_framework/templates/rest_framework/api.html
echo '{{ block.super }}' >> ./backendev/lib/python3.8/site-packages/rest_framework/templates/rest_framework/api.html
echo '<link rel="shortcut icon" type="image/png" href="/static/favicon.ico" />' >> ./backendev/lib/python3.8/site-packages/rest_framework/templates/rest_framework/api.html
echo '{% endblock %}' >> ./backendev/lib/python3.8/site-packages/rest_framework/templates/rest_framework/api.html
python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py runserver 0.0.0.0:8000
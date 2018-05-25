from .settings import *

DEBUG = False

ALLOWED_HOSTS = ['206.81.4.24',]
SECRET_KEY=os.environ['SECRET']

STATIC_ROOT=os.path.join(BASE_DIR, "static")

STATICFILES_DIRS = [
    os.path.join(BASE_DIR, "assets"),
]

WEBPACK_LOADER = {
    'DEFAULT': {
            'BUNDLE_DIR_NAME': 'bundles/',
            'STATS_FILE': os.path.join(BASE_DIR, 'webpack-stats.json'),
        }
}

DATABASES = {
    'default': {
	'ENGINE': 'django.db.backends.postgresql_psycopg2',
	'NAME': 'temporaldb',
	'USER': 'tempus',
	'PASSWORD': 'time is the horizon of every understanding',
	'HOST': 'localhost',
	'PORT': '',
    }
}

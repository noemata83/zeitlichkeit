# Generated by Django 2.0.4 on 2018-04-19 15:10

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('tasks', '0005_auto_20180419_1011'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sprint',
            name='owner',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='sprints', to=settings.AUTH_USER_MODEL),
        ),
    ]

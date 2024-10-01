from django.core.exceptions import ObjectDoesNotExist
from src.models import User


class UserPersistence:
    @staticmethod
    def create_user(picture, email, phone, address, password, is_active=True):

        try:
            user = User(picture=picture,
                        email=email,
                        password=password,
                        phone=phone,
                        address=address,
                        is_active=is_active
                        )
            user.set_password(password)
            inserted_user = user.save()
            return inserted_user
        except Exception as e:
            return e

    @staticmethod
    def search_user(email):
        try:
            return User.objects.get(email=email)
        except ObjectDoesNotExist:
            return None
        except Exception as e:
            return e

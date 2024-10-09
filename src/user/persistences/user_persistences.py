from django.core.exceptions import ObjectDoesNotExist
from src.models import User
from django.forms.models import model_to_dict


class UserPersistence:
    @staticmethod
    def create_user(picture, email, phone, address, password, is_active=True):

        try:
            user = User(picture=picture,
                        email=email,
                        phone=phone,
                        address=address,
                        password=password,
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
            user = User.objects.get(email=email)
            serialized_user = model_to_dict(user)
            return serialized_user
        except ObjectDoesNotExist:
            return None
        except Exception as e:
            return e

    #User update method implementation in progress
    @staticmethod
    def update_user(picture, email, phone, address, password):
        try:
            user = User.objects.get(email=email)
            if picture:
                user.picture = picture
            if phone:
                user.phone = phone
            if address:
                user.address = address
            if password:
                user.set_password(password)
            user.save()

            return user

        except User.DoesNotExist:
            return "User not found"
        except Exception as e:
            return str(e)

    @staticmethod
    def delete_user(email):
        try:
            user = User.objects.get(email=email)
            user.delete()
            return "User deleted"
        except User.DoesNotExist:
            return "User not found"
        except Exception as e:
            return str(e)

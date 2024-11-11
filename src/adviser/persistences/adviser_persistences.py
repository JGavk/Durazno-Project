from src.models import Adviser
from django.forms.models import model_to_dict


class AdviserPersistence:
    def __init__(self):
        self.adviser = Adviser()

    def get_adviser(self):
        return self.adviser

    @staticmethod
    def search_adviser(email):
        try:
            adviser = Adviser.objects.get(email=email)
            serialized_adviser = model_to_dict(adviser)
            return serialized_adviser
        except Adviser.DoesNotExist:
            return None
        except Exception as e:
            return e

    @staticmethod
    def login_adviser(email, password):
        try:
            print(password)
            adviser = Adviser.objects.get(email=email)
            if adviser.password == password:
                return adviser
        except Adviser.DoesNotExist:
            return "Adviser does not exist"

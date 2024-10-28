from src.models import Adviser


class AdviserPersistence:
    def __init__(self):
        self.adviser = Adviser()

    def get_adviser(self):
        return self.adviser

    @staticmethod
    def login_adviser(username, password):
        try:
            adviser = Adviser.objects.get(username=username)
            if adviser.check_password(password):
                return adviser
        except Adviser.DoesNotExist:
            return "Adviser does not exist"

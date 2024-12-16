from src.models import Adviser, Canine
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
            adviser = Adviser.objects.get(email=email)
            if adviser.password == password:
                return adviser
        except Adviser.DoesNotExist:
            return "Adviser does not exist"

    def get_advisor_by_email(email):
        return Adviser.objects.filter(email=email).first()
    
    @staticmethod
    def get_adv_by_id(id):
        try:
            adv = Adviser.objects.get(id=id)
            return {
                'username': adv.name,
                'email': adv.email,
                'active': adv.active,
            }
        except adv.DoesNotExist:
            return "Adviser not found"
        except Exception as e:
            return str(e)

    @staticmethod
    def register_canine(picture,
                        age,
                        race,
                        pedigree,
                        gender,
                        color,
                        vaccines,
                        price):
        try:
            canine = Canine(
                picture=picture,
                age=age,
                race=race,
                pedigree=pedigree,
                gender=gender,
                color=color,
                vaccines=vaccines,
                price=price,
            )
            inserted_canine = canine.save()
            return inserted_canine
        except Exception as e:
            return str(e)

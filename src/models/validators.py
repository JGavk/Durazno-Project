import re
from django.core.exceptions import ValidationError

def validate_password_strength(password):
    """
    Valida que la contraseña cumpla con los criterios de seguridad.
    """
    if len(password) < 8:
        raise ValidationError("La contraseña debe tener al menos 8 caracteres.")
    if not any(char.islower() for char in password):
        raise ValidationError("La contraseña debe incluir al menos una letra minúscula.")
    if not any(char.isupper() for char in password):
        raise ValidationError("La contraseña debe incluir al menos una letra mayúscula.")
    if not any(char.isdigit() for char in password):
        raise ValidationError("La contraseña debe incluir al menos un número.")
    if not re.search(r'[!@#$%^&*(),.?":{}|<>]', password):
        raise ValidationError("La contraseña debe incluir al menos un carácter especial (!, @, #, etc.).")

def validate_username(username):
    """
    Valida que el nombre de usuario solo contenga caracteres permitidos.
    """
    if not re.match(r'^[a-z]+$', username):
        raise ValidationError("El nombre de usuario solo puede contener letras, números y guiones bajos.")

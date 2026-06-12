import os
from supabase import create_client

_supabase = None

def get_supabase():
    global _supabase
    if _supabase is None:
        _supabase = create_client(os.getenv('SUPABASE_URL'), os.getenv('SUPABASE_KEY'))
    return _supabase
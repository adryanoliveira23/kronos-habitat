import os
import re

file_path = r'd:\Documentos\kronos-habit att\kronos-habit att\.env.local'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Find the key line
match = re.search(r'FIREBASE_ADMIN_PRIVATE_KEY=(.*)', content)
if match:
    raw_key = match.group(1)
    
    # Remove quotes if present
    if raw_key.startswith('"') and raw_key.endswith('"'):
        raw_key = raw_key[1:-1]
    
    # Remove invalid backslashes (not followed by n)
    # We use a negative lookahead to keep \n
    fixed_key = re.sub(r'\\(?![n])', '', raw_key)
    
    # Ensure it's a single line and properly escaped for a quoted env var
    # Replace any actual newlines with \n literal
    fixed_key = fixed_key.replace('\n', '\\n').replace('\r', '')
    
    new_line = f'FIREBASE_ADMIN_PRIVATE_KEY="{fixed_key}"'
    new_content = re.sub(r'FIREBASE_ADMIN_PRIVATE_KEY=.*', new_line, content)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("SUCCESS: .env.local updated with fixed key.")
else:
    print("FAILURE: Key not found.")

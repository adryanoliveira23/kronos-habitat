import os

file_path = r'd:\Documentos\kronos-habit att\kronos-habit att\.env.local'
with open(file_path, 'rb') as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if b'FIREBASE_ADMIN_PRIVATE_KEY' in line:
        print(f"Line {i+1} found:")
        print(f"Length: {len(line)}")
        print(f"Raw (first 100 bytes): {line[:100]}")
        # Look for the MII part
        if b'MII' in line:
            print("MII found at offset:", line.find(b'MII'))
        else:
            print("MII NOT FOUND in this line")
        # Check next line too in case of literal newlines
        if i + 1 < len(lines):
            print(f"Next line (first 50 bytes): {lines[i+1][:50]}")

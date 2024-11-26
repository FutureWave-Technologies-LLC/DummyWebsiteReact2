import argparse
import os

parser = argparse.ArgumentParser()

#add arguments for terminal command to execute program
parser.add_argument("--ip", action="store_true")
args = parser.parse_args()

directories = [
    "./src/components",
    "./src/hooks",
    "./src/pages",
    "./src/router"
]

def replace_substring_in_files(directory, target_substring, replacement_substring):
    # Walk through each subdirectory and file in the specified directory
    for root, _, files in os.walk(directory):
        for file_name in files:
            file_path = os.path.join(root, file_name)
            
            # Process only text files
            try:
                with open(file_path, 'r', encoding='utf-8') as file:
                    file_data = file.read()
                    
                # Replace the target substring with the replacement substring
                new_data = file_data.replace(target_substring, replacement_substring)
                
                # Write the changes back to the file if replacements were made
                if new_data != file_data:
                    with open(file_path, 'w', encoding='utf-8') as file:
                        file.write(new_data)
                    print(f"Replaced '{target_substring}' with '{replacement_substring}' in {file_path}")
            except Exception as e:
                print(f"Failed to process {file_path}: {e}")

if args.ip:
    for directory in directories:
        replace_substring_in_files(directory, 'localhost', '3.17.148.157')
else:
    for directory in directories:
        replace_substring_in_files(directory, '3.17.148.157', 'localhost')

    #Old: 3.142.185.208
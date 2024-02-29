import os

def list_subdirectories(folder_path):
    """
    Lists all non-hidden subdirectories within the specified folder.
    :param folder_path: Path to the folder.
    """
    subdirectories = []
    for item in os.listdir(folder_path):
        item_path = os.path.join(folder_path, item)
        if os.path.isdir(item_path) and not item.startswith('.'):
            # Compute the relative path
            relative_path = os.path.relpath(item_path, folder_path)
            # Add "./" prefix to the relative path
            subdirectories.append(f"./{relative_path}")

    return subdirectories

def write_subdirectories_to_file(subdirectories, output_file):
    """
    Writes subdirectory paths to a text file.
    :param subdirectories: List of subdirectory paths.
    :param output_file: Path to the output text file.
    """
    with open(output_file, 'w') as file:
        for subdir in subdirectories:
            file.write(subdir + '\n')
            print(subdir)

if __name__ == '__main__':
    current_folder = os.getcwd()  # Get the current working directory
    print(current_folder)
    subdirs = list_subdirectories(current_folder)
    output_filename = 'subdirectories.txt'
    write_subdirectories_to_file(subdirs, output_filename)
    print(f"Subdirectories listed in '{output_filename}'.")

import os
import base64

def save_file(file_data, file_extension):
    # Decode the base64-encoded file data
    file_data_decoded = base64.b64decode(file_data.split(",")[-1])

    # Generate a unique filename with the given file extension
    filename = f"temp_files/uploaded_file.{file_extension}"

    # Save the file in a temporary folder
    with open(filename, "wb") as f:
        f.write(file_data_decoded)

    return filename

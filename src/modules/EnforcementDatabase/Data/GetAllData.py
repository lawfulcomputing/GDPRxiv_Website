import os
import json
from datetime import datetime

BASE_URL = "https://github.com/lawfulcomputing/GDPRxiv/tree/main/"

def processTheData(data, country, urlPath):
    finalUrl = BASE_URL + urlPath
    finalUrl = finalUrl.replace(" ", "%20")
    formattedData = {"country": "", "date": "", "fine": "0", "decision": "N/A", "company": "", "quotedArt": "", "source": ""}
    formattedData["company"] = data["controller"]
    formattedData["country"] = os.path.basename(country).replace("_", " ")
    release_date = datetime.strptime(data["releaseDate"], "%d/%m/%Y").strftime("%m/%d/%Y")
    formattedData["date"] = release_date
    if "fine" in data:
        formattedData["fine"] = data["fine"]
    if "decision" in data:
        formattedData['decision'] = data["decision"]
    formattedData["quotedArt"] = data["articles"]
    formattedData["source"] = finalUrl.replace("\\", "/")
    return formattedData


def process_metadata_files(root_directory):
    # Define the list to store the JSON objects
    json_objects = []

    # Iterate through the directory structure
    for country_name in os.listdir(root_directory):
        country_directory = os.path.join(root_directory, country_name)
        if os.path.isdir(country_directory):
            countryName = country_directory
            for violation_type in os.listdir(country_directory):
                violation_directory = os.path.join(country_directory, violation_type)
                if os.path.isdir(violation_directory):
                    for hex_value in os.listdir(violation_directory):
                        hex_directory = os.path.join(violation_directory, hex_value)
                        if os.path.isdir(hex_directory):
                            urlPath = hex_directory.replace("GDPRxiv/", "");
                            metadata_file = os.path.join(hex_directory, 'metadata.json')
                            if os.path.isfile(metadata_file):
                                try:
                                    with open(metadata_file, 'r', encoding='utf-8') as f:
                                        metadata = json.load(f)
                                        if isinstance(metadata, list):
                                            for data in metadata:
                                                if "controller" in data:
                                                    json_objects.append(processTheData(data, countryName, urlPath))
                                        else:
                                            if 'controller' in metadata:
                                                json_objects.append(processTheData(metadata, countryName, urlPath))
                                except json.JSONDecodeError as e:
                                    print(f"Error processing {metadata_file}: {e}")
                                except Exception as e:
                                    print(f"Error: {e}")

    # Return the resulting JSON objects
    return json_objects


# Define the root directory
root_directory = 'GDPRxiv/documents'

# Run the script and get the JSON objects
result = process_metadata_files(root_directory)

# Write the resulting JSON objects to output.json
output_file = 'output.json'
with open(output_file, 'w') as f:
    json.dump(result, f, indent=4)

print(f"Saved {len(result)} records to {output_file}")
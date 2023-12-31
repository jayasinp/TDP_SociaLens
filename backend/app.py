# Pravin Mark Jayasinghe
# Data pipeline for SociaLens
from flask import Flask, request, jsonify, Response
from flask_cors import CORS
from flask.helpers import send_from_directory
import os
import shutil
from io import BytesIO
from werkzeug.utils import secure_filename
import pandas as pd
import json
from datetime import datetime
import traceback  # For printing detailed error messages
import hashlib
import networkx as nx
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph


# Import custom built modules
from clean import (drop_data_dictionary, drop_columns,
                   check_missing_values, fill_missing_values, check_outliers)
from revalidate_data import data_revalidate

# from year import analyze_dataset

app = Flask(__name__)
# Specify the origin port of data flowing the backend
cors = CORS(app, resources={
    r"/api/*": {
        "origins": ["http://localhost:3000"],
        "methods": ["GET", "POST", "PUT", "DELETE"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})  # Create the uploads folder and allow certain extensions only
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'xlsx', 'xls', 'csv'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['cleaned'] = 'cleaned'
app.config['graphs'] = 'graphs'
app.config['deidentified'] = 'deidentified'
CLEANED_DATASETS_FOLDER = 'cleaned'
GRAPH_FOLDER = 'graphs'
DEIDENTIFIED_FOLDER = 'deidentified'


all_data_dicts = {}  # Dictionary to store all the dictionaries of dataframes
cleaned_datasets = {}  # Dictionary to store all the cleaned datasets


def allowed_file(filename):
    # Check if the uploaded file has a valid extension.
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# PIPELINE 1: DATA UPLOAD ROUTE + SAVE TO all_data_dicts


@app.route('/api/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part in the request'}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)

        # Load the Excel file into a dictionary of DataFrames
        # and store it in the all_data_dicts dictionary
        if filename.rsplit('.', 1)[1].lower() in ['xlsx', 'xls']:
            dfs = pd.read_excel(file_path, sheet_name=None)
            all_data_dicts[filename] = dfs
            print(all_data_dicts)

        return jsonify({'message': 'File successfully uploaded. Please check Datasets.', 'filename': filename}), 200

    return jsonify({'error': 'Invalid file type'}), 400

# UTILITY 1: REFLECT THE UPLOADED DATASETS TO FRONT-END


@app.route('/api/uploaded_datasets', methods=['GET'])
def get_uploaded_datasets():
    # Retrieve the filenames (keys) from the all_data_dicts dictionary
    uploaded_files = list(all_data_dicts.keys())

    return jsonify({'uploaded_datasets': uploaded_files}), 200

# UTILITY 2: PRINT TO CONSOLE THE UPLOADED DATASETS DATA FRAMES NAMES


@app.route('/api/uploaded_datasets_dataframes', methods=['GET'])
def print_dataframe_names():
    dataframe_names = {}
    for filename, dataframes in all_data_dicts.items():
        dataframe_names[filename] = list(dataframes.keys())
    return jsonify(dataframe_names), 200

# PIPELINE 2: CLEAN AND VALIDATE THE DATA THEN SAVE TO all_data_dicts and EXPORT TO CLEANED


@app.route('/api/clean_validate_data', methods=['POST'])
def clean_validate_data():
    global cleaned_datasets  # To store cleaned datasets
    # Get the uploaded file names
    file_names = request.get_json().get('file_names')
    cleaned_datasets = {}  # Reset the cleaned_datasets dictionary

    for filename in file_names:
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)

        if filename.rsplit('.', 1)[1].lower() in ['xlsx', 'xls']:
            dfs = pd.read_excel(file_path, sheet_name=None)

            # Data cleaning steps
            dfs = drop_data_dictionary(dfs)
            dfs, dropped_info = drop_columns(dfs)
            missing_values_info = check_missing_values(dfs)
            dfs = fill_missing_values(dfs)
            outliers_info = check_outliers(dfs)

            # Data revalidation
            revalidation_results = data_revalidate(dfs)

            # Save the cleaned dataset
            cleaned_filename = f"cleaned_{filename}"
            cleaned_file_path = os.path.join(
                app.config['cleaned'], cleaned_filename)
            with pd.ExcelWriter(cleaned_file_path) as writer:
                for sheet_name, df in dfs.items():
                    df.to_excel(writer, sheet_name=sheet_name, index=False)

    return jsonify({'message': 'Data cleaned, validated, and saved successfully. Check the cleaned folder in the backend.', 'cleaned_datasets': cleaned_datasets}), 200

# UTILITY 3: PRINT TO CONSOLE THE CLEANED DATASETS DATA FRAMES NAMES


@app.route('/api/cleaned_datasets_dataframes', methods=['GET'])
def get_cleaned_dataframes():
    # Retrieve the names of cleaned dataframes from the 'cleaned_datasets' dictionary
    cleaned_dataframes_names = list(cleaned_datasets.keys())

    return jsonify({'cleaned_dataframes_names': cleaned_dataframes_names}), 200

# UTILITY 4: REFLECT THE CLEANED DATASETS TO FRONT-END


@app.route('/api/cleaned_datasets_list', methods=['GET'])
def get_cleaned_datasets_list():
    cleaned_files = []

    # Check if the "cleaned" folder exists
    cleaned_folder = os.path.join(app.root_path, CLEANED_DATASETS_FOLDER)
    if os.path.exists(cleaned_folder) and os.path.isdir(cleaned_folder):
        # List all files in the "cleaned" folder
        cleaned_files = [file for file in os.listdir(
            cleaned_folder) if file.endswith('.xlsx')]

    return jsonify({'cleaned_datasets_list': cleaned_files}), 200

# UTILITY 4.1: HELPER TO FETCH Participant-ID FOR A DATASET


def get_participant_ids(dataset_name):
    file_path = os.path.join(
        app.root_path, CLEANED_DATASETS_FOLDER, dataset_name)
    try:
        df = pd.read_excel(file_path, sheet_name='participants')
        participant_ids = df['Participant-ID'].tolist()
        return participant_ids
    except Exception as e:
        return []

# UTILITY 5: REFLECT THE SELECTED CLEAN DATASET PARTICIPANT IDs TO FRONT-END


@app.route('/api/participant_ids', methods=['POST'])
def get_participant_ids_for_dataset():
    data = request.get_json()
    selected_dataset = data.get('selected_dataset')

    if selected_dataset:
        participant_ids = get_participant_ids(selected_dataset)
        if participant_ids:
            return jsonify(participant_ids)

    return jsonify({"error": "Participant IDs not found for the selected dataset"}), 404

# TABLE 1: INDIVIDUAL METRICS


@app.route('/api/individual_metrics', methods=['POST'])
def get_individual_metrics():
    # Extract the necessary data from the request payload
    data = request.get_json()
    print("Received data:", data)  # Debugging line
    selected_dataset = data.get('selected_dataset')
    participant_id = data.get('participant_id')

    # Check if the dataset and participant_id are provided
    if not selected_dataset or not participant_id:
        return jsonify({"error": "Both selected_dataset and participant_id are required"}), 400

    # Construct the path to the dataset
    file_path = os.path.join(
        app.root_path, CLEANED_DATASETS_FOLDER, selected_dataset)
    print("Constructed file path:", file_path)  # Debugging line

    try:
        # Load the 'participants' sheet from the Excel file
        df = pd.read_excel(file_path, sheet_name='participants')
        print(df.head())  # Debugging line to check the first few rows

        # Convert the participant_id to an integer and then filter the rows based on it
        # Convert the participant_id to an integer
        participant_id_int = int(participant_id)
        # Use the integer value for filtering
        filtered_df = df[df['Participant-ID'] == participant_id_int]
        print("Filtered Data:", filtered_df)  # Debugging line

        # If no rows match the provided Participant-ID, return an error
        if filtered_df.empty:
            return jsonify({"error": f"No data found for Participant-ID {participant_id}"}), 404

        average_Perc_Effort = df['Perc_Effort'].mean()
        average_Perc_Academic = df['Perc_Academic'].mean()
        average_Attendance = df['Attendance'].mean()
        average_CompleteYears = df['CompleteYears'].mean()

        # Extract the necessary metrics
        metrics = {
            'Perc_Effort': int(filtered_df['Perc_Effort'].iloc[0]),
            'Perc_Academic': int(filtered_df['Perc_Academic'].iloc[0]),
            'Attendance': int(filtered_df['Attendance'].iloc[0]),
            'CompleteYears': int(filtered_df['CompleteYears'].iloc[0]),
            'House': str(filtered_df['House'].iloc[0]),
            'Average_Perc_Effort': average_Perc_Effort,
            'Average_Perc_Academic': average_Perc_Academic,
            'Average_Attendance': average_Attendance,
            'Average_CompleteYears': average_CompleteYears
        }

        return jsonify(metrics), 200

    except Exception as e:
        print("Exception occurred:", e)  # Debugging line
        return jsonify({"error": str(e)}), 500

# UTILITY 6: REFLECT YEAR METRICS TO FRONT-END


@app.route('/api/year_metrics', methods=['POST'])
def year_metrics():
    data = request.get_json()
    selected_dataset = data.get('selected_dataset')

    # Check if the dataset is provided
    if not selected_dataset:
        return jsonify({"error": "selected_dataset is required"}), 400

    file_path = os.path.join(CLEANED_DATASETS_FOLDER, selected_dataset)

    try:
        # Load the 'participants' sheet from the Excel file
        df = pd.read_excel(file_path, sheet_name='participants')

        # Perform the calculations
        num_students = len(df)
        avg_perc_effort = df['Perc_Effort'].mean()
        avg_attendance = df['Attendance'].mean()
        avg_perc_academic = df['Perc_Academic'].mean()
        avg_complete_years = df['CompleteYears'].mean()

        # Calculate the count of each house
        house_counts = df['House'].value_counts().to_dict()

        # Construct the results dictionary
        results = {
            'num_students': num_students,
            'avg_perc_effort': avg_perc_effort,
            'avg_attendance': avg_attendance,
            'avg_perc_academic': avg_perc_academic,
            'avg_complete_years': avg_complete_years,
            'house_counts': house_counts
        }

        return jsonify(results), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# UTILITY 7: REFLECT CLASS METRICS TO FRONT-END


@app.route('/api/class_metrics', methods=['POST'])
def get_class_metrics():
    # Get the selected dataset from the request data
    data = request.get_json()
    selected_dataset = data.get("selected_dataset")

    # Check if the dataset is provided
    if not selected_dataset:
        return jsonify({"error": "No dataset selected!"}), 400

    # Construct the full path to the dataset file
    file_path = os.path.join(CLEANED_DATASETS_FOLDER, selected_dataset)

    try:
        # Load the dataset
        df = pd.read_excel(file_path, sheet_name="participants")

        # Group by the House column and compute the mean for the specified columns
        grouped_data = df.groupby("House").agg({
            "Perc_Academic": "mean",
            "CompleteYears": "mean",
            "Perc_Effort": "mean",
            "Attendance": "mean"
        }).reset_index()

        # Convert the resulting DataFrame to a list of dictionaries
        result = grouped_data.to_dict(orient="records")

        return jsonify(result)

    except Exception as e:
        print("Exception encountered:", e)  # Print the exception for debugging
        return jsonify({"error": str(e)}), 500

# UTILITY 8: REFLECT EDGE LISTS TO FRONT-END


@app.route('/api/view_edge_lists', methods=['POST'])
def view_edge_lists():
    # Get the selected dataset from the request data
    data = request.get_json()
    selected_dataset = data.get("selected_dataset")

    if not selected_dataset:
        return jsonify({"error": "No dataset selected!"}), 400

    # Construct the full path to the dataset file
    file_path = os.path.join(CLEANED_DATASETS_FOLDER, selected_dataset)

    try:
        # Define a list of potential sheets (edge lists)
        potential_sheets = [
            "net_0_Friends", "net_1_Influential", "net_2_Feedback",
            "net_3_MoreTime", "net_4_Advice", "net_5_Disrespect",
            "net_affiliation_0_SchoolActivit"
        ]

        # Load the Excel file without specifying a sheet to get all available sheets
        xls = pd.ExcelFile(file_path)  # Using the file_path variable

        # Filter out the sheets that actually exist in the Excel file
        available_sheets = [
            sheet for sheet in potential_sheets if sheet in xls.sheet_names]

        return jsonify(available_sheets)

    except Exception as e:
        # Log the full error for debugging
        print("Error occurred:", e)
        return jsonify({"error": str(e)}), 500

# PIPELINE 3: CREATE JSON GRAPHS


@app.route('/api/create_json_graphs', methods=['POST'])
def create_json_graphs():
    try:
        data = request.get_json()
        selected_dataset = data.get("selected_dataset")
        selected_sheets = [
            "net_0_Friends", "net_1_Influential", "net_2_Feedback",
            "net_3_MoreTime", "net_4_Advice", "net_5_Disrespect",
            "net_affiliation_0_SchoolActivit"
        ]

        if not selected_dataset:
            return jsonify({"error": "Dataset not selected!"}), 400

        # Construct the path to the dataset file
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], selected_dataset)

        # Load the Excel file
        xls = pd.ExcelFile(file_path)

        for sheet_name in selected_sheets:
            if sheet_name not in xls.sheet_names:
                continue

            df = pd.read_excel(file_path, sheet_name=sheet_name)

            # Create the network_data for this sheet
            network_data = {
                "nodes": [{"id": node} for node in set(df['Source'].tolist() + df['Target'].tolist())],
                "links": [{"source": link["Source"], "target": link["Target"]} for index, link in df.iterrows()]
            }

            # Generate a unique JSON filename based on the sheet name
            current_time = datetime.now().strftime('%Y%m%d%H%M%S')
            json_filename = f"{sheet_name}_{current_time}.json"
            json_filepath = os.path.join(
                app.config['GRAPH_FOLDER'], json_filename)

            with open(json_filepath, 'w') as json_file:
                json.dump(network_data, json_file, indent=4)

        return jsonify({"success": "JSON graphs created and saved for selected sheets!"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# PIPELINE 4: PROCESS SURVEY DATA


@app.route('/api/process_survey_data', methods=['POST'])
def process_survey_data():
    try:
        # Retrieve the selected dataset from the request data
        selected_dataset = request.json.get('selected_dataset')

        # Ensure that the selected dataset is provided
        if not selected_dataset:
            return jsonify({"error": "Dataset not selected!"}), 400

        # Construct the full path to the dataset file
        file_path = os.path.join(CLEANED_DATASETS_FOLDER, selected_dataset)

        # Load the dataset using pandas
        df = pd.read_excel(file_path, sheet_name="responses")

        # Calculate the average for each specified column
        averages = {
            "Manbox5_overall": df["Manbox5_overall"].mean(),
            "isolated": df["isolated"].mean(),
            "Masculinity_contrained": df["Masculinity_contrained"].mean(),
            "GrowthMindset": df["GrowthMindset"].mean(),
            "COVID": df["COVID"].mean(),
            "MenBetterSTEM": df["MenBetterSTEM"].mean(),
            "pwi_wellbeing": df["pwi_wellbeing"].mean(),
            "School_support_engage": df["School_support_engage"].mean(),
            "future": df["future"].mean()
        }

        return jsonify(averages), 200

    except Exception as e:
        # In case of any error, return the error as a response
        print(traceback.format_exc())  # Print detailed exception info
        return jsonify({"error": str(e)}), 500

# PIPELINE 5: DEIDENTIFY DATA


@app.route('/api/deidentify_data', methods=['POST'])
def deidentify_data():
    try:
        # Check if the "cleaned" folder exists
        cleaned_folder = os.path.join(app.root_path, CLEANED_DATASETS_FOLDER)
        if not os.path.exists(cleaned_folder) or not os.path.isdir(cleaned_folder):
            return jsonify({'error': 'Cleaned folder not found'}), 400

        # Check if the "deidentified" folder exists, if not, create it
        deidentified_folder = os.path.join(app.root_path, DEIDENTIFIED_FOLDER)
        if not os.path.exists(deidentified_folder):
            os.makedirs(deidentified_folder)

        # Process each file in the "cleaned" folder
        for file in os.listdir(cleaned_folder):
            if file.endswith('.xlsx'):
                file_path = os.path.join(cleaned_folder, file)

                # Load the 'participants' sheet
                df = pd.read_excel(file_path, sheet_name='participants')

                # De-identify specified columns
                for col in ['First-Name', 'Last-Name', 'Email']:
                    df[col] = df[col].apply(
                        lambda x: hashlib.sha256(str(x).encode()).hexdigest())

                # Save the modified dataframe to the "deidentified" folder
                deidentified_path = os.path.join(deidentified_folder, file)
                with pd.ExcelWriter(deidentified_path) as writer:
                    df.to_excel(writer, sheet_name='participants', index=False)

        return jsonify({'message': 'Data deidentified, please check deidentified folder in the backend.'}), 200

    except Exception as e:
        print("Exception occurred:", e)
        return jsonify({"error": str(e)}), 500


# PIPELINE 6: NETWORKX PROCESSOR


@app.route('/api/networkx_processor', methods=['POST'])
def networkx_processor():
    try:
        data = request.get_json()
        selected_dataset = data.get("selected_dataset")

        # Check if the dataset is provided
        if not selected_dataset:
            return jsonify({"error": "Dataset not selected!"}), 400

        # Construct the path to the dataset file
        file_path = os.path.join(CLEANED_DATASETS_FOLDER, selected_dataset)

        sheets = [
            "net_0_Friends", "net_1_Influential", "net_2_Feedback",
            "net_3_MoreTime", "net_4_Advice", "net_5_Disrespect"
        ]

        results = {}

        for sheet in sheets:
            df = pd.read_excel(file_path, sheet_name=sheet)
            G = nx.from_pandas_edgelist(df, 'Source', 'Target')
            centrality = nx.degree_centrality(G)
            results[sheet] = centrality

        return jsonify(results), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# PIPELINE 7: REPORT GENERATOR


@app.route('/api/report_generator', methods=['POST'])
def report_generator():
    data = request.get_json()
    selected_dataset = data.get("selected_dataset")

    if not selected_dataset:
        return jsonify({"error": "Dataset not selected!"}), 400

    # Construct the path to the dataset file
    file_path = os.path.join(CLEANED_DATASETS_FOLDER, selected_dataset)

    # Load the dataset
    dfs = pd.read_excel(file_path, sheet_name=None)

    # Create the PDF
    buffer = BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=letter)
    story = []

    # Define styles
    styles = getSampleStyleSheet()
    title_style = styles['Title']
    normal_style = styles['Normal']

    # Title
    story.append(Paragraph("Generated Report", title_style))
    story.append(Paragraph(" ", normal_style))  # Adding a space

    if 'participants' in dfs:
        df_participants = dfs['participants']

        # Add participants data
        story.append(Paragraph("Participants Sheet Information", normal_style))

        # Metrics
        metrics = [
            ("Number of students", len(df_participants)),
            ("Average perceived academic effort",
             df_participants['Perc_Effort'].mean()),
            ("Average year school attendance",
             df_participants['Attendance'].mean()),
            ("Average academic performance",
             df_participants['Perc_Academic'].mean())
        ]

        for label, value in metrics:
            story.append(Paragraph(f"{label}: {value:.2f}", normal_style))

        # House distribution
        house_counts = df_participants['House'].value_counts(
        ).reset_index().values.tolist()
        table_data = [["House", "Count"]] + house_counts
        table = Table(table_data)
        table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.grey),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, 0), 14),
            ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
            ('BACKGROUND', (0, 1), (-1, -1), colors.beige),
            ('GRID', (0, 0), (-1, -1), 1, colors.black)
        ]))
        story.append(table)
        story.append(Paragraph(" ", normal_style))  # Adding a space

    if 'responses' in dfs:
        df_responses = dfs['responses']

        # Add responses data
        story.append(Paragraph("Responses Sheet Information", normal_style))

        columns_to_average = [
            "Manbox5_overall", "isolated", "Masculinity_contrained", "GrowthMindset",
            "COVID", "MenBetterSTEM", "pwi_wellbeing", "School_support_engage", "future"
        ]

        table_data = [["Column", "Average Value"]]
        for col in columns_to_average:
            avg_value = df_responses[col].mean()
            table_data.append([col, f"{avg_value:.2f}"])

        table = Table(table_data)
        table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.grey),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, 0), 14),
            ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
            ('BACKGROUND', (0, 1), (-1, -1), colors.beige),
            ('GRID', (0, 0), (-1, -1), 1, colors.black)
        ]))
        story.append(table)

    doc.build(story)

    buffer.seek(0)
    return Response(buffer, content_type='application/pdf', headers={'Content-Disposition': 'inline; filename=report.pdf'})


if __name__ == "__main__":
    # Check if uploads folder exists, if not, create it
    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)
    app.run(port=5001, debug=True)

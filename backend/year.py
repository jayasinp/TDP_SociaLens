# Pravin Mark Jayasinghe
# File to analyse SNA for the whole dataset
import pandas as pd
import networkx as nx
from networkx.readwrite import json_graph

# List of sheet names that contain graph data
graph_sheets = [
    'net_0_Friends',
    'net_1_Influential',
    'net_2_Feedback',
    'net_3_MoreTime',
    'net_4_Advice',
    'net_5_Disrespect',
    'net_affiliation_0_SchoolActivit'
]

def analyze_dataset(file_path):
    """Analyze the selected dataset and return processed data."""
    
    # Store the JSON representations of the graphs and DataFrames
    json_graphs = {}
    dataframes = {}

    # Read each sheet and process the graph data
    for sheet in graph_sheets:
        # Debug: print the sheet name
        print(f"Processing sheet: {sheet}")
        
        df = pd.read_excel(file_path, sheet_name=sheet)

        # Rename columns to lowercase
        df = df.rename(columns={"Source": "source", "Target": "target"})
        
        # Debug: print the columns and the first few rows of the dataframe
        print(f"Columns in {sheet}: {df.columns}")
        print(f"First few rows of {sheet}:\n", df.head())

        # Create graph from edgelist
        G = nx.from_pandas_edgelist(df)
        
        # Convert NetworkX graph to JSON format and store in the dictionary
        json_graphs[sheet] = json_graph.node_link_data(G)
        dataframes[sheet] = df

    return json_graphs, dataframes

import re
import pickle

INPUT_PATH = "../app/data/TotalsByStateByYear.txt"
OUTPUT_PATH = "../ProcessedData/StatePositions.pkl"

def tsv(filepath, categoryName):
    """Reads the file and returns a list of dictionaries keyd by the columns headers whose values are the column values."""
    with open(filepath, 'rU') as f:
        rawData = f.read()
    lines = rawData.split('\n')
    headers = [re.sub('"', '', header) for header in lines[0].split('\t')]
    body = [line for line in lines[1:] if line != ""]
    data = []
    for bodyLine in body:
        columns = bodyLine.split('\t')
        datum = {}
        for index, columnValue in enumerate(columns):
            columnValue = re.sub('"', '', columnValue)
            datum[headers[index]] = columnValue
        data.append(datum)
    return data


objects = tsv(INPUT_PATH, "blah")

indices = {}
for object in objects:
    if object["State"] not in indices:
        indices[object["State"]] = {"Row": object["Row"], "Space": object["Space"]}

pickle.dump(indices, open(OUTPUT_PATH, 'wb'))

indices = pickle.load(open(OUTPUT_PATH, 'rb'))

for index in indices.keys():
    print "%s: %s  %s" % (index, indices[index]["Row"], indices[index]["Space"])


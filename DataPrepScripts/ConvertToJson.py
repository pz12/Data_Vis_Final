import json
import glob
import re
import pickle

DataCategories = {
    "Gender" : "Crude Rate",
    "Race" : "Crude Rate",
    "DayOfTheWeek" : "Deaths",
    "PlaceOfDeath" : "Deaths",
    "Totals" : "Crude Rate"
}

DATA_DIR_PATH = "../RawData/NewCodesClean/*"
OUT_FILEPATH = "../ProcessedData/ProjectData.json"
STATE_POSITIONS_PATH = "../ProcessedData/StatePositions.pkl"

def filterFiles(filterString, dirPath=DATA_DIR_PATH):
    allFiles = glob.glob(dirPath)
    filteredFiles = [filename for filename in allFiles if re.search(re.escape(filterString), filename)]
    return filteredFiles

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

def filterObjKeys(keysToRemove, obj):
    cleanObj = {}
    for key, value in obj.iteritems():
        if key not in keysToRemove:
            cleanObj[key] = value
    return cleanObj

# Read in the state positions
statePositions = pickle.load(open(STATE_POSITIONS_PATH, 'rb'))

# create the master dictionary that will be dumped to JSON.
master = {}

# Begin by processing top level categories (AllStatesAllYears)
topLevelFilterString = "AllStatesAllYears"
exclude = "Totals"

topLevelFilepaths = [path for path in filterFiles(topLevelFilterString) if not re.search(re.escape(exclude), path)]

for categoryName in DataCategories.keys():
    if categoryName == exclude:
        continue
    filepath = [path for path in topLevelFilepaths if re.search(re.escape(categoryName), path)][0]
    data = tsv(filepath, categoryName)
    master[categoryName + "Rates"] = data


# Process level 2(ByStateAllYears
master["States"] = {}
statesDict = master["States"]
topLevelFilterString = "ByStateAllYears"
keysToRemove = ["State", "State Code"]

topLevelFilepaths = filterFiles(topLevelFilterString)

for categoryName in DataCategories.keys():
    filepath = [path for path in topLevelFilepaths if re.search(re.escape(categoryName), path)][0]
    data = tsv(filepath, categoryName)
    for datum in data:
        if datum["State"] not in statesDict:
            singleStateDict = {
                "StateName": datum["State"],
                "Years": {}
            }
            for category in DataCategories.keys():
                singleStateDict[category + "Rates"] = []
            statesDict[datum["State"]] = singleStateDict
        statesDict[datum["State"]][categoryName + "Rates"].append(filterObjKeys(keysToRemove, datum))


#Process level 3 (ByStateByYear)
topLevelFilterString = "ByStateByYear"
keysToRemove = ["State", "State Code", "Year", "Year Code"]

topLevelFilepaths = filterFiles(topLevelFilterString)

for categoryName in DataCategories.keys():
    filepath = [path for path in topLevelFilepaths if re.search(re.escape(categoryName), path)][0]
    data = tsv(filepath, categoryName)
    for datum in data:
        yearsDict = statesDict[datum["State"]]["Years"]
        if datum["Year"] not in yearsDict:
            singleYearDict = {
                "Year": datum["Year"],
            }
            for category in DataCategories.keys():
                singleYearDict[category + "Rates"] = []
            yearsDict[datum["Year"]] = singleYearDict
        yearsDict[datum["Year"]][categoryName + "Rates"].append(filterObjKeys(keysToRemove, datum))


#Process level 4 (AllStatesByYear)
master["Years"] = {}
yearsDict = master["Years"]
topLevelFilterString = "AllStatesByYear"
keysToRemove = ["Year", "Year Code"]

topLevelFilepaths = filterFiles(topLevelFilterString)

for categoryName in DataCategories.keys():
    filepath = [path for path in topLevelFilepaths if re.search(re.escape(categoryName), path)][0]
    data = tsv(filepath, categoryName)
    for datum in data:
        if datum["Year"] not in yearsDict:
            singleYearDict = {
                "Year": datum["Year"]
            }
            for category in DataCategories.keys():
                singleYearDict[category + "Rates"] = []
            yearsDict[datum["Year"]] = singleYearDict
        yearsDict[datum["Year"]][categoryName + "Rates"].append(filterObjKeys(keysToRemove, datum))

# Process level 5 (Cause of Death)
# This data has no spacial granularity, it is only organized by year.
master["CauseOfDeathRates"] = []
causeOfDeathObj = master["CauseOfDeathRates"]
filenameRegex = "Cause_of_Death"
filteredPaths = filterFiles(filenameRegex, dirPath="../RawData/CauseOfDeathClean/*")
filenameRegex = re.compile("Cause_of_Death_(\d\d\d\d).txt")
aggregateObj = {}

for filepath in filteredPaths:
    objects = tsv(filepath, "CauseOfDeath")
    match = filenameRegex.search(filepath)
    year = match.group(1)
    yearObj = yearsDict[year]
    yearObj["CauseOfDeathRates"] = []
    yearObj["CauseOfDeathRates"].extend(objects)
    for codObj in objects:
        if codObj["ICD_Code"] not in aggregateObj:
            aggregateObj[codObj["ICD_Code"]] = {"ICD_Code" : codObj["ICD_Code"],
                                                "Cause_of_Death" : codObj["Cause_of_Death"],
                                                "Num_Deaths" : 0}
        aggregateObj[codObj["ICD_Code"]]["Num_Deaths"] += int(codObj["Num_Deaths"])

for key in aggregateObj.keys():
    obj = aggregateObj[key]
    obj["Num_Deaths"] = str(obj["Num_Deaths"])

causeOfDeathObj.extend(aggregateObj.values())

#Process level 6 (State positions)
# Add state positions to state all-year totals and state by-year totals
statesDict = master["States"]
for stateName in statesDict.keys():
    stateRow = statePositions[stateName]["Row"]
    stateSpace = statePositions[stateName]["Space"]
    totalsList = statesDict[stateName]["TotalsRates"]
    for totalsObj in totalsList:
        totalsObj["State"] = stateName
        totalsObj["Row"] = stateRow
        totalsObj["Space"] = stateSpace
    stateYearsDict = statesDict[stateName]["Years"]
    for year in stateYearsDict.keys():
        totalsList = stateYearsDict[year]["TotalsRates"]
        for totalsObj in totalsList:
            totalsObj["State"] = stateName
            totalsObj["Row"] = stateRow
            totalsObj["Space"] = stateSpace
            totalsObj["Year"] = year


with open(OUT_FILEPATH, 'w') as f:
    json.dump(master, f)
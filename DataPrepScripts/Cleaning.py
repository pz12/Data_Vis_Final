"""This script removes all rows that give totals of other rows and also removes the 'notes' column, saving the cleaned
data to the 'outDir' directory."""

import glob
import re
dataDir = "../RawData/NewCodes/*"
outDir = "../RawData/NewCodesClean/"

dirItems = glob.glob(dataDir)

def getItemName(item):
    return item.split('/')[-1]

for item in dirItems:
    with open(item, 'rU') as inFile:
        rawData = inFile.read()

    with open(outDir + getItemName(item), 'w') as outFile:
        lines = rawData.split('\n')
        for line in lines:
            columns = line.split('\t')
            if re.search("Total", columns[0]):
                continue
            if re.search("---", columns[0]):
                break
            else:
                outFile.write("\t".join(columns[1:]) + "\n")

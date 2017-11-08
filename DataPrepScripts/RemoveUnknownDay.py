"""This script removes any rows that contain the value 'unknown' as the day of the week and removes the last two
columns from data files containing day of the week information to speed up data transfer. (These columns all contain
the value 'Not Applicable')"""

import re
import glob

DATA_DIR = "../RawData/NewCodesClean/"
FILENAME_REGEX = r"DayOfTheWeek"

def getItemName(item):
    return item.split('/')[-1]

for filepath in glob.glob(DATA_DIR + '*'):
    filename = getItemName(filepath)
    if re.match(FILENAME_REGEX, filename):
        print "Found file: %s" % filename
        with open(DATA_DIR + filename, "rU") as inFile:
            data = inFile.read()

        outString = ""
        lines = data.split('\n')
        for line in lines:
            if re.search("Unknown", line):
                continue
            else:
                columns = line.split('\t')
                outString += '\t'.join(columns[:-2]) + "\n"

        with open(DATA_DIR + filename, 'w') as outFile:
            outFile.write(outString)



import pandas as pd

states = pd.read_table("RawData/NewCodesClean/TotalsByStateByYear.txt")


otherstates = pd.read_csv("src/Year_Timeline_2012.csv", sep=",")
states['Row'] = otherstates['Row']
for _, row in states.iterrows():
	for index2, row2 in otherstates.iterrows():
		if row['State'] == row2['State']:
			states.at[_, 'Space'] = row2['Space']
			states.at[_, 'Row'] = row2['Row']
		if row['State']== "District of Columbia":
			states.at[_, 'Space'] = 10.0
			states.at[_, 'Row'] = 4.0
	

states['Row'] = states['Row'].astype(int)
states['Space'] = states['Space'].astype(int)

states.to_csv('TotalsByStateByYear.txt', sep='\t')
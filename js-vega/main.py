import sys
import time
import pandas as pd
import numpy as np
from pymapd import connect

def connect_to_omnisci(str_user, str_password, str_host, str_dbname, isCloud):
    try:
        if (isCloud):
            connection = connect(user=str_user, password=str_password, host=str_host, dbname=str_dbname, port=443, protocol='https')
        else:
            connection = connect(user=str_user, password=str_password, host=str_host, dbname=str_dbname, port=6274)
    except Exception as ex:
        template = "An exception of type {0} occured. Arguments: \n{1!r}"
        message = template.format(type(ex).__name__, ex.args)
        print(message)
        # This is useful for cloud connection.
        # Omnisci Cloud instances pause during inactivity.
        if 'Omnisci Core not ready, try again' in message:
            print("Set connection to RETRY!")
            connection = "RETRY"
        else:
            connection = "ERROR"
    return connection

str_user = "admin"
str_password = "HyperInteractive"
str_host = "localhost"
str_dbname = "omnisci"
isCloud = False
connection = connect_to_omnisci(str_user, str_password, str_host, str_dbname, isCloud)

list_of_tables = connection.get_tables()
print("\n".join(list_of_tables))

table_name = "flights_2008_7M"
table_details = connection.get_table_details(table_name)
print(table_details)

query = 'SELECT origin_city, origin_lon, origin_lat, dest_city, dest_lon, dest_lat, dep_timestamp FROM %s WHERE carrier_name =  \'Southwest Airlines\' LIMIT 10000' % table_name
df = connection.execute(query)
print(df.rowcount)
if df.rowcount != 0:
    mylist = list(df)
else:
    print("No rows returned!")
df2 = pd.DataFrame(mylist, columns=['origin_city', 'origin_lon', 'origin_lat', 'dest_city', 'dest_lon', 'dest_lat', 'dep_timestamp'])
df2.dropna(inplace=True)
print(df2.head())

df2['flight_path'] = np.nan
for idx, flights in df2.iloc[0:].iterrows():
    linestring = "LINESTRING(" + df2.loc[idx, 'origin_lon'].astype(str) +" " + df2.loc[idx, 'origin_lat'].astype(str) +", " + df2.loc[idx, 'dest_lon'].astype(str) +" " + df2.loc[idx, 'dest_lat'].astype(str) +")"
    df2.loc[idx, 'flight_path'] = linestring
print(df2.head())

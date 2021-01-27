# Sets up db with Challenges User Photos tables

import sqlite3
# import urllib, json
# import requests
import pprint
# https://www.geeksforgeeks.org/python-pil-image-show-method/
# from PIL import Image
# import wget
# import time

def vac(c, conn):
    c.execute("VACUUM")
    conn.commit()


def createTable(c):
    # drops table in case it already exists
    # resets database
    c.execute("DROP TABLE USERS")
    c.execute("DROP TABLE TASKS")
    c.execute("DROP TABLE PHOTOS")

    
    c.execute('''CREATE TABLE USERS(
                    ID             INT PRIMARY KEY     NOT NULL,
                    NAME          TEXT                NOT NULL,
                    SCORE         INT                NOT NULL,
                    TASKS           TEXT,
                    PROG            TEXT
                    )''')

    c.execute('''CREATE TABLE TASKS(
                    ID             INT PRIMARY KEY     NOT NULL,
                    TASK          TEXT                NOT NULL,
                    DESC         TEXT,
                    LEN         INT,
                    PPL          INT                
                    )''')

    c.execute('''CREATE TABLE PHOTOS(
                    ID             INT PRIMARY KEY     NOT NULL,
                    PHOTO          BLOB                NOT NULL,
                    CAP         TEXT,
                    NAME          TEXT               
                    )''')


# https://pynative.com/python-sqlite-blob-insert-and-retrieve-digital-data/
def convertToBinaryData(filename):
    #Convert digital data to binary format
    with open(filename, 'rb') as file:
        blobData = file.read()
    return blobData


def fillDummy(conn, cursor):
    # clear data from previuous attempts
    cursor.execute("DELETE FROM USERS")
    cursor.execute("DELETE FROM TASKS")
    cursor.execute("DELETE FROM PHOTOS")
    conn.commit()

    #    fill users table with dummy data
    names = ['aaron', 'ezra', 'cy', 'alan', 'bob']
    scores = [5, 31, 11, 16, 2]
    taskIDs = ['0,1', '1,2', '0,1,2,3,4', '5', '2,3']
    progs = ['5,2', '11,8', '1,4,5,1,10', '25', '3,6']

    for i in range(5):
        values = (i, names[i], scores[i], taskIDs[i], progs[i])
        query = '''INSERT INTO USERS(ID,NAME,SCORE,TASKS,PROG) 
                    VALUES (?,?,?,?,?)'''
        cursor.execute(query, values)
        conn.commit()

    #    fill tasks table
    tasks = ['Pushups', '5K', 'Yoga', 'Squats', 'Sprints']
    descs = ['Do 100 pushups per day for 30 days', 'Run a 5K around campus or enjoy the scenes around town', 'Practice yoga at the intensity that feels right for you. Aim for a 30 or 60 minute session, once per day.', 'Squat Squat Squat', 'Sprint Sprint Sprint']
    lens = [30,30,10,30,20]
    ppl = [10, 19, 33, 4, 6]

    for i in range(5):
        values = (i, tasks[i], descs[i], lens[i], ppl[i])
        query = '''INSERT INTO TASKS(ID,TASK,DESC,LEN,PPL) 
                    VALUES (?,?,?,?,?)'''
        cursor.execute(query, values)
        conn.commit()

    #    fill photos table
    pics = ['./pics/1.jpg', './pics/3.jpeg', './pics/4.jpg', './pics/5.jpg', './pics/6.jpeg']
    caps = ['I did it!!', 'Feeling much better post-workout', 'Remember to stay hydrated!', 'Proud of myself', 'Keep it up tigers!']
    names = ['ezra', 'aaron', 'cy', 'josh', 'jane']

    for i in range(5):
        values = (i, convertToBinaryData(pics[i]), caps[i], names[i])
        query = '''INSERT INTO PHOTOS(ID,PHOTO,CAP,NAME) 
                    VALUES (?,?,?,?)'''
        cursor.execute(query, values)
        conn.commit()


    # values = (id, title, artist, country, displayDate, date, image)

    # query = '''INSERT INTO OBJECTS(ID,TITLE,ARTIST,COUNTRY,DISPLAYDATE,DATE,IMAGE) 
    #                 VALUES (?,?,?,?,?,?,?)'''
    
    # c.execute(query, values)

def main():
    connTo = sqlite3.connect('fit.db')
    connTo.text_factory = str

    cTo = connTo.cursor()

    vac(cTo, connTo)

    # # create table 
    createTable(cTo)

    

    fillDummy(connTo, cTo)

    # fullSize = 15000
    # miniSize = int(fullSize * .01)

    # # get data from puam.db
    # query = "SELECT * FROM OBJECTS LIMIT" + str(miniSize)
    # rows = cFrom.execute(query)

    

    # # put data into mini-puam.db
    # for obj in rows:
    #     values = (obj[0],obj[1],obj[2],obj[3],obj[4],obj[5],obj[6])
    #     query = '''INSERT INTO OBJECTS(ID,TITLE,ARTIST,COUNTRY,DISPLAYDATE,DATE,IMAGE) 
    #                 VALUES (?,?,?,?,?,?,?)'''
    #     cTo.execute(query,values)
    #     connTo.commit()

    connTo.commit()
    connTo.close()
    # connFrom.close()



main()
# Sets up db with Challenges User Photos tables

import sqlite3
import json
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
    c.execute("DROP TABLE CHALLENGES")
    c.execute("DROP TABLE PHOTOS")


    c.execute('''CREATE TABLE USERS(
                    id             INT PRIMARY KEY     NOT NULL,
                    name          TEXT                NOT NULL,
                    score         INT                NOT NULL,
                    challenges           TEXT,
                    progresses            TEXT
                    )''')

    c.execute('''CREATE TABLE CHALLENGES(
                    id             INT PRIMARY KEY     NOT NULL,
                    challenge          TEXT                NOT NULL,
                    description         TEXT,
                    startDate       TEXT,
                    length         INT,
                    userCount          INT
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
    cursor.execute("DELETE FROM CHALLENGES")
    cursor.execute("DELETE FROM PHOTOS")
    conn.commit()

    #    fill users table with dummy data
    names = ['aaron', 'ezra', 'cy', 'alan', 'bob']
    scores = [5, 31, 11, 16, 2]
    challenges = [['Pushups','5k'], ['5k','Yoga'], ['Pushups', '5k', 'Yoga', 'Squats', 'Sprints'], ['Squats'], ['Yoga', 'Squats']]
    challengesJSON = [json.dumps(chalList) for chalList in challenges]
    progs = [['5','20'], ['10','85'], ['10','40','50','15','90'], ['25'], ['30','65']]
    progsJSON = [json.dumps(progList) for progList in progs]

    for i in range(5):
        values = (i, names[i], scores[i], challengesJSON[i], progsJSON[i])
        query = '''INSERT INTO USERS(id,name,score,challenges,progresses)
                    VALUES (?,?,?,?,?)'''
        cursor.execute(query, values)
        conn.commit()

    #    fill challenges table
    challenges = ['Pushups', '5K', 'Yoga', 'Squats', 'Sprints']
    descs = ['Do 100 pushups per day for 30 days', 'Run a 5K around campus or enjoy the scenes around town', 'Practice yoga at the intensity that feels right for you. Aim for a 30 or 60 minute session, once per day.', 'Squat Squat Squat', 'Sprint Sprint Sprint']
    startDates = ['5/5', '4/30', '5/12', '2/12', '3/4']
    lengths = [30,30,50,30,20]
    userCounts = [10, 19, 33, 4, 6]

    for i in range(5):
        values = (i, challenges[i], descs[i], startDates[i], lengths[i], userCounts[i])
        query = '''INSERT INTO CHALLENGES(id,challenge,description,startDate,length,userCount)
                    VALUES (?,?,?,?,?,?)'''
        cursor.execute(query, values)
        conn.commit()

    # #    fill photos table
    # pics = ['./pics/1.jpg', './pics/3.jpeg', './pics/4.jpg', './pics/5.jpg', './pics/6.jpeg']
    # caps = ['I did it!!', 'Feeling much better post-workout', 'Remember to stay hydrated!', 'Proud of myself', 'Keep it up tigers!']
    # names = ['ezra', 'aaron', 'cy', 'josh', 'jane']
    #
    # for i in range(5):
    #     values = (i, convertToBinaryData(pics[i]), caps[i], names[i])
    #     query = '''INSERT INTO PHOTOS(ID,PHOTO,CAP,NAME)
    #                 VALUES (?,?,?,?)'''
    #     cursor.execute(query, values)
    #     conn.commit()


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

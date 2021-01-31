# queryDB.py
# functions for querying and updating db for get-fit

import sqlite3
from sqlite3 import connect
from sys import stderr, exit
from os import path


class Database:

    def __init__(self):
        self._connection = None

    def connect(self):
        DATABASE= 'fit.db'
        self._connection = sqlite3.connect(DATABASE)

    def disconnect(self):
        self._connection.close()

    def getLeaderBoard(self):

        res = []
        query = ''' SELECT name, score FROM USERS ORDER BY score DESC LIMIT 5'''

        # conn = sqlite3.connect('fit.db', check_same_thread=False)
        cursor = self._connection.cursor()

        cursor.execute(query)
        rows = cursor.fetchall()
        for row in rows:
            res.append(row)
        cursor.close()

        return res

    def getChallengeBoard(self):

        res = []
        query = ''' SELECT challenge,description,startDate,length,userCount FROM CHALLENGES '''

        cursor = self._connection.cursor()

        cursor.execute(query)
        rows = cursor.fetchall()
        for row in rows:
            res.append(row)
        cursor.close()

        return res

    def getProgressBoard(self, username):

        res = []
        query = ''' SELECT challenges,progresses FROM USERS where name = ?'''

        cursor = self._connection.cursor()

        cursor.execute(query,(username,))
        rows = cursor.fetchall()
        for row in rows:
            res.append(row)

        cursor.close()

        return res


    def selectProgress(self, username, challengeName):

        res = ''

        query = ''' SELECT challenges, progresses FROM USERS WHERE name = ?'''

        cursor = self._connection.cursor()

        cursor.execute(query,(username,))
        rows = cursor.fetchall()
        for row in rows:
            challenge = row[0]
            progress = row[1]
            if str(challenge) == str(challengeName):
                res = progress

        cursor.close()

        return res

    def getDescriptions(self, challengeNames):
        print('challengeNames: ', challengeNames)

        insert = ','.join('?' * len(challengeNames))
        res = []

        query = ' SELECT description FROM CHALLENGES WHERE description IN (%s)' % insert

        cursor = self._connection.cursor()

        cursor.execute(query,challengeNames)
        rows = cursor.fetchall()
        for row in rows:
            res.append(row[0]) #only one item in row (desc)

        cursor.close()

        return res
        # def updateProg(username, challenge):

            # get length of progress, current %

            # if current % < 100:
                # newProgress = 1/length + (current %)

                # put newProgress into db

                # return newProgress

            # else:
            # print('tried to add progress but challenge completed already')
                # return 100

# def usernameToID(username):
#     query = ''' SELECT ID FROM USERS WHERE NAME=?'''
#     id = cursor.execute(query, (username,)).fetchall()
#     print("id: " + str(id))
#     return id
#
# def taskNameToID(task):
#     query = ''' SELECT ID FROM TASKS WHERE TASK=?'''
#     id = cursor.execute(query, (task,)).fetchall()[0][0]
#     return id
#
#
# def selectProg(username, taskName):
#     print("selectProg()")
#     userID = usernameToID(username)
#     taskID = taskNameToID(taskName)
#     query = ''' SELECT TASKS, PROG FROM USERS WHERE ID=?'''
#     curs = cursor.execute(query, (userID,))
#     tasks, prog = curs.fetchall()[0]
#     print("tasks: " + tasks + " ; prog: " + prog)
#
#     cursor.close()
#     cursor = conn.cursor()
#
#     tasklist = tasks.split(',')
#     proglist = prog.split(',')
#     print("tasklist: " + str(tasklist))
#     prog = 0
#     # print("taskID: " + str(taskID))
#     for i in range(len(tasklist)):
#         if int(tasklist[i]) == taskID:
#             print("taskID: " + str(taskID))
#             prog = proglist[i]
#
#
#     # print("prog: " + str(prog))
#
#     query = ''' SELECT LEN FROM TASKS WHERE ID=?'''
#     total = cursor.execute(query, (taskID,)).fetchall()[0][0]
#
#     cursor.close()
#
#     return int(100 * float(prog) / float(total))
#
# def updateProg(username, taskName):
#
#     print("updateProg()")
#
#     userID = usernameToID(username)
#     taskID = taskNameToID(taskName)
#     query = ''' SELECT TASKS, PROG FROM USERS WHERE ID=?'''
#     curs = cursor.execute(query, (userID,))
#
#     tasks, prog = curs.fetchall()[0]
#
#     cursor.close()
#     cursor = conn.cursor()
#
#     # (tasks, prog) = cursor.execute(query, userID)
#     tasklist = tasks.split(',')
#     proglist = prog.split(',')
#     found_prog = 0
#     new_prog = 0
#     for i in range(len(tasklist)):
#         print(tasklist[i])
#         print(taskID)
#         if int(tasklist[i]) == int(taskID):
#             print("found")
#             found_prog = proglist[i]
#             new_prog = str(int(found_prog) + 1)
#             proglist[i] = new_prog
#
#
#     # prog = selectProg(username, taskName)
#     # new_prog = prog + 1
#
#     new_proglist = ','.join(proglist)
#
#     values = (new_proglist, userID)
#     # UPDATE employees
#     # SET lastname = 'Smith'
#     # WHERE employeeid = 3;
#     query = ''' UPDATE USERS SET PROG=? WHERE ID=?'''
#     cursor.execute(query, values)
#
#     cursor.close()
#     cursor = conn.cursor()
#
#     query = ''' SELECT LEN FROM TASKS WHERE ID=?'''
#     total = cursor.execute(query, (taskID,)).fetchall()[0][0]
#
#     cursor.close()
#
#
#
#     conn.commit()
#     print(new_prog)
#     print(total)
#     return int(100* float(new_prog) / float(total))
#
# # https://pynative.com/python-sqlite-blob-insert-and-retrieve-digital-data/
# def convertToBinaryData(filename):
#     #Convert digital data to binary format
#     with open(filename, 'rb') as file:
#         blobData = file.read()
#     return blobData
#
# def insertPhoto(image, cap, user):
#     print("insertPhoto()")
#
#     query1 = ''' SELECT * FROM PHOTOS ORDER BY ID DESC LIMIT 1 '''
#     lastID = cursor.execute(query1).fetchall()[0][0]
#
#     cursor.close()
#     cursor = conn.cursor()
#
#     # print(lastID)
#     values = (int(lastID)+1, image, cap, user)
#     query2 = ''' INSERT INTO PHOTOS(ID,PHOTO,CAP,NAME) VALUES(?,?,?,?)'''
#     cursor.execute(query2, values)
#
#     cursor.close()
#     cursor = conn.cursor()
#
#
#
#     query3 = ''' SELECT CAP FROM PHOTOS WHERE ID=?'''
#     new_cap = cursor.execute(query3, (int(lastID)+1,)).fetchall()[0][0]
#
#     cursor.close()
#     conn.commit()
#
#     return new_cap
#
#


def main():
    # print("in main")
    username = "ezra"
    taskName = "Yoga"
    print(updateProg(username, taskName))
    conn.commit()
    # conn.close()

    print(insertPhoto(convertToBinaryData('./pics/1.jpg'), 'had fun today', 'aaron'))
    conn.commit()
    cursor.close()
    conn.close()

# main()

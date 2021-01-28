# queryDB.py
# functions for querying and updating db for get-fit

import sqlite3

conn = sqlite3.connect('fit.db')
conn.text_factory = str

cursor = conn.cursor()

def usernameToID(username):
    query = ''' SELECT ID FROM USERS WHERE NAME=?'''
    id = cursor.execute(query, (username,)).fetchall()[0][0]
    print("id: " + str(id))
    return id

def taskNameToID(task):
    query = ''' SELECT ID FROM TASKS WHERE TASK=?'''
    id = cursor.execute(query, (task,)).fetchall()[0][0]
    return id


def selectProg(username, taskName):
    print("in select")
    userID = usernameToID(username)
    taskID = taskNameToID(taskName)
    query = ''' SELECT TASKS, PROG FROM USERS WHERE ID=?'''
    curs = cursor.execute(query, (userID,))
    tasks, prog = curs.fetchall()[0]
    print("tasks: " + tasks + " ; prog: " + prog)
    tasklist = tasks.split(',')
    proglist = prog.split(',')
    print("tasklist: " + str(tasklist))
    prog = 0
    # print("taskID: " + str(taskID))
    for i in range(len(tasklist)):
        if int(tasklist[i]) == taskID:
            print("taskID: " + str(taskID))
            prog = proglist[i]


    # print("prog: " + str(prog))

    query = ''' SELECT LEN FROM TASKS WHERE ID=?'''
    total = cursor.execute(query, (taskID,)).fetchall()[0][0]

    return int(100 * float(prog) / float(total))

def updateProg(username, taskName):

    userID = usernameToID(username)
    taskID = taskNameToID(taskName)
    query = ''' SELECT TASKS, PROG FROM USERS WHERE ID=?'''
    curs = cursor.execute(query, (userID,))
    tasks, prog = curs.fetchall()[0]
    # (tasks, prog) = cursor.execute(query, userID)
    tasklist = tasks.split(',')
    proglist = prog.split(',')
    found_prog = 0
    new_prog = 0
    for i in range(len(tasklist)):
        print(tasklist[i])
        print(taskID)
        if int(tasklist[i]) == int(taskID):
            print("found")
            found_prog = proglist[i]
            new_prog = str(int(found_prog) + 1)
            proglist[i] = new_prog


    # prog = selectProg(username, taskName)
    # new_prog = prog + 1

    new_proglist = ','.join(proglist)

    values = (new_proglist, userID)
    # UPDATE employees
    # SET lastname = 'Smith'
    # WHERE employeeid = 3;
    query = ''' UPDATE USERS SET PROG=? WHERE ID=?'''
    cursor.execute(query, values)

    query = ''' SELECT LEN FROM TASKS WHERE ID=?'''
    total = cursor.execute(query, (taskID,)).fetchall()[0][0]
    
    
    conn.commit()
    print(new_prog)
    print(total)
    return int(100* float(new_prog) / float(total))

# https://pynative.com/python-sqlite-blob-insert-and-retrieve-digital-data/
def convertToBinaryData(filename):
    #Convert digital data to binary format
    with open(filename, 'rb') as file:
        blobData = file.read()
    return blobData

def insertPhoto(image, cap, user):
    
    query1 = ''' SELECT * FROM PHOTOS ORDER BY ID DESC LIMIT 1 '''
    lastID = cursor.execute(query1).fetchall()[0][0]
    # print(lastID)
    values = (int(lastID)+1, image, cap, user)
    query2 = ''' INSERT INTO PHOTOS(ID,PHOTO,CAP,NAME) VALUES(?,?,?,?)'''
    cursor.execute(query2, values)
    conn.commit()

    query3 = ''' SELECT CAP FROM PHOTOS WHERE ID=?''' 
    new_cap = cursor.execute(query3, (int(lastID)+1,)).fetchall()[0][0]
    
    return new_cap



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

main()
import os
from flask import Flask, jsonify, request, session

app = Flask(__name__, static_folder='./build', static_url_path='/')

@app.route('/')
def index():
    # to be changed with login
    session['user_name'] = 'Ezron'
    return app.send_static_file('index.html')

@app.route('/addWorkout', methods=['POST'])
def update_ProgressDB():
    data = request.get_json()
    challengeName = data['challenge']
    file = data['file']
    caption = data['caption']
    userName = session['user_name']

    # call function to UPDATE db Progress
    # if file != '':
        # call function to UPDATE db Photo, Caption
    result = 'function call goes here'
    return(result)

@app.route('/progressUpdated', methods=['GET'])
def get_updatedProgress():
    # call function to SELECT from db
    newProgress = 'function call goes here'
    result = {'progress' : newProgress}
    return jsonify(result)
#-------------------------------------------------------------------------------

# if __name__ == '__main__':
#     app.run(host='0.0.0.0', debug=False, port=os.environ.get('PORT', 80))

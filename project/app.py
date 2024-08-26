from flask import Flask, render_template
from flask_socketio import SocketIO, emit

app = Flask(__name__)
socketio = SocketIO(app)

# In-memory storage for spreadsheet data (replace with a database)
spreadsheets = {}

@app.route('/')
def index():
    return render_template('index.html')

@socketio.on('connect')
def handle_connect():
    print('Client connected')

@socketio.on('edit_cell')
def handle_edit_cell(data):
    spreadsheet_id = data['spreadsheet_id']
    cell_id = data['cell_id']
    new_value = data['new_value']

    # Update the cell value in memory (you'd persist this to a database)
    spreadsheets.setdefault(spreadsheet_id, {})[cell_id] = new_value

    # Broadcast the change to all connected clients
    emit('cell_updated', {'cell_id': cell_id, 'new_value': new_value}, broadcast=True)

if __name__ == '__main__':
    socketio.run(app)

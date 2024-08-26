const socket = io.connect();

// Example: Populate cells dynamically (you can use React or other frameworks)
const spreadsheetTable = document.getElementById('spreadsheet');
for (let row = 0; row < 10; row++) {
    const tr = document.createElement('tr');
    for (let col = 0; col < 10; col++) {
        const td = document.createElement('td');
        td.setAttribute('data-cell-id', `cell_${row}_${col}`);
        td.textContent = ''; // Initialize cell value
        tr.appendChild(td);
    }
    spreadsheetTable.appendChild(tr);
}

// Example: Handle cell editing
spreadsheetTable.addEventListener('input', (event) => {
    const cellId = event.target.getAttribute('data-cell-id');
    const newValue = event.target.textContent.trim();
    socket.emit('edit_cell', { spreadsheet_id: 'my_spreadsheet', cell_id: cellId, new_value: newValue });
});

// Example: Receive real-time updates
socket.on('cell_updated', (data) => {
    const cellToUpdate = document.querySelector(`[data-cell-id="${data.cell_id}"]`);
    if (cellToUpdate) {
        cellToUpdate.textContent = data.new_value;
    }
});

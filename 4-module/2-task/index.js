function makeDiagonalRed(table) {
    for (let tr of table.rows) {
        let rowIndex = tr.rowIndex;

        for (let td of tr.cells) {
            let cellIndex = td.cellIndex;

            if (cellIndex == rowIndex) td.style.backgroundColor = 'red';
        }
    }
}

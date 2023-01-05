
class GameOfLife {

    constructor() {

        this.cell_size = 5;
        this.dead_color = `#00001F`;
        this.alive_color = `#00FF4F`;
        this.cells_in_column = Math.floor(canvas.width / this.cell_size);
        this.cells_in_rows = Math.floor(canvas.height / this.cell_size);
        this.active_array = [];
        this.inactive_array = [];

        this.arrayInitialization = () => {

            for (let i = 0; i < this.cells_in_rows; i++) {
                this.active_array[i] = [];
                for (let j = 0; j < this.cells_in_column; j++) {
                    this.active_array[i][j] = 0;
                }
            }
            this.inactive_array = this.active_array;

        };

        this.fillArray = () => {

            for (let i = 0; i < this.cells_in_rows; i++) {
                for (let j = 0; j < this.cells_in_column; j++) {
                    let color;
                    if (this.active_array[i][j] == 1)
                        color = this.alive_color;
                    else
                        color = this.dead_color;
                    ctx.fillStyle = color;
                    ctx.fillRect(j * this.cell_size, i * this.cell_size, this.cell_size, this.cell_size);
                }
            }

        };

        this.SetSingleCellAlive = (w, h) => {

            this.active_array[w][h] = 1;
            ctx.fillStyle = `#888888`
            ctx.fillRect(h * this.cell_size, w * this.cell_size, this.cell_size, this.cell_size);           
        }

        this.GetCellValue = (row, col) => {
            try {
                return this.active_array[row][col];
            }
            catch {
                return 0;
            }
        };

        this.countNeighbours = (row, col) => {
            let total_neighbours = 0;
            total_neighbours += this.GetCellValue(row - 1, col - 1);
            total_neighbours += this.GetCellValue(row - 1, col);
            total_neighbours += this.GetCellValue(row - 1, col + 1);
            total_neighbours += this.GetCellValue(row, col - 1);
            total_neighbours += this.GetCellValue(row, col + 1);
            total_neighbours += this.GetCellValue(row + 1, col - 1);
            total_neighbours += this.GetCellValue(row + 1, col);
            total_neighbours += this.GetCellValue(row + 1, col + 1);
            return total_neighbours;
        };

        this.updateCellValue = (row, col) => {

            const total = this.countNeighbours(row, col);
            if (total > 3 || total < 2) {
                return 0;
            }
            else if (total === 3) {
                return 1;
            }
            else {
                return this.active_array[row][col];
            }

        };

        this.updateField = () => {

            for (let i = 0; i < this.cells_in_rows; i++) {
                for (let j = 0; j < this.cells_in_column; j++) {
                    let new_state = this.updateCellValue(i, j);
                    this.inactive_array[i][j] = new_state;
                }
            }
            this.active_array = this.inactive_array

        };

        this.gameSetUp = () => {
            this.arrayInitialization();
        };

        this.runGame = () => {
            console.log("I`m Here6");
            this.updateField();
            this.fillArray();
        };
        
    }
}

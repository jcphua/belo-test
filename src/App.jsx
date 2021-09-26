import React from 'react';

const re_elCellId = /^cell\[([\d]+),([\d]+)\]$/,
    _neighbourOffsets = {
        nw: [-1,-1], n: [-1,0], ne: [-1,1],
        w: [0,-1], e: [0,1],
        sw: [1,-1], s: [1,0], se: [1,1]
    };

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = { 
            grid: this.initGrid(0)
        }

        this.handle_reset = this.handle_reset.bind(this);
        this.handle_submit = this.handle_submit.bind(this);
        this.handle_cellClick = this.handle_cellClick.bind(this);
    }

    initGrid(preset = 0) { 
        return Array.from(Array(this.props.rows), () => Array(this.props.cols).fill(preset)) 
    }

    handle_reset() {
        console.log('reset');
        this.setState({ grid: this.initGrid(0) });
    }

    handle_submit(evt) {
        evt.preventDefault();
        console.log('submit-start');
        console.table(this.state.grid);
        // console.log(grid, grid.flat(), (grid.flat()).some(cell => cell === 1));
        /*
        Array.prototype.forEach.call(evt.target.elements, (el) => {
            if (!el.id || !re_elCellId.test(el.id)) { return; }
            // const idComp = re_elCellId.exec(el.id);
            // const cellCoord = Array.isArray(idComp) && new Array(+idComp[1], +idComp[2]);
            el.checked = false;
        });
        // */

        let newGrid = this.initGrid(0);
        let cellIdx = 0;
        for (let rdx = 0; rdx < this.props.rows; rdx++) {
            for (let cdx = 0; cdx < this.props.cols; cdx++) {
                let nCtr = 0;
                /*
                if (grid[rdx][cdx] === 1) { // live cell
                    console.group(`[${rdx}, ${cdx}] #${cellIdx} ${grid[rdx][cdx] === 1 && '●' || ''}`);
                }
                else {
                    console.groupCollapsed(`[${rdx}, ${cdx}] #${cellIdx} ○`);
                }
                // */
                    Object.keys(_neighbourOffsets).forEach((key) => {
                        const [rOffs, cOffs] = _neighbourOffsets[key];
                        let rPos = rdx+rOffs, 
                            cPos = cdx+cOffs;

                        // Wrap neighbours
                        if (rdx+rOffs < 0) { rPos = this.props.rows - 1; }
                        else if (rdx+rOffs >= this.props.rows) { rPos = 0; }
                        if (cdx+cOffs < 0) { cPos = this.props.cols - 1; }
                        else if (cdx+cOffs >= this.props.cols) { cPos = 0; }
                        // rPos = rdx+rOffs+this.props.rows % this.props.rows;
                        // cPos = cdx+cOffs+this.props.cols % this.props.cols;
                        
                        if (this.state.grid[rPos][cPos] === 1) {
                            nCtr++;
                        }
                        // console.log(`${key}${ (rPos !== rdx+rOffs || cPos !== cdx+cOffs) && '↩' || '' }: [${rPos}, ${cPos}]`, nCtr > 0 && nCtr || '');

                    });
                    // console.groupEnd();
                // }

                if (nCtr < 2 || nCtr > 3) {
                    newGrid[rdx][cdx] = 0;
                }
                else if ((this.state.grid[rdx][cdx] === 0 && nCtr === 3) || (this.state.grid[rdx][cdx] === 1 && (nCtr === 2 || nCtr === 3))) {
                    newGrid[rdx][cdx] = 1;
                    // console.log(cellIdx, `[${rdx}, ${cdx}]`);
                }
                cellIdx++;
            }
        }
        console.log('submit-end');
        console.table(newGrid);
        this.setState({ grid: newGrid });
    }

    handle_cellClick(evt) {
        const idComp = re_elCellId.exec(evt.target.id);
            const cellCoord = idComp.length && [+idComp[1], +idComp[2]];
            // console.log(evt.target.id, cellCoord, evt.target.checked, (this.props.rows*cellCoord[0] + this.props.cols*cellCoord[1]));
            let grid = this.state.grid;
            grid[cellCoord[0]][cellCoord[1]] = evt.target.checked && 1 || 0;
            this.setState({ grid });
            console.log('cell');
            // console.table(grid);
    }

    componentDidMount() {
        console.log('mount')
        console.table(this.state.grid);
    }

    componentWillUnmount() {
        console.log('unmount');
        console.table(this.state.grid);
    }

    render() {
        const totalCells = this.props.rows * this.props.cols;    
        const style_LayoutGridCols = `repeat(${this.props.cols}, 50px)`;

        return (
        <main>
            <form onSubmit={ this.handle_submit }>
                <div className="form-container">
                    <div className="grid-container" style={{ gridTemplateColumns: style_LayoutGridCols }}>
                        {
                            Array.from(Array(totalCells), (_unused, idx) => {
                                const coordX = idx % this.props.cols,
                                    coordY = Math.ceil((totalCells - idx) / this.props.rows) - 1,
                                    rowIndex = Math.floor(idx / this.props.rows),
                                    colIndex = coordX,
                                    currRow = rowIndex + 1,
                                    currCol = colIndex + 1,
                                    currCell = idx + 1;
                                return (
                                    <div key={idx}>
                                        <input type="checkbox" id={ `cell[${rowIndex},${colIndex}]` }
                                            checked={ this.state.grid[rowIndex][colIndex] === 1 || false  }
                                            onClick={ this.handle_cellClick } />
                                        <label htmlFor={ `cell[${rowIndex},${colIndex}]` }
                                            title={[`<#${ idx }>`,
                                                    `[${ rowIndex },${ colIndex }]`].join(' ')}
                                            title_public={[`Cell#${ currCell }`,
                                            `(Row:${ currRow }/Col:${ currCol })`,
                                            `<x:${ coordX },y:${ coordY }>`].join(' ')} />
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="control">
                        <button type="submit">Next generation</button>
                        <button type="reset" onClick={ this.handle_reset }>Reset</button>
                    </div>
                </div>
            </form>
        </main>     
    );

    }

}



export default App;
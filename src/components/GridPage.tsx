/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as React from 'react';
import styled from 'styled-components';

interface AppProps {
    rows: number;
    cols: number;
}

type Coords = [number, number];

type GridCellOffset = {
    nw: Coords;
    n: Coords;
    ne: Coords;
    w: Coords;
    e: Coords;
    sw: Coords;
    s: Coords;
    se: Coords;
};

const re_elCellId = /^cell\[([\d]+),([\d]+)\]$/,
    _neighbourOffsets: GridCellOffset = {
        nw: [-1,-1], n: [-1,0], ne: [-1,1],
        w: [0,-1], e: [0,1],
        sw: [1,-1], s: [1,0], se: [1,1]
    };

export const generateGrid = (rows: number, cols: number, val = 0): number[][] => Array.from(new Array(rows), () => new Array(cols).fill(val));

const GridContainer = styled.div.attrs(props => {
            const cols = props.cols;
            const cellSize = `calc(70vmin/${cols})`,
                cellSizeViewportSmall = `calc(80vmin/${cols})`,
                cellSizeViewportLarge = `calc(90vmin/${cols})`;
            const gap = (cols < 10)? `5px` : (cols < 20)?  `2px` : `1px`;
            return ({
                cellSize: cellSize,
                cellSizeViewportSmall: cellSizeViewportSmall,
                cellSizeViewportLarge: cellSizeViewportLarge,
                gap: gap
            });
        })`
        grid-template-columns: repeat(${props => props.cols}, ${props => props.cellSizeViewportSmall} [col]);
        grid-auto-rows: ${props => props.cellSizeViewportSmall};
        gap: ${props => props.gap};
        @media (min-width: 768px) {
            grid-template-columns: repeat(${props => props.cols}, ${props => props.cellSize} [col]);
            grid-auto-rows: ${props => props.cellSize};
        }
        @media (min-width: 1280px) {
            grid-template-columns: repeat(${props => props.cols}, ${props => props.cellSizeViewportLarge} [col]);
            grid-auto-rows: ${props => props.cellSizeViewportLarge};
        }
    `;
    GridContainer.displayName = 'div';

const GridPage = ({ rows = 10, cols = 10 }: AppProps) => {
    const initEmptyGrid = () => generateGrid(rows, cols);
    const isGridEmpty = (grd: number[][]): boolean => grd.flat().every(val => val === 0);

    const [generation, setGeneration] = React.useState<number>(0);
    const [grid, setGrid] = React.useState<number[][]>(initEmptyGrid);

    const handlers = {
        btnReset_click: () => {
            setGeneration(0);
            setGrid(initEmptyGrid());
        },
        gridCell_click: (evt) => {
            const idComp = re_elCellId.exec(evt.target.id);
            const cellCoord = idComp.length && [+idComp[1], +idComp[2]];
            grid[cellCoord[0]][cellCoord[1]] = evt.target.checked && 1 || 0;
            setGrid(grid);
        },
        frmSubmit: (evt) => {
            evt.preventDefault();

            if (isGridEmpty(grid)) { return false; }
            
            // eslint-disable-next-line prefer-const
            let newGrid = initEmptyGrid();
            for (let rdx = 0; rdx < rows; rdx++) {
                for (let cdx = 0; cdx < cols; cdx++) {
                    let nCtr = 0;
                    Object.keys(_neighbourOffsets).forEach((key) => {
                        const [rOffs, cOffs] = _neighbourOffsets[key];
                        let rPos = rdx+rOffs, 
                            cPos = cdx+cOffs;

                        // Wrap neighbours
                        if (rdx+rOffs < 0) { rPos = rows - 1; }
                        else if (rdx+rOffs >= rows) { rPos = 0; }
                        if (cdx+cOffs < 0) { cPos = cols - 1; }
                        else if (cdx+cOffs >= cols) { cPos = 0; }
                        
                        if (grid[rPos][cPos] === 1) {
                            nCtr++;
                        }
                    });

                    if (nCtr < 2 || nCtr > 3) {
                        newGrid[rdx][cdx] = 0;
                    }
                    else if ((grid[rdx][cdx] === 0 && nCtr === 3) || (grid[rdx][cdx] === 1 && (nCtr === 2 || nCtr === 3))) {
                        newGrid[rdx][cdx] = 1;
                    }
                }
            }
            setGeneration(generation + 1);
            setGrid(newGrid);
        }
    };

    let cellSize = `40px`,
        cellGap = `5px`,
        classesMain = [];
    if (cols > 30) {
        cellSize = `10px`;
        cellGap = `1px`;
        classesMain = ['cols-30-plus'];
    }
    else if (cols > 10) {
        cellSize = `20px`;
        cellGap = `2px`
        classesMain = ['cols-10-plus']
    }
    else {
        classesMain.push('cols-10-minus');
    }
    return (
        <main>
            <form onSubmit={ handlers.frmSubmit }>
                <div className="form-container">
                    <GridContainer className="grid-container" rows={rows} cols={cols}>
                        {
                            grid.map((row, rdx) => {
                                return (
                                    row.map((col, cdx) => {
                                        const idx = rdx*cols + cdx; 

                                        return (
                                            <div key={ `cell-${generation}-${rdx + cdx}` }>
                                                <input type="checkbox" id={ `cell[${rdx},${cdx}]` } 
                                                    defaultChecked={ col === 1 || false }
                                                    onClick={ handlers.gridCell_click } />
                                                <label htmlFor={ `cell[${rdx},${cdx}]` }
                                                    title={ 
                                                        [ `{<#${ idx }>`,
                                                          `[${rdx},${cdx}]}`].join(' ') } />
                                            </div>
                                        )
                                        /* // Human readable tooltip
                                                    title={
                                                        [ `Cell#${ idx + 1 }`,
                                                          `(Row:${rdx+1},${cdx+1})`,
                                                          `<x:${ coordX },y:${ coordY }>`].join(' ') } />
                                        // */
                                    })
                                )
                            })
                        }
                    </GridContainer>
                    <div className="control">
                        <dl>
                            <dt><label htmlFor="field[generation]">Generation</label></dt>
                            <dd><input type="text" id="field[generation]" value={ generation > 0 && generation || '--' } readOnly /></dd>
                        </dl>
                        <button type="submit">Next generation</button>
                        <button type="reset" onClick={ handlers.btnReset_click }>Reset</button>
                    </div>
                </div>
            </form>
        </main>     
    );
};

export default GridPage;

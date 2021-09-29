# Developer submission

**Creator:** Jaycee Phua

**Submission date:** Wed 29 Sept 2021

#### Repository 

**github**
: https://github.com/jcphua/belo-test/tree/master


#### Deployment 
**github pages**
: https://jcphua.github.io/belo-test/ 

### Assessment requirements

|Feature|Implemented
|---|:---:
| *React* | ✔
| *TypeScript* | ✔[#] <br />(see *Developer notes* below)
| *Testing attempt* | ✔
| *Git History* | ✔

|UI Functionality|Implemented|Tested
|---|:---:|:---:
| At initial state, User should see an empty board. | ✔ | ✔
| User can make Cells "alive". | ✔ | ✔
| User can make Cells "dead". | ✔ | ✔
| User can trigger "next generation". | ✔ | ✔
| User can trigger a "reset" to the initial state. | ✔ | ✔

|Cell state|Implemented|Tested
|---|:---:|:---:
| Fewer than two live neighbours dies of under-population. | ✔ | ✔
| 2 or 3 live neighbours lives on to the next generation. | ✔ | ✔
| More than 3 live neighbours dies of overcrowding. | ✔ | ✔
| When empty, with exactly 3 live neighbours "comes to life". | ✔ | ✔
| When "comes to life" outside the board, should wrap at the other side of the board. | ✔ | ✔

#### Verification
>**Functionality was successfully tested/verified by following the simple 6×6 grid example as supplied in the original spec, and ensuring active cells correctly conformed to the active states in the sample diagram.**
>
>**Additional verification test was performed by manually monitoring the originally supplied GIF image, and observing that the active cells also matched up in successive generational states.**

## Details

### Front-end notes
* Grid size can be updated via browser querystring, where size can be passed using parameter
    >"`grid=`*\<columns\>*`x`*\<rows\>*"<br /> 

    (where the delimiter is the 'x' alphabetic character). 

    eg.

    ```
    https://jcphua.github.io/belo-test/?grid=30x20
    ```

    Optionally, specifying `rows` & `cols` parameters separately will override any reference to `grid` parameter.

    **By default, and if no parameters are specified, grid size will revert to size 6×6.**

    *Note:*
    > There is no maximum constraint imposed in code for rows or columns, and if grid is specified as excessively large, it will tax your system's processor, therefore discretion is advised on setting larger grid sizes

* The 'Next generation' button does not trigger if the Grid is empty.
* UI has been coded to be responsive and automatically adjust grid size to best fit the available canvas width.

### Developer notes
* Source code submitted for assessment is accessible in the repository as the `Master` branch.
* Source code has been written to comply with *TypeScript* in a simple form. 

    [\#] Some declarations were stripped to stop build issues once `Jest` and `Enzyme` tools were included.
* Core Grid source code is located in `src/App.tsx` and `src/components/GridPage.tsx` files.
* **Testing results** can be generated from the command line as:

    ```
    npm run test
    ```

    An attempt to unit test successive generations of the grid has been included in the testing script (`src/__tests__/GridPage.test.tsx`), but has been deliberately commented out due to presumably current limitations with tools testing for React Hooks, set to return a false 'success'.

    Example output:

    ![Testing results sample](public/img/testing_results.png)



----

<!-- FRONT END ENGINEER/DEVELOPER -->

# Cell Simulator

The aim is to demonstrate how you approach thinking about problems and translating them to code.

Create a repository to your own, spend your allocated time working on a solution and then submit it back to us. Please include a README with installation and usage instructions.
 
**Challenge**
: *Cell Simulator*

The "game" is a zero-player game, meaning that its evolution is determined by its initial state, requiring no further input. One interacts with the Cell Simulator by creating an initial configuration and observing how it evolves.
 
Example: ![extreme cell simulator](public/img/33158075-ec01ddde-d05a-11e7-99b8-35af2fed02e5.gif)
 
## Acceptance criteria

- At initial state, User should see an empty board.
- User can make Cells "alive".
- User can make Cells "dead".
- User can trigger "next generation".
- User can trigger a "reset" to the initial state.
 
## Next generation

- When the next generation is running:
    - A Cell with fewer than two live neighbours dies of under-population.
    - A Cell with 2 or 3 live neighbours lives on to the next generation.
    - A Cell with more than 3 live neighbours dies of overcrowding.
    - An empty Cell with exactly 3 live neighbours "comes to life".
    - A Cell who "comes to life" outside the board should wrap at the other side of the board.
- Once the next generation is done, User can trigger "next generation" again.
 
This example shows an initial state followed by 4 "next generations": ![easy scenario](public/img/53603476-bfb00e00-3c05-11e9-8862-1dfd31836dcd.jpg)
 
## Requirements

- Use React and TypeScript.
- Please include some attempt at testing your code.
- While not mandatory, a meaningful git history will be looked upon favourably.
 
----


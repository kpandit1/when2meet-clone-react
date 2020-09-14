import React, { Component } from "react";
import "./ScheduleSelector.css";

class ScheduleSelector extends Component {
  constructor() {
    super();
    this.state = {
      // The value of each cell corresponds to whether the time is selected by the user.
      // true = selected, false = not selected
      table: [
        [false, false, false, false, false, false],
        [false, false, false, false, false, false],
        [false, false, false, false, false, false],
        [false, false, false, false, false, false],
        [false, false, false, false, false, false],
        [false, false, false, false, false, false],
        [false, false, false, false, false, false],
      ],
      // Current has [i, j] values corresponding to the currently hovered over cell
      current: null,
      // The starting cell for the box selection, i.e. the cell clicked on initially
      start: null,
      // Whether to select or unselect (true or false)
      selectionType: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  color(i, j) {
    // Returns the class of the cell passed in
    if (
      this.state.current &&
      this.state.current[0] === i &&
      this.state.current[1] === j
    ) {
      return "hover";
    }
    if (this.state.table[i][j]) {
      return "selected";
    }
    return "";
  }

  handleSubmit() {
    console.log(this.state.table);
  }

  handleMouseUp(i, j) {
    // Do nothing if there's no start set (this should never happen)
    if (this.state.start === null) {
      return;
    }
    this.setState({
      start: null,
    });
  }

  handleMouseDown(i, j) {
    let tableCopy = this.state.table.slice();
    // Toggle selectionType
    const curSelectionType = !tableCopy[i][j];
    tableCopy[i][j] = curSelectionType;

    this.setState({
      table: tableCopy,
      start: [i, j],
      selectionType: curSelectionType,
    });
  }

  handleHover(i, j) {
    this.setState({
      current: [i, j],
    });

    // If a selection hasn't been started, don't need to do anything
    if (this.state.start === null) {
      return;
    }
    let table = this.state.table.slice();
    const startX = this.state["start"][0];
    const startY = this.state["start"][1];

    let minX = Math.min(startX, i);
    let minY = Math.min(startY, j);
    let maxX = Math.max(startX, i);
    let maxY = Math.max(startY, j);

    // Select in a box between (startX, startY) and (i, j)
    for (let x = minX; x <= maxX; x++) {
      for (let y = minY; y <= maxY; y++) {
        table[x][y] = this.state.selectionType;
      }
    }
    this.setState({
      table: table,
    });
  }

  tableGenerator = () => {
    return (
      <table
        style={{ width: "600px" }}
        className="table table-bordered noselect table-sm"
        onMouseUp={() => this.handleMouseUp(0, 0)}
        onMouseLeave={() => this.setState({ start: null, current: null })}
      >
        <thead>
          <tr>
            <th>&nbsp;</th>
            <th>9/11</th>
            <th>9/12</th>
            <th>9/13</th>
            <th>9/14</th>
            <th>9/15</th>
            <th>9/16</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {this.state.table.map((row, i) => (
            <tr key={i}>
              <th key={`${i} ${-1}`}>9am</th>
              {row.map((column, j) => (
                <td
                  key={`${i} ${j}`}
                  onMouseOver={() => this.handleHover(i, j)}
                  onMouseDown={() => this.handleMouseDown(i, j)}
                  onMouseUp={() => this.handleMouseUp(i, j)}
                  className={this.color(i, j)}
                >
                  &nbsp;
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  render() {
    return (
      <div>
        {this.tableGenerator()}
        <button type="button" onClick={this.handleSubmit} class="btn btn-primary btn-lg">
          Confirm Selection
        </button>
      </div>
    );
  }
}
export default ScheduleSelector;

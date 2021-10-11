import react from "react";
import "./Staff.css";
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import "./StudentSearch.css";
import SelectSearch from "react-select-search";
import { useRef } from "react";
import { useEffect } from "react";

function AdminViewStaff() {
  //local state for drop-down
  const [assignedProgram, setassignedProgram] = React.useState("");
  const [registrationCode, setregistrationCode] = React.useState("");
  //Start Staff Select Drop Down
  function StaffSearch() {
    //Local state for student selection
    const [selectedStaff, setselectedStaff] = React.useState(0);
    const searchInput = useRef();
    const options = [
      {
        type: "group",
        name: "Staff Names",
        items: [
          { name: "Brad Johansen", value: "1" },
          { name: "Alex Goldberg", value: "2" },
          { name: "Chris F", value: "3" },
          { name: "Yung Curtis", value: "4" },
        ],
      },
    ];

    const handleFilter = (items) => {
      return (searchValue) => {
        if (searchValue.length === 0) {
          return options;
        }
        const updatedItems = items.map((list) => {
          const newItems = list.items.filter((item) => {
            return item.name.toLowerCase().includes(searchValue.toLowerCase());
          });
          return { ...list, items: newItems };
        });
        return updatedItems;
      };
    };

    return (
      <div className="App">
        <SelectSearch
          ref={searchInput}
          options={options}
          filterOptions={handleFilter}
          value={selectedStaff}
          name="Student-Search"
          placeholder="Select staff member"
          search
          onChange={setselectedStaff}
        />
      </div>
    );
  }

  //End Staff Select Drop Down
  const handleProgram = (event) => {
    setassignedProgram(event.target.value);
  };

  return (
    <div>
      <div className="headerClass">
        <h1>Edit Staff</h1>
        <div class = "oneLine">
          <StaffSearch />
          <Button id="deleteBttn" color="error" variant="outlined">
            Delete Staff
          </Button>
        </div>
        
      </div>
      <FormControl>
        <InputLabel id="demo-simple-select-label">Assign Program</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select2"
          value={assignedProgram}
          label="Grade"
          onChange={handleProgram}
        >
          <MenuItem value={"Robotics"}>Robotics</MenuItem>
          <MenuItem value={"Lego League"}>Lego League</MenuItem>
          <MenuItem value={"Math Lab"}>Math Lab</MenuItem>
        </Select>
      </FormControl>

      <Button id="addBttn" variant="outlined">
        Assign
      </Button>
      <br />
       <p>Lego League X</p>
        <p>Lego League X</p>
        <p>Lego League X</p>
        <p>Lego League X</p>
      <br />
    </div>
  );
}

export default AdminViewStaff;
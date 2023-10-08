const DropDown = (props) => {
  return (
    <div className="d-flex">
    <div class="dropdown">
      <button
        class="btn btn-primary dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        data-toggle="dropdown"
      >
        Select
      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a class="dropdown-item" href="#">
          Action
        </a>
        <a class="dropdown-item" href="#">
          Another action
        </a>
        <a class="dropdown-item" href="#">
          Something else here
        </a>
      </div>
    </div>
    <input type="text" className="form-control"/>
    </div>
  );
};

export default DropDown

import head from "./header.module.css";

const Header = () => {
  return (
    <div className={head.header}>
      <div className={head.content}>
        <div className={head.lhead}>
          <div className={head.name}>Keeper</div>
          <div className={head.nav}>
            <button className={head.button}>Notes</button>
            <button className={head.button}>Reminder</button>
            <button className={head.button}>Edit</button>
          </div>
        </div>
        <div className={head.rhead}>
          <div className={head.searchBox}>
            <input type="text" placeholder="search..." />
            <button>&#128269;</button>
          </div>
          <div>details</div>
        </div>
      </div>
    </div>
  );
};

export default Header;

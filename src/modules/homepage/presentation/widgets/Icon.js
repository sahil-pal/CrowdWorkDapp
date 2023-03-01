export const Icon = ({ name, isActive, imgURL, onClickFn }) => {
    
  const clickEvent = () => {
    onClickFn(name);
  }

  return (
    <div onClick={clickEvent} className={ isActive === name ? "active" : ""}>
      <img src={imgURL} alt="logo" />
    </div>
  );
};

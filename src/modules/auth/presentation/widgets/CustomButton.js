export const CustomButton = (props) => {
    return (
        <button onClick={props.onClickFn}>
            <div className="row justify-center">
                { props.title } <i className={`fa-solid ${props.icon}`}></i>
            </div>
        </button>
    );
}
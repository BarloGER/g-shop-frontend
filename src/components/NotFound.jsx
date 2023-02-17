// This component is used to display a 404 page if the user tries to access a page that does not exist

const NotFound = () => {
  return (
    <div>
      <h1>Wohin, genau.</h1>
      <img
        src="https://www.derma-am.com/wp-content/uploads/2022/04/404.gif"
        alt="Seite existiert nicht"
      />
    </div>
  );
};

export default NotFound;

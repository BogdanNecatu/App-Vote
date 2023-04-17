import classes from './PageContent.module.css';

function PageContent({ title, children }) {
  return (
    <div className={classes.content}>
      <h1>{title}</h1>
      <h3>{children}</h3>
    </div>
  );
}

export default PageContent;

import styles from "./FormControls.module.css";

export const Element =
  (Element) =>
  ({ input, meta, ...props }) => {
    const hasError = meta.touched && meta.error;
    return (
      <div
        className={styles.formControl + " " + (hasError ? styles.error : "")}
      >
        <Element {...input} {...props} />
        {hasError && <span> {meta.error} </span>}
      </div>
    );
  };

// export const Input = ({ input, meta, ...props }) => {
//   const hasError = meta.touched && meta.error;
//   return (
//     <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
//       <div>
//         <input {...input} {...props} />
//       </div>
//       {hasError && <span>{meta.error}</span>}
//     </div>
//   );
// };

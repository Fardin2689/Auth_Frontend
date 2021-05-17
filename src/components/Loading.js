import CircularProgress from "@material-ui/core/CircularProgress";

function Loading({ size = 70 }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CircularProgress size={size} disableShrink />
    </div>
  );
}

export default Loading;
